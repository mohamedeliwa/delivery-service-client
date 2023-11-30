import React from "react";
import styles from "./Sender.module.css";

const Sender: React.FC = () => {
  const onFinish = () => {};
  return (
    <div className={styles.container}>
      Create Parcel
      <div>
        <form onSubmit={onFinish} className={styles.form}>
          <div className={styles.inputContainer}>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              onChange={(e) => {
                e.preventDefault();
                // setName(e.target.value);
              }}
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="pickupAddress">pickupAddress: </label>
            <input
              type="text"
              name="pickupAddress"
              id="pickupAddress"
              required
              onChange={(e) => {
                e.preventDefault();
                // setName(e.target.value);
              }}
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="dropoffAddress">dropoffAddress: </label>
            <input
              type="text"
              name="dropoffAddress"
              id="dropoffAddress"
              required
              onChange={(e) => {
                e.preventDefault();
                // setName(e.target.value);
              }}
            />
          </div>
          <div className={styles.buttonContainer}>
            <input className={styles.button} type="submit" value="Submit" />
          </div>
        </form>
      </div>
      <hr style={{ width: "90vw", margin: "10px auto" }} />
      <div>
        <h3>List of your Parcels</h3>
        <div className={styles.parcel}>
          <span>Name: Jhone Deo</span>
          <span>Pick-up: London </span>
          <span>Dropp-off: NY</span>
          <span>Biker: 1</span>
          <span>Status: picked up</span>
        </div>

        <div className={styles.parcel}>
          <span>Name: Jhone Deo</span>
          <span>Pick-up: London </span>
          <span>Dropp-off: NY</span>
          <span>Biker: 1</span>
          <span>Status: picked up</span>
        </div>
        <div className={styles.parcel}>
          <span>Name: Jhone Deo</span>
          <span>Pick-up: London </span>
          <span>Dropp-off: NY</span>
          <span>Biker: 1</span>
          <span>Status: picked up</span>
        </div>
      </div>
    </div>
  );
};

export default Sender;
