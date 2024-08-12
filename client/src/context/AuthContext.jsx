import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Optionally verify the token by making a request to your backend here
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const login = (token) => {
    setIsAuthenticated(true);

    localStorage.setItem("token", token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
