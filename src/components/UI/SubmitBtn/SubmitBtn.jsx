import PropTypes from "prop-types";
import styles from "./SubmitBtn.module.css";

const SubmitBtn = ({ disabled = false, children = "Submit" }) => {
  return (
    <button type="submit" disabled={disabled} className={styles.submitBtn}>
      {children}
    </button>
  );
};

SubmitBtn.propTypes = {
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

export default SubmitBtn;
