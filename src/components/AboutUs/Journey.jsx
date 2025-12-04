import styles from "./AboutUs.module.css";

export default function Journey({ title, description }) {
  return (
    <>
      <p className={styles.subHeading}>{title}</p>
      <p className={styles.journeyText}>{description}</p>
    </>
  );
}
