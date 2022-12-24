import React from "react";
import styles from "./auth.module.scss";
import Card from "../../components/card/Card";
import register from "../../assests/register.png";
import Loading from '../../components/loader/Loader'
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/config'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    // console.log(email, password, cPassword);
    if (password !== cPassword) {
      toast.error("Password does not match");
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(user);
        setLoading(false);
        toast.success("Registertion succesful...");
        navigate("/login");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
        setLoading(false);
        // ..
      });
      setLoading(true);
  };

  return (
    <>
      <ToastContainer />
      {loading && <Loading />}
      <section className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <h2>Register</h2>
            <form onSubmit={registerUser}>
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm password"
                required
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Register
              </button>
            </form>
            <span className={styles.register}>
              <p>Already have an account? </p>
              <Link to="/login"> Login</Link>
            </span>
          </div>
        </Card>
        <div className={styles.img}>
          <img src={register} alt="login" width="400" />
        </div>
      </section>
    </>
  );
};

export default Register;
