import { motion } from "framer-motion";

export default function Heading({ children, classes }) {
  const slideUp = {
    hide: { opacity: 0, y: 45 },
    show: { opacity: 1, y: 0 },
  };
  return (
    <motion.h1
      className={classes}
      variants={slideUp}
      initial="hide"
      whileInView="show"
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.h1>
  );
}
