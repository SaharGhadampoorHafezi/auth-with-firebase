import React, { useState } from "react";
import styles from "./auth.module.scss";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";
import resetImg from "../../assests/forgot.png";
import { toast } from "react-toastify";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const Reset = () => {
  const [email, setEmail] = useState("");

  const resetPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(getAuth(), email)
      .then(() => {
        // Password reset email sent!
        // ..
        toast.success("Check your Email for reset link");
      })
      .catch((error) => {
        toast.error(error.message);
        // ..
      });
  };

  return (
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={resetImg} alt="login" width="400" />
      </div>
      <Card>
        <div className={styles.form}>
          <h2>Reset Password</h2>
          <form onSubmit={resetPassword}>
            <input
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <button className="--btn --btn-primary --btn-block" type="submit">
              Reset Password
            </button>
            <span className={styles.links}>
              <p>
                <Link to="/login">-Login</Link>
              </p>
              <p>
                <Link to="/register">-register</Link>
              </p>
            </span>
          </form>
        </div>
      </Card>
    </section>
  );
};

export default Reset;
