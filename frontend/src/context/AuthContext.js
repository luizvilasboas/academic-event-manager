import React, { createContext, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, is_admin } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("is_admin", is_admin);

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
    localStorage.removeItem("is_admin");
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
    <AuthContext.Provider value={{ login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
