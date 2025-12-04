import { useState, useCallback, useMemo, memo } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import Input from "../../UI/Input/Input";
import SubmitBtn from "../../UI/SubmitBtn/SubmitBtn";
import styles from "./AdminSignin.module.css";

const EyeOffIcon = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
));
EyeOffIcon.displayName = "EyeOffIcon";

const EyeOnIcon = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
));
EyeOnIcon.displayName = "EyeOnIcon";

const AdminSignin = memo(() => {
  const [showPassword, setShowPassword] = useState(false);
  const actionData = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  const error = actionData?.error;

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const passwordType = useMemo(
    () => (showPassword ? "text" : "password"),
    [showPassword]
  );

  const passwordLabel = useMemo(
    () => (showPassword ? "Hide password" : "Show password"),
    [showPassword]
  );

  return (
    <div className={styles.container}>
      <div className={styles.signinBox}>
        <div className={styles.header}>
          <h1 className={styles.title}>Admin Sign In</h1>
          <p className={styles.subtitle}>Access your admin dashboard</p>
        </div>

        <Form method="post" className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <Input
            type="text"
            placeholder="Email or Mobile Number"
            name="emailOrPhone"
            label="Email or Mobile Number"
            required={true}
            disabled={isSubmitting}
          />

          <div className={styles.passwordWrapper}>
            <Input
              type={passwordType}
              placeholder="Password"
              name="password"
              label="Password"
              required={true}
              disabled={isSubmitting}
            />
            <button
              type="button"
              className={styles.eyeIcon}
              onClick={togglePasswordVisibility}
              aria-label={passwordLabel}
              disabled={isSubmitting}
            >
              {showPassword ? <EyeOffIcon /> : <EyeOnIcon />}
            </button>
          </div>

          <SubmitBtn disabled={isSubmitting} />

          {isSubmitting && <div className={styles.loading}>Signing in...</div>}
        </Form>

        <div className={styles.footer}>
          <p>Don't have an account? Contact the super admin.</p>
        </div>
      </div>
    </div>
  );
});

AdminSignin.displayName = "AdminSignin";

export default AdminSignin;
