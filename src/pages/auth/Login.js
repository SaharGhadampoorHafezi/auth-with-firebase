import React from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assests/login.png";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../components/card/Card";
import { useState } from "react";
import auth from "../../firebase/config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    console.log(email, password);
    setLoading(true);
    console.log(email, password);
    signInWithEmailAndPassword(getAuth(), email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setLoading(false);
        toast.success("Login Successful...");
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);
        toast.error(errorMessage);
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  const provider = new GoogleAuthProvider();

  const signInWithGoogle = (e) => {
    signInWithPopup(getAuth(), provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        toast.success("Login succesfully");
        navigate("/");
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        toast.error(error.message);
      });
  };

  return (
    <>
      <ToastContainer />
      {loading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="login" width="400" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
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
              <button rype="submit" className="--btn --btn-primary --btn-block">
                Login
              </button>
              <div className={styles.links}>
                <Link to="/reset">Reset Password</Link>
              </div>
              <p>-- or --</p>
            </form>
            <button
              className="--btn --btn-danger --btn-block"
              onClick={signInWithGoogle}
            >
              <FaGoogle color="#fff" /> Login With Google
            </button>
            <span className={styles.register}>
              <p>Dont have an account? </p>
              <Link to="/register"> Register</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
