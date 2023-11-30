import { useState } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Login from "@/components/Login";
import Sender from "@/components/Sender";
import Biker from "@/components/Biker";
import { Role, User } from "@/types/user.types";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [token, setToken] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        {!token ? (
          <Login
            token={token}
            user={user}
            setToken={setToken}
            setUser={setUser}
          />
        ) : user?.role === Role.SENDER ? (
          <Sender token={token} user={user} />
        ) : (
          <Biker token={token} user={user} />
        )}
      </main>
    </>
  );
}
