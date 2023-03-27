import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import app from "../Utils/firebaseConfig";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { async } from "@firebase/util";

const LoginSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [page, setPage] = useState("Login");
  const router = useRouter();

  const auth = getAuth(app);
  const handleSingUp = async () => {
    event.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
      setEmail("");
      setPassword("");
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSingIn = async () => {
    event.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      setEmail("");
      setPassword("");
      router.push("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  const provider = new GoogleAuthProvider();
  const handleSignInWithGoogle = async () => {
    try {
      const user = await signInWithPopup(auth, provider);
      console.log(user);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handlePage = (event) => {
    setPage(event.target.innerHTML);
  };

  return (
    <>
      {/*Login-------------------------------------------------------- Login */}
      {page === "Login" && (
        <div className="min-h-screen  flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-200">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-gray-800  py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div className="flex justify-around items-center   text-3xl mb-10">
                <p
                  className={`cursor-pointer pb-2 ${
                    page === "Login" && "font-bold border-b border-blue-400"
                  }`}
                  onClick={handlePage}
                >
                  Login
                </p>
                <p className="cursor-pointer" onClick={handlePage}>
                  Sign Up
                </p>
              </div>
              <form className="space-y-6" onSubmit={handleSingIn}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none rounded-none relative block w-full px-3 py-4 bg-white border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-400"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-indigo-200"
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <div className="flex items-center justify-center mt-6 flex-col gap-3">
                <p>--- Or ---</p>
                <div className="flex justify-between items-center mt-3 gap-3">
                  <button
                    onClick={handleSignInWithGoogle}
                    className="px-16 py-3 bg-white text-black rounded-lg flex justify-between items-center gap-1"
                  >
                    <FcGoogle></FcGoogle>
                    Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Sing up-------------------------------------------------------- Sign up */}
      {page === "Sign Up" && (
        <div className="min-h-screen  flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-200">
              Create a new account
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div className="flex justify-around items-center  text-3xl mb-10">
                <p className="cursor-pointer" onClick={handlePage}>
                  Login
                </p>
                <p
                  className={`cursor-pointer pb-2 ${
                    page === "Sign Up" && "font-bold border-b border-blue-400"
                  }`}
                  onClick={handlePage}
                >
                  Sign Up
                </p>
              </div>
              <form className="space-y-6" onSubmit={handleSingUp}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none rounded-none relative block w-full px-3 py-4 bg-white border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-indigo-200"
                  >
                    Sign Up
                  </button>
                </div>
              </form>

              <div className="flex items-center justify-center mt-6 flex-col gap-3">
                <p>--- Or ---</p>
                <div className="flex justify-between items-center mt-3 gap-3">
                  <button
                    onClick={handleSignInWithGoogle}
                    className="px-16 py-3 bg-white text-black rounded-lg flex justify-between items-center gap-1"
                  >
                    <FcGoogle></FcGoogle>
                    Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginSignup;
