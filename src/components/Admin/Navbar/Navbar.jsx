import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { useRef } from "react";

export default function AdminNavbar() {
  const check = useRef();

  function handleClick() {
    check.current.checked = false;
  }

  return (
    <nav className={styles.navbar}>
      <div className={`${styles.navbarContainer} ${styles.container}`}>
        <input type="checkbox" ref={check} />
        <div className={styles.hamburgerLines}>
          <span className={`${styles.line} ${styles.line1}`}></span>
          <span className={`${styles.line} ${styles.line2}`}></span>
          <span className={`${styles.line} ${styles.line3}`}></span>
        </div>
        <div className={styles.menuItems}>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : styles.li)}
            to="/admin"
            onClick={handleClick}
          >
            Dashboard
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : styles.li)}
            to="/admin/addevent"
            onClick={handleClick}
          >
            Add Event
          </NavLink>
        </div>
        <h1 className={styles.logo}>NJCM</h1>
      </div>
    </nav>
  );
}
