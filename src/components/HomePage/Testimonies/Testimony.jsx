import styles from "./Testimonies.module.css";

import personTemp from "../../../assets/personTemp.jpg";

export default function Testimony() {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={personTemp} alt="person temperoary image" />
      </div>
      <h1>Name</h1>
      <p>Testimony</p>
    </div>
  );
}
