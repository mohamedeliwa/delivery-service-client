import React, { useState, useEffect } from "react";
import styles from "./Biker.module.css";
import { User } from "@/types/user.types";
import { Parcel } from "@/types/parcel.types";
import io from "Socket.IO-client";
import axios from "axios";

const Biker: React.FC<{ token: string; user: User | null }> = ({
  token,
  user,
}) => {
  const [parcels, setParcels] = useState<Parcel[]>([]);

  useEffect(() => {
    if (parcels.length === 0) {
      axios
        .get(`http://localhost:8000/parcels`, {
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

  useEffect(() => {
    const socket = io("http://localhost:8000/");

    socket.on("parcel.updated", (parcel: Parcel) => {
      setParcels((parcels) => {
        return parcels.map((item) => {
          if (item.id === parcel.id) {
            return parcel;
          } else {
            return item;
          }
        });
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handlePicking = async (parcelID: number) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/parcels/${parcelID}`,
        {
          biker: user?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      <h1>Biker</h1>
      <div>
        <h3>List of All Parcels</h3>
        {parcels.map((parcel) => {
          return (
            <div className={styles.parcel} key={parcel.id}>
              <span>
                <span className={styles.title}>Name</span>
                <br /> {parcel.name}
              </span>
              <span>
                <span className={styles.title}>Pick-up</span>
                <br />
                {parcel.pickupAddress}
              </span>
              <span>
                <span className={styles.title}>Dropp-off</span>
                <br />
                {parcel.dropoffAddress}
              </span>
              <span>
                <span className={styles.title}>SenderID</span>
                <br />
                {parcel.sender}
              </span>
              <span>
                <span className={styles.title}>BikerID</span>
                <br />
                {parcel?.biker || "--"}
              </span>
              <span>
                <span className={styles.title}>Status</span>
                <br />
                {parcel?.biker ? "Picked" : "Not Picked"}
              </span>
              {parcel?.biker ? null : (
                <span>
                  <button
                    className={styles.button}
                    onClick={() => handlePicking(parcel.id)}
                  >
                    Pick
                  </button>
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Biker;
