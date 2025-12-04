import styles from "./PrayerRequest.module.css";

import { motion } from "framer-motion";
export default function PrayerRequest() {
  const slideUp = {
    hide: { opacity: 0, y: 45 },
    show: { opacity: 1, y: 0 },
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("/sendEmail.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, number, message }),
      });

      if (response.ok) {
        setSubmitted(true);
        // Reset form fields if needed
        setName("");
        setMobile("");
        setMessage("");
      } else {
        console.error("Failed to send email.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
  return (
    <motion.div
      className={styles.container}
      variants={slideUp}
      initial="hide"
      whileInView="show"
      transition={{ duration: 3 }}
    >
      <h1>Prayer Request:</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Enter your name"
            className={styles.input}
            name="userName"
          />
          <input
            type="number"
            placeholder="Mobile Number(Optional)"
            className={styles.input}
            name="number"
          />
        </div>
        <div className={styles.textareaContainer}>
          <label>Enter Your Prayer Request Here:</label>
          <textarea
            cols="20"
            rows="5"
            className={styles.textarea}
            name="message"
            placeholder="Share your prayer request with us..."
          ></textarea>
        </div>
        <input type="submit" value="Submit" id={styles.submit} />
      </form>
    </motion.div>
  );
}
