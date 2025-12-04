import { useState, useEffect } from "react";
import styles from "./PaymentSuccess.module.css";

const PaymentSuccess = () => {
  const [showMessage, setShowMessage] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    address: "",
    prayerRequest: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Here you can add logic to send the data to the backend, e.g., via fetch to prayer_request.php
  };

  if (showMessage) {
    return (
      <div className={styles.successMessage}>
        <h2>Payment Successful!</h2>
        <p>Thank you for your donation.</p>
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      <h2>Please Provide Your Details</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="mobile">Mobile Number</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email ID</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="prayerRequest">Prayer Request Message</label>
          <textarea
            id="prayerRequest"
            name="prayerRequest"
            value={formData.prayerRequest}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default PaymentSuccess;
