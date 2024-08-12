import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import FormInput from "../components/FormInput";
import { BASE_URL } from "../apiConfig";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/admin`, {
        username,
        password,
      });

      login(response.data.token);

      navigate("/admin");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  // Redirect to AdminPage if user is already authenticated
  if (isAuthenticated) {
    return <Navigate to="/admin" />;
  }

  return (
    <div className="flex h-[100%] items-center justify-center">
      <div className="flex h-[85%] w-[95%] flex-col items-center justify-center rounded border-blue-600 bg-zinc-900 p-10 sm:h-[32rem] sm:w-[45rem]">
        <h1 className="mb-10 text-3xl font-semibold">ADMIN LOGIN</h1>
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center gap-6 text-xl"
        >
          <FormInput
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="rounded-full bg-blue-600 px-24 py-2 text-2xl"
            type="submit"
          >
            Login
          </motion.button>
          <p className="animate-pulse text-center text-xl font-bold text-blue-300">
            Note: Username & Password is "admin"
          </p>
          <button
            className="mt-4 w-fit border-b border-b-blue-200 p-2 text-blue-200 hover:text-blue-400"
            onClick={() => navigate("/")}
          >
            Not an admin? Go back
          </button>
        </form>
      </div>
    </div>
  );
}
