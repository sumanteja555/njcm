import { motion } from "framer-motion";

export default function MVdata({ elements, classes }) {
  const slideUp = {
    hide: { opacity: 0, y: 45 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <>
      {elements.map((element, index) => {
        return (
          <motion.p
            key={index}
            className={classes.para}
            variants={slideUp}
            initial="hide"
            whileInView="show"
            transition={{ duration: 0.5 }}
          >
            {element.head && (
              <span className={classes.subHeading}>{element.head}: </span>
            )}
            {element.para}
          </motion.p>
        );
      })}
    </>
  );
}
