import axios from "axios";
import { FormEventHandler, useState } from "react";

const Login: React.FC = () => {
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
      console.log({
        response,
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
    <form onSubmit={onFinish} className="">
      <div className="form-example">
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
      <div className="form-example">
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
      <div className="form-example">
        <input type="submit" value="Login" />
      </div>
    </form>
  );
};

export default Login;
