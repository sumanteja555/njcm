import LazyLoad from "react-lazyload";
import styles from "./AboutUs.module.css";

export default function Article({ imgSrc, title }) {
  return (
    <article className={styles.article}>
      <figure>
        <LazyLoad>
          <img src={imgSrc} alt={title} className={styles.pastorImg} />
        </LazyLoad>
      </figure>
      <div>
        <h2 className={styles.h2}>{title}</h2>
      </div>
    </article>
  );
}
