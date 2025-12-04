import styles from "./Gallery.module.css";
import gallery from "../../utils/gallery";

import { motion } from "framer-motion";
import LazyLoad from "react-lazyload";

export default function Gallery() {
  const slideUp = {
    hide: { opacity: 0, y: 45 },
    show: { opacity: 1, y: 0 },
  };
  return (
    <div className={styles.container}>
      <div className={styles.gallery}>
        {gallery.map((gallery, index) => {
          return (
            <motion.div
              className={styles.galleryItem}
              variants={slideUp}
              initial="hide"
              whileInView="show"
              transition={{ duration: 2 }}
              key={index}
            >
              <LazyLoad>
                <img
                  className={styles.galleryImage}
                  src={gallery}
                  alt="image"
                  loading="lazy"
                />
              </LazyLoad>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
