import { motion } from "framer-motion";
import styles from "./AboutUs.module.css";
import founder from "../../assets/aboutUs/Jeremiah.webp";

import LazyLoad from "react-lazyload";

export default function Founder() {
  // animation styles
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
    <motion.div
      className={styles.founderContainer}
      variants={slideUp}
      initial="hide"
      whileInView="show"
      transition={{ duration: 1 }}
    >
      <div className={styles.infoContainer}>
        <p>About Founder</p>
        <p className={styles.founderInfo}>
          Pastor M. Jeremiah is a visionary leader and dedicated servant of God
          who has been instrumental in the establishment and growth of New
          Jerusalem Covenant Ministries. Born [insert birth year], Pastor
          Jeremiah's journey of faith and ministry began early in life when he
          felt a divine calling to serve the Lord and lead others on their
          spiritual journeys.
        </p>
        <p className={styles.founderInfo}>
          In 1982, with unwavering faith and a profound sense of purpose, Pastor
          Jeremiah founded New Jerusalem Covenant Ministries. Under his
          leadership, the ministry has flourished into a vibrant and spiritually
          enriching community for believers. His passion for preaching the
          Gospel, performing miracles fervent prayer, and assisting fellow
          believers has touched countless lives and brought about transformative
          change. He has been known for his compassion, dedication, and
          unwavering commitment to helping those in need. His charismatic
          preaching style, coupled with a deep understanding of scripture, has
          inspired many to embrace their faith and walk the path of
          righteousness. With several decades of ministry experience, Pastor M.
          Jeremiah continues to be a beacon of hope, a mentor to many, and a
          faithful servant of God. His legacy within New Jerusalem Covenant
          Ministries is one of spiritual growth, love, and unwavering faith in
          the Lord's work.
        </p>
        <p className={styles.founderInfo}>
          Pastor Jeremiah's life and ministry are a testament to the
          transformative power of faith, and his leadership has left an
          indelible mark on the hearts and souls of those who have had the
          privilege of being part of the New Jerusalem Covenant Ministries
          community.
        </p>
      </div>
      <div id={styles.founderImgContainer}>
        <LazyLoad>
          <motion.img
            src={founder}
            alt="Pastor M.Jeremiah"
            variants={rtl}
            initial="hide"
            whileInView="show"
            transition={{ duration: 1 }}
          />
        </LazyLoad>
      </div>
    </motion.div>
  );
}
