import styles from "./Error.module.css";

import { Link } from "react-router-dom";

export default function Error() {
  return (
    <>
      <div className={styles.body}>
        <h1 className={styles.h1}>Looks Like Your are Lost</h1>

        <section className={styles.errorContainer}>
          <span>4</span>
          <span>
            <span className={styles.screenReaderText}>0</span>
          </span>
          <span>4</span>
        </section>
        <div className={styles.linkContainer}>
          <Link to="/" className={styles.moreLink}>
            Click here to go to homepage.
          </Link>
        </div>
      </div>
    </>
  );
}
