import React from 'react'
import styles from "./Footer.module.scss";

const date = new Date();
const year = date.getFullYear();

const Footer = () => {
  return (
    <div className={styles.footer}>
      &copy; {year} ALL RIGHT RESERVED
    </div>
  )
}

export default Footer