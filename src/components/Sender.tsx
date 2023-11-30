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
    name: "parcel-1",
    pickupAddress: "London",
    dropoffAddress: "NY city",
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
      if (parcel.sender === user?.id) {
        setParcels((parcels) => {
          return [...parcels, parcel];
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [user?.id]);

  useEffect(() => {
    const socket = io("http://localhost:8000/");

    socket.on("parcel.updated", (parcel: Parcel) => {
      if (parcel.sender === user?.id) {
        setParcels((parcels) => {
          return parcels.map((item) => {
            if (item.id === parcel.id) {
              return parcel;
            } else {
              return item;
            }
          });
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [user?.id]);

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
              value={createParcelDto.name}
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
              value={createParcelDto.pickupAddress}
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
              value={createParcelDto.dropoffAddress}
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
              <span>
                <span className={styles.title}>Name</span>
                <br />
                {parcel.name}
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
                <span className={styles.title}>Biker</span>
                <br />
                {parcel?.biker || "--"}
              </span>
              <span>
                <span className={styles.title}>Status</span>
                <br />
                {parcel?.biker ? "Picked" : "Not Picked"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sender;
