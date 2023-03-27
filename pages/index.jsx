import Head from "next/head";
import { useEffect, useState } from "react";
import { auth } from "@/Firebase/FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const index = () => {
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [isUser, setIsUser] = useState(auth?.currentUser);
  const [loginpage, setLoginpage] = useState(true);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword);
      setSignUpEmail("");
      setSignUpPassword("");
      alert("Account create successfull");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, signUpEmail, signUpPassword);
      setSignUpEmail("");
      setSignUpPassword("");
      alert("Login successfull");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSignOut = () => {
    auth.signOut();
    alert("User sign out");
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsUser(user);
    });
  }, []);
  return (
    <>
      <Head>
        <title>Login - Sign Up</title>
      </Head>
      {!loginpage && (
        <div>
          {!isUser && (
            <div className="absolute top-5 right-5">
              <button
                onClick={() => setLoginpage(true)}
                className="px-10 cursor-pointer py-3 rounded-md bg-green-500 text-white"
              >
                Login
              </button>
            </div>
          )}
          {isUser && (
            <div className="absolute top-5 right-0 flex justify-between items-center w-full px-5">
              <h1 className="bg-blue-500 w-12 h-12 flex items-center justify-center rounded-full text-2xl ">
                {isUser?.email.slice(0, 1).toUpperCase()}
              </h1>
              <h1
                onClick={handleSignOut}
                className="px-10 cursor-pointer py-3 rounded-md bg-red-500 text-white"
              >
                Log Out
              </h1>
            </div>
          )}
          <center className="w-screen flex-col gap-5 h-screen flex items-center justify-center">
            {/* sing up */}
            <h1 className="text-3xl">Create your account</h1>
            <form
              onSubmit={handleSignUp}
              className="flex items-center flex-col md:flex-row justify-center gap-5"
            >
              <input
                className="w-80 px-5 py-3 rounded-md  bg-gray-100 text-gray-800 shadow-md"
                onChange={(e) => setSignUpEmail(e.target.value)}
                type="email"
                value={signUpEmail}
                placeholder="Email"
              />
              <input
                className="w-80 px-5 py-3 rounded-md bg-gray-100 text-gray-800 shadow-md"
                onChange={(e) => setSignUpPassword(e.target.value)}
                type="password"
                value={signUpPassword}
                placeholder="Password"
              />
              <button
                className="px-10 py-3 w-80 md:w-48  rounded-md bg-blue-500 text-white"
                type="submit"
              >
                Sign Up
              </button>
            </form>
          </center>
        </div>
      )}

      {loginpage && (
        <div>
          {!isUser && (
            <div className="absolute top-5 right-5">
              <button
                onClick={() => setLoginpage(!loginpage)}
                className="px-10 cursor-pointer py-3 rounded-md bg-blue-500 text-white shadow-md"
              >
                {loginpage ? "Sign Up" : "Login"}
              </button>
            </div>
          )}
          {isUser && (
            <div className="absolute top-5 right-0 flex justify-between items-center w-full px-5">
              <h1 className=" w-12 h-12 flex items-center justify-center rounded-full text-2xl bg-blue-500 text-white shadow-md">
                {isUser?.email.slice(0, 1).toUpperCase()}
              </h1>
              <h1
                onClick={handleSignOut}
                className="px-10 cursor-pointer py-3 rounded-md bg-red-500 text-white shadow-md"
              >
                Log Out
              </h1>
            </div>
          )}
          <center className="w-screen flex-col gap-5 h-screen flex items-center justify-center">
            {/* sing up */}
            <h1 className="text-3xl">Login with email & pass</h1>
            <form
              onSubmit={handleLogin}
              className="flex items-center flex-col md:flex-row justify-center gap-5"
            >
              <input
                className="w-80 px-5 py-3 rounded-md bg-gray-100 text-gray-800 shadow-md"
                onChange={(e) => setSignUpEmail(e.target.value)}
                type="email"
                value={signUpEmail}
                placeholder="Email"
              />
              <input
                className="w-80 px-5 py-3 rounded-md bg-gray-100 text-gray-800 shadow-md"
                onChange={(e) => setSignUpPassword(e.target.value)}
                type="password"
                value={signUpPassword}
                placeholder="Password"
              />
              <button
                className="px-10 py-3 w-80 md:w-48  rounded-md bg-green-500 shadow-md text-white"
                type="submit"
              >
                Log In
              </button>
            </form>
          </center>
        </div>
      )}
    </>
  );
};

export default index;
