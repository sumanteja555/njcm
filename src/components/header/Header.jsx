import classes from "./header.module.css";
import logo from "../../assets/NJCM.png";
export default function Header() {
  return (
    <header id={classes.header}>
      <div id={classes.imgContainer}>
        <img src={logo} alt="NJCM logo" />
      </div>
      <div id={classes.text}>
        <p id={classes.heading}>NEW JERSUALEM</p>
        <p id={classes.caption}>COVENANT MINISTRIES</p>
      </div>
    </header>
  );
}
