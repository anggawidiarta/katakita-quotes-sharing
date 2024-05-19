import mongoose, { Schema, model, models, Document, Model } from "mongoose";

// Define an interface representing a document in MongoDB.
interface IPost extends Document {
  creator: mongoose.Types.ObjectId;
  text: string;
  tag: string;
}

// Create a Schema corresponding to the document interface.
const PostSchema: Schema<IPost> = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: [true, "Text is required"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required"],
  },
});

// Create a model based on the schema.
const Post: Model<IPost> = models.Post || model<IPost>("Post", PostSchema);

export default Post;
