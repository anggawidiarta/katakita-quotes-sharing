import nextAuth, { NextAuthOptions } from "next-auth";
import { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";

/**
 * Interface representing the structure of the user profile.
 */
interface UserProfile {
  email: string;
  name: string;
  picture: string;
}

/**
 * NextAuth handler for configuring authentication providers and callbacks.
 *
 * This handler is configured with GoogleProvider for OAuth authentication.
 * It includes callbacks to manage session data and handle user sign-in.
 */
const handler = nextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    /**
     * Callback to handle the session object before it is returned to the client.
     *
     * @param {Object} params - The parameters for the session callback.
     * @param {Session} params.session - The session object.
     * @returns {Promise<Session>} The updated session object.
     */
    async session({ session }: { session: Session }): Promise<Session> {
      if (session.user?.email) {
        await connectToDB();
        const sessionUser = await User.findOne({ email: session.user.email });
        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
        }
      }
      return session;
    },
    /**
     * Callback to handle user sign-in.
     *
     * @param {Object} params - The parameters for the sign-in callback.
     * @param {UserProfile} [params.profile] - The user's profile information.
     * @returns {Promise<boolean>} True if sign-in is successful, false otherwise.
     */
    async signIn({ profile }: { profile?: UserProfile }): Promise<boolean> {
      if (!profile) {
        return false;
      }
      try {
        await connectToDB();

        const userExists = await User.findOne({ email: profile.email });
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name,
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(
          "Error checking if user exists: ",
          (error as Error).message
        );
        return false;
      }
    },
  },
} as NextAuthOptions);

/**
 * Export the handler as GET and POST methods.
 */
export { handler as GET, handler as POST };
