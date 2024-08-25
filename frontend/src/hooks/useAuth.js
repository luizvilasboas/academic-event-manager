import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getAuthToken = () => {
    return localStorage.getItem("token");
  };

  const isAuthenticated = useCallback(() => {
    return !!getAuthToken();
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  }, [navigate]);

  const loadUser = useCallback(async () => {
    const token = getAuthToken();
    if (token) {
      try {
        const response = await axios.get("http://localhost:8000/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        logout();
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login: async (credentials) => {
      setLoading(true);
      try {
        const response = await axios.post("/api/auth/login", credentials);
        const { token, user } = response.data;
        localStorage.setItem("authToken", token);
        setUser(user);
        setError(null);
        navigate("/dashboard");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    logout,
  };
};

export default useAuth;
