import { motion } from "framer-motion";
import styles from "./AboutUs.module.css";

import coFounder from "../../assets/aboutUs/johnSingle.webp";
import { founderInfo } from "../../utils/aboutUs.js";

import LazyLoad from "react-lazyload";

export default function Cofounder() {
  const slideUp = {
    hide: { opacity: 0, y: 45 },
    show: { opacity: 1, y: 0 },
  };

  const ltr = {
    hide: { opacity: 0, x: -45 },
    show: { opacity: 1, x: 0 },
  };

  const rtl = {
    hide: { opacity: 0, x: 45 },
    show: { opacity: 1, x: 0 },
  };
  return (
    <div className={styles.coFounderContainer}>
      <LazyLoad>
        <motion.img
          src={coFounder}
          alt="Johnbabu"
          variants={ltr}
          initial="hide"
          whileInView="show"
          transition={{ duration: 1 }}
        />
      </LazyLoad>
      <div className={styles.coFounderInfo}>
        <motion.h1
          variants={slideUp}
          initial="hide"
          whileInView="show"
          transition={{ duration: 1 }}
        >
          About Co-Founder
        </motion.h1>
        {founderInfo.map(({ title = "", description }) => {
          return (
            <motion.p
              className={styles.coFounderInfoText}
              key={title}
              variants={slideUp}
              initial="hide"
              whileInView="show"
              transition={{ duration: 1 }}
            >
              <span>{title}</span>
              {description}
            </motion.p>
          );
        })}
      </div>
    </div>
  );
}
