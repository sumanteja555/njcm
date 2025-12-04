import styles from "./Donate.module.css";

const Donate = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Donate</h2>
      <p className={styles.message}>
        Click below link to donate to New Jerusalem Covenant Ministries
      </p>
      <a
        href="https://www.paypal.com/ncp/payment/NCXYLVA9GQ5W4"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.donateButton}
      >
        Donate Now
      </a>
      <p className={styles.warning}>
        After clicking this button you will be redirected to another page
      </p>
    </div>
  );
};

export default Donate;
