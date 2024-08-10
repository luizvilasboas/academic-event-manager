import React, { createContext, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        const { token } = response.data;

        localStorage.setItem("token", token);

        return { status: true, text: "Login feito com sucesso." };
      }
    } catch (error) {
      return {
        status: false,
        text: `Não foi possível fazer o login: ${error.response.data["detail"]}`,
      };
    }
  };

  const logout = async () => {
      localStorage.removeItem("token");
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post("http://localhost:8000/auth/register", {
        name: name,
        email: email,
        password: password,
      });

      console.log(response);

      if (response.status === 201) {
        return { status: true, text: "Conta criada com sucesso." };
      }
    } catch (error) {
      return {
        status: false,
        text: `Erro ao registrar: ${error.response.data["datail"]}`,
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
