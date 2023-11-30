import React from "react";
import styles from "./Biker.module.css";
const Biker: React.FC = () => {
  return (
    <div className={styles.container}>
      Biker
      <div>
        <h3>List of All Parcels</h3>
        <div className={styles.parcel}>
          <span>Name: Jhone Deo</span>
          <span>Pick-up: London </span>
          <span>Dropp-off: NY</span>
          <span>Biker: 1</span>
          <span>Status: picked up</span>
          <span>
            <button className={styles.button}>Take</button>
          </span>
        </div>

        <div className={styles.parcel}>
          <span>Name: Jhone Deo</span>
          <span>Pick-up: London </span>
          <span>Dropp-off: NY</span>
          <span>Biker: 1</span>
          <span>Status: picked up</span>
          <span>
            <button className={styles.button}>Take</button>
          </span>
        </div>
        <div className={styles.parcel}>
          <span>Name: Jhone Deo</span>
          <span>Pick-up: London </span>
          <span>Dropp-off: NY</span>
          <span>Biker: 1</span>
          <span>Status: picked up</span>
          <span>
            <button className={styles.button}>Take</button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Biker;
