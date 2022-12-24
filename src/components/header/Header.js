import React, { useEffect } from "react";
import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  SET_ACTIVE_USER,
  REMOVE_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import ShowOnLoggin, { ShowOnLoggOut } from "../hidden links/HiddenLinks";

const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        e<span>Shop</span>.
      </h2>
    </Link>
  </div>
);

const cart = (
  <span className={styles.cart}>
    <Link to="/cart">
      Carts
      <FaShoppingCart size={20} />
      <p>0</p>
    </Link>
  </span>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");

  const dispatch = useDispatch();

  //Monitor currently siged-in user
  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        console.log(user);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User

        if (user.displayName == null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          console.log(uName);
          setDisplayName(uName);
        } else {
          setDisplayName(user.displayName);
        }

        const uid = user.uid;
        console.log(user.displayName);
        setDisplayName(user.displayName);
        console.log(user);

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
        // ...
      } else {
        // User is signed out
        // ...
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, []);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logOutUser = (e) => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success("logout successfuly");
        navigate("./login");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
        toast.error("logout failed");
      });
  };

  return (
    <header>
      <ToastContainer />
      <div className={styles.header}>
        {logo}
        <nav
          className={
            showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
          }
        >
          <div
            className={
              showMenu
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
            onClick={hideMenu}
          ></div>
          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color="#fff" onClick={hideMenu} />
            </li>
            <li>
              <NavLink to="/" className={activeLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="./contact" className={activeLink}>
                Contact Us
              </NavLink>
            </li>
          </ul>
          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              <ShowOnLoggOut>
                <NavLink to="./login" className={activeLink}>
                  Login
                </NavLink>
              </ShowOnLoggOut>
              <ShowOnLoggin>
                <a href="#">
                  <FaUserCircle size={16} />
                  Hi, {displayName}
                </a>
              </ShowOnLoggin>
              {/* <NavLink to="./register" className={activeLink}>
                Register
              </NavLink> */}
              <ShowOnLoggin>
                <NavLink to="/order-history" className={activeLink}>
                  My Orders
                </NavLink>
              </ShowOnLoggin>
              <ShowOnLoggin>
                <NavLink to="/" onClick={logOutUser}>
                  logout
                </NavLink>
              </ShowOnLoggin>
            </span>
            {cart}
          </div>
        </nav>
        <div className={styles["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
