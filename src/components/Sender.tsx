import React, { useState } from "react";
import styles from "./Sender.module.css";
import { User } from "@/types/user.types";
import { CreateParcelDto } from "@/types/parcel.types";
import axios from "axios";

const Sender: React.FC<{ token: string; user: User | null }> = ({
  token,
  user,
}) => {
  const [createParcelDto, setCreateParcelDto] = useState<CreateParcelDto>({
    name: "",
    pickupAddress: "",
    dropoffAddress: "",
    sender: user?.id || 0,
  });

  const createParcel: React.FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "http://localhost:8000/parcels/",
        createParcelDto,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log({
        parcel: response.data,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.message);
      } else {
        console.log((error as Error).message);
      }
    }
  };

  return (
    <div className={styles.container}>
      Create Parcel
      <div>
        <form onSubmit={createParcel} className={styles.form}>
          <div className={styles.inputContainer}>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              onChange={(e) => {
                e.preventDefault();
                setCreateParcelDto((parcel) => {
                  return {
                    ...parcel,
                    name: e.target.value,
                  };
                });
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
                setCreateParcelDto((parcel) => {
                  return {
                    ...parcel,
                    pickupAddress: e.target.value,
                  };
                });
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
                setCreateParcelDto((parcel) => {
                  return {
                    ...parcel,
                    dropoffAddress: e.target.value,
                  };
                });
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
