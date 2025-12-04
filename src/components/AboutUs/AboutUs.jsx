import styles from "./AboutUs.module.css";
import Article from "./Article";
import Journey from "./Journey.jsx";
import godServants, { journey } from "../../utils/aboutUs.js";

// image imports
import background from "../../assets/aboutUs/background.webp";
import jeremiahFamily from "../../assets/aboutUs/jeremiahFamily.webp";
import johnFamily from "../../assets/aboutUs/johnFamily.webp";

import { motion } from "framer-motion";
import LazyLoad from "react-lazyload";
import Founder from "./Founder.jsx";
import Cofounder from "./Cofounder.jsx";

// import image from "";

export default function AboutUs() {
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
    <>
      <img
        src={background}
        alt="about us background"
        className={styles.coverImg}
      />
      {/* main container */}
      <div className={styles.container}>
        {/* Founder Container */}
        <Founder />
        {/* family container */}
        <div className={styles.familyContainer}>
          <motion.div
            variants={ltr}
            initial="hide"
            whileInView="show"
            transition={{ duration: 1 }}
          >
            <LazyLoad>
              <img src={jeremiahFamily} alt="Pastor. Jeremiah and Jyothi" />
            </LazyLoad>
            <p>Pr M. Jeremiah & Jyothi</p>
          </motion.div>
          <motion.div
            variants={slideUp}
            initial="hide"
            whileInView="show"
            transition={{ duration: 1 }}
          >
            "And we know that all things work together for good to those who
            love God, to those who are the called according to His purpose."
            "Romans 8:28"
          </motion.div>
          <motion.div
            variants={rtl}
            initial="hide"
            whileInView="show"
            transition={{ duration: 1 }}
          >
            <LazyLoad>
              <img src={johnFamily} alt="Pastor. John Babu and Naveena John" />
            </LazyLoad>
            <p>Pr M. John Babu & Naveena</p>
          </motion.div>
        </div>
        {/* co-founder */}
        <Cofounder />
        {/* Our ministries journey */}
        <motion.div
          className={styles.journeyContainer}
          variants={slideUp}
          initial="hide"
          whileInView="show"
          transition={{ duration: 1 }}
        >
          <p className={styles.heading}>Our Ministrie's Journey</p>
          <motion.div
            className={styles.textContainer}
            variants={slideUp}
            initial="hide"
            whileInView="show"
            transition={{ duration: 1 }}
          >
            {journey.map(({ title, description }) => {
              return (
                <Journey title={title} description={description} key={title} />
              );
            })}
          </motion.div>
        </motion.div>

        {/* Gods Servants */}
        <div className={styles.godServantsContainer}>
          <p className={styles.heading}>Our God's Servants</p>
          <section className={styles.articles}>
            {godServants.map(({ img, title }) => (
              <Article imgSrc={img} title={title} key={title} />
            ))}
          </section>
        </div>
      </div>
    </>
  );
}
