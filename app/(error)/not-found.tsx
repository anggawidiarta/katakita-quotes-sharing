import React from "react";
import styles from "./error.module.scss";

const Error = () => {
  return (
    <div className={styles.error}>
      <div className={styles.error__face}>
        <div className={styles.error__face__band}>
          <div className={styles.error__face__band__red}></div>
          <div className={styles.error__face__band__white}></div>
        </div>
        <div className={styles.error__face__eyes}></div>
        <div className={styles.error__face__dimples}></div>
        <div className={styles.error__face__mouth}></div>
      </div>

      <h1 className="mt-3 text-2xl font-bold text-center  hover:text-blue-500">
        404 Not Found
      </h1>
    </div>
  );
};

export default Error;
