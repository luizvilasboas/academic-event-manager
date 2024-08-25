import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setLoading(true);
      axios
        .get("http://localhost:8000/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const { id, name, email } = response.data
          setUser({id, name, email});
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        email,
        password,
      });

      console.log(response.data);

      if (response.status === 200) {
        const { token, id, name, email } = response.data;

        localStorage.setItem("token", token);
        setUser({id, name, email});

        return { status: true, text: "Login feito com sucesso." };
      }
    } catch (error) {
      return {
        status: false,
        text: `Não foi possível fazer o login: ${
          error.response?.data?.detail || "Erro desconhecido."
        }`,
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post("http://localhost:8000/auth/register", {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        return { status: true, text: "Conta criada com sucesso." };
      }
    } catch (error) {
      return {
        status: false,
        text: `Erro ao registrar: ${
          error.response?.data?.detail || "Erro desconhecido."
        }`,
      };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
