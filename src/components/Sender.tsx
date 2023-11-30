import React, { useEffect, useState } from "react";
import styles from "./Sender.module.css";
import { User } from "@/types/user.types";
import { CreateParcelDto, Parcel } from "@/types/parcel.types";
import axios from "axios";
import io from "Socket.IO-client";

const Sender: React.FC<{ token: string; user: User | null }> = ({
  token,
  user,
}) => {
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [createParcelDto, setCreateParcelDto] = useState<CreateParcelDto>({
    name: "",
    pickupAddress: "",
    dropoffAddress: "",
    sender: user?.id || 0,
  });

  useEffect(() => {
    if (parcels.length === 0) {
      axios
        .get(`http://localhost:8000/parcels?sender=${user?.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setParcels([...response.data]);
        });
    }
  }, [parcels.length, token, user?.id]);

  useEffect(() => {
    const socket = io("http://localhost:8000/");

    socket.on("parcel.created", (parcel: Parcel) => {
      setParcels((parcels) => {
        return [...parcels, parcel];
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const createParcel: React.FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault();
      await axios.post("http://localhost:8000/parcels/", createParcelDto, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
        {parcels.map((parcel) => {
          return (
            <div className={styles.parcel} key={parcel.id}>
              <span>Name: {parcel.name}</span>
              <span>Pick-up: {parcel.pickupAddress}</span>
              <span>Dropp-off: {parcel.dropoffAddress}</span>
              <span>Biker: {parcel?.biker || "-"}</span>
              <span>Status: picked up</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sender;
