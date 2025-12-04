import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./Accordion.module.css";

export default function AccordionItem({ title, content, image }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.accordionItem}>
      <div
        className={`${styles.accordionTitle} ${
          isActive ? styles.accordionTitleActive : ""
        }`}
        onClick={() => setIsActive(!isActive)}
      >
        <div>{title}</div>
        <motion.div
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{
            ease: "linear",
            duration: 0.4,
          }}
        >
          &#9650;
        </motion.div>
      </div>
      {isActive && (
        <motion.div
          initial={{ y: -10, opacity: [0, 0, 0.2, 0.5, 1] }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={styles.accordionContent}
        >
          <span className={styles.accordionImage}>
            <img src={image} alt={title} />
          </span>
          <span className={styles.accordionText}>{content}</span>
        </motion.div>
      )}
    </div>
  );
}
