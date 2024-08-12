import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
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
      <div className="flex h-[75%] w-[95%] flex-col items-center justify-center rounded border-blue-600 bg-zinc-900 sm:h-[80%] sm:w-[70%]">
        <h1 className="mb-10 text-3xl font-semibold">ADMIN LOGIN</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-7 text-xl">
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
          <button className="rounded-full bg-blue-600 px-8 py-2" type="submit">
            Login
          </button>
          <p className="animate-pulse text-xl font-bold text-blue-300">
            Note: Username & Password is "admin"
          </p>
        </form>
      </div>
    </div>
  );
}
