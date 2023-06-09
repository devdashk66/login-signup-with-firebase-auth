import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { app } from "../App/Utils/firebaseConfig";
import { getAuth } from "firebase/auth";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  // User sign out function
  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("sign out success");
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setUserEmail(auth.currentUser?.email);
    });

    return unsubcribe;
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>pages/index.js</code>
          </p>
          <div className="flex justify-between items-center gap-3">
            {!user && (
              <Link href="/login" className="px-8 py-3 bg-gray-800 rounded-lg">
                Login
              </Link>
            )}
            {user && (
              <p
                onClick={handleLogout}
                className="px-10 py-3 bg-gray-800 rounded-lg cursor-pointer"
              >
                Log Out
              </p>
            )}
          </div>
        </div>

        {userEmail && (
          <div className="-mb-48">
            <h1 className={`${styles.thirteen} text-2xl text-white !w-96`}>
              Welcome {userEmail}
            </h1>
          </div>
        )}
        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div className={styles.thirteen}>
            <Image
              src="/thirteen.svg"
              alt="13"
              width={40}
              height={31}
              priority
            />
          </div>
        </div>
        <div className=""></div>
      </main>
    </>
  );
}
