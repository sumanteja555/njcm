import AccordionItem from "./AccordionItem";
import styles from "./Accordion.module.css";

import { motion } from "framer-motion";

export default function Accordion({ accordionData, loading, error }) {
  const slideUp = {
    hide: { opacity: 0, y: 45 },
    show: { opacity: 1, y: 0 },
  };

  // Loading state
  if (loading) {
    return (
      <motion.div
        variants={slideUp}
        initial="hide"
        whileInView="show"
        transition={{ duration: 1 }}
      >
        <h1 className={styles.accordionHeading}>Upcoming Events:</h1>
        <div className={styles.accordion}>
          <p className={styles.loadingText}>Loading events...</p>
        </div>
      </motion.div>
    );
  }

  // Error state
  if (error) {
    return (
      <motion.div
        variants={slideUp}
        initial="hide"
        whileInView="show"
        transition={{ duration: 1 }}
      >
        <h1 className={styles.accordionHeading}>Upcoming Events:</h1>
        <div className={styles.accordion}>
          <p className={styles.errorText}>
            Failed to load events. Please try again later.
          </p>
        </div>
      </motion.div>
    );
  }

  // Empty state
  if (!accordionData || accordionData.length === 0) {
    return (
      <motion.div
        variants={slideUp}
        initial="hide"
        whileInView="show"
        transition={{ duration: 1 }}
      >
        <h1 className={styles.accordionHeading}>Upcoming Events:</h1>
        <div className={styles.accordion}>
          <p className={styles.noEventsText}>
            No upcoming events at the moment.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={slideUp}
      initial="hide"
      whileInView="show"
      transition={{ duration: 1 }}
    >
      <h1 className={styles.accordionHeading}>Upcoming Events:</h1>
      <div className={styles.accordion}>
        {accordionData.map(({ id, title, content, image }) => (
          <AccordionItem
            title={title}
            content={content}
            image={image}
            key={id || title}
          />
        ))}
      </div>
    </motion.div>
  );
}
