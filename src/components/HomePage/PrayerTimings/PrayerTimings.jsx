import styles from "./PrayerTimings.module.css";

import { motion } from "framer-motion";
export default function PrayerTimings() {
  const slideUp = {
    hide: { opacity: 0, y: 45 },
    show: { opacity: 1, y: 0 },
  };
  return (
    <motion.div
      className={styles.container}
      variants={slideUp}
      initial="hide"
      whileInView="show"
      transition={{ duration: 2 }}
    >
      <h1>Prayer Timings</h1>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Location</th>
              <th>Friday</th>
              <th>Saturday</th>
              <th>Sunday</th>
            </tr>
          </thead>
          <tbody className={styles.body}>
            {/* vaddivariapalem timings */}
            <tr className={styles.row}>
              <td>VADDIVARIPALEM</td>
              <td>
                Every Month Last Friday. All Night Prayer Service (9PM - 3Pm)
              </td>
              <td>
                <p>
                  Every Month Last Saturday Lord's Supper (7:30 PM - 11:00 PM)
                </p>
                <p>7:30 PM - 10:00 PM</p>
              </td>
              <td>10 AM - 1 PM</td>
            </tr>

            {/* Repalle timings */}
            <tr className={styles.row}>
              <td>REPALLE</td>
              <td>
                <p>Special Women's Meeting (10 AM - 1 PM)</p>
                <p>
                  Every Month Second Friday Fasting Prayer Night (7 PM - 9 PM)
                </p>
              </td>
              <td>
                <p>
                  Every Month Second Saturday Fasting Prayer <br /> Morning (10
                  AM - 1 PM) <br /> Every Saturday Night (7 PM - 9 PM)
                </p>
              </td>
              <td>
                <p> 9:00 AM - 11:30 PM</p>
                <p>Bible Study (7 PM - 9 PM)</p>
              </td>
            </tr>
            {/* adavuladeevi */}
            <tr className={styles.row}>
              <td>ADAVULADEEVI</td>
              <td>
                Every Month 3rd Friday <br /> 12:00 AM - 2:30 PM <br /> 7 PM - 9
                PM
              </td>
              <td>
                <p>
                  Every Month 3rd Saturday <br /> 12:00 AM - 2:30 PM <br /> 7 PM
                  - 9 PM
                </p>
              </td>
              <td>12:00 AM - 2:30 PM</td>
            </tr>
            {/* Karmuru */}
            <tr className={styles.row}>
              <td>KARUMURU</td>
              <td></td>
              <td> 7:30 PM - 9:00 PM</td>
              <td>12:00 PM - 2:30 PM</td>
            </tr>

            {/* SR COLONY */}
            <tr className={styles.row}>
              <td>S R COLONY (BONDALAGARUVU)</td>
              <td></td>
              <td></td>
              <td> 8 AM - 10 AM</td>
            </tr>

            {/* Moorlavaripalem */}
            <tr className={styles.row}>
              <td>MORLAVARIPALEM</td>
              <td></td>
              <td></td>
              <td>12 AM - 2 PM</td>
            </tr>
            <tr className={styles.row}>
              <td>PULIGADDA</td>
              <td></td>
              <td> 7 PM - 9 PM</td>
              <td>7 PM - 9 PM</td>
            </tr>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
