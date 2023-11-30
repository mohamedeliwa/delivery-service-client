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

  return (
    <div className={styles.container}>
      Biker
      <div>
        <h3>List of All Parcels</h3>
        {parcels.map((parcel) => {
          return (
            <div className={styles.parcel} key={parcel.id}>
              <span>Name: {parcel.name}</span>
              <span>Pick-up: {parcel.pickupAddress}</span>
              <span>Dropp-off: {parcel.dropoffAddress}</span>
              <span>Sender: {parcel.sender}</span>
              <span>Biker: {parcel?.biker || "--"}</span>
              <span>Status: {parcel?.biker ? "Picked" : "Not Picked"}</span>
              {parcel?.biker ? null : (
                <span>
                  <button className={styles.button}>Pick</button>
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
