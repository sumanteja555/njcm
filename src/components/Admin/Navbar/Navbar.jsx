import styles from "./Navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useRef } from "react";

export default function AdminNavbar() {
  const check = useRef();
  const navigate = useNavigate();

  function handleClick() {
    check.current.checked = false;
  }

  function handleLogout() {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminData");
    navigate("/admin/signin");
    handleClick(); // Close mobile menu
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
            end
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
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
        <h1 className={styles.logo}>NJCM</h1>
      </div>
    </nav>
  );
}
