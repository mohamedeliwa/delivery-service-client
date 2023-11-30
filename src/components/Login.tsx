import axios from "axios";
import styles from "./Login.module.css";
import { FormEventHandler, useState } from "react";
import { User } from "@/types/user.types";

const Login: React.FC<{
  token: string;
  user: User | null;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
}> = ({ token, user, setToken, setUser }) => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState("");

  const onFinish: FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "http://localhost:8000/authentication/login",
        {
          name,
          password,
        }
      );
      const token = response.data.access_token as string;

      const user = await axios.get("http://localhost:8000/users/identity", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(user.data);
      setToken(token);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.message);
      } else {
        console.log((error as Error).message);
      }
    }
  };

  return (
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
            setName(e.target.value);
          }}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          required
          onChange={(e) => {
            e.preventDefault();
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className={styles.buttonContainer}>
        <input className={styles.button} type="submit" value="Login" />
      </div>
    </form>
  );
};

export default Login;
