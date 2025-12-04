import styles from "./PrayerRequest.module.css";

import { motion } from "framer-motion";
import { useState } from "react";

export default function PrayerRequest() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const slideUp = {
    hide: { opacity: 0, y: 45 },
    show: { opacity: 1, y: 0 },
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/prayer_request.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName: name, number: mobile, message }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        // Reset form fields
        setName("");
        setMobile("");
        setMessage("");
      } else {
        alert("Failed to submit: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  }

  if (submitted) {
    return (
      <motion.div
        className={styles.container}
        variants={slideUp}
        initial="hide"
        whileInView="show"
        transition={{ duration: 3 }}
      >
        <h1>Prayer Request Submitted!</h1>
        <p>
          Thank you for sharing your prayer request. We will keep you in our
          prayers.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className={styles.submitAnother}
        >
          Submit Another Request
        </button>
      </motion.div>
    );
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="userName"
            required
          />
          <input
            type="tel"
            placeholder="Mobile Number (Optional)"
            className={styles.input}
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            name="number"
          />
        </div>
        <div className={styles.textareaContainer}>
          <label>Enter Your Prayer Request Here:</label>
          <textarea
            cols="20"
            rows="5"
            className={styles.textarea}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            name="message"
            placeholder="Share your prayer request with us..."
            required
          ></textarea>
        </div>
        <input type="submit" value="Submit" id={styles.submit} />
      </form>
    </motion.div>
  );
}
