import axios from "axios";
import { API_URL } from "@/server/server";

const api = axios.create({
  baseURL: `${API_URL}`,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export const postUser = async (user: {
  name: string;
  email: string;
  password: string;
  password2: string;
  role: string;
}) => {
  try {
    const response = await api.post("register", {
      name: user.name,
      email: user.email,
      password: user.password,
      password2: user.password2,
      role: user.role,
    });
    return response.data;
  } catch (error) {
    alert("Erreur lors de l'enregistrement!")
    throw error;
  }
};

export const postLogin = async (user: { email: string; password: string }) => {
  try {
    const response = await api.post("login", {
      email: user.email,
      password: user.password,
    });
    return response.data;
  } catch (error) {
    alert("Email ou mot de passe erroné!")
    throw error;
  }
};

export const getUserAuthorization = async (token: string) => {
  try {
    const response = await api.get("dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations de l'utilisateur connecté :",
      error
    );
    throw error;
  }
};

export const getImages = async () => {
    try {
        const response = await api.get("uploads");
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des images :", error);
        throw error;
    }
}

export const getUsers = async (token: string) => {
  try {
    const response = await api.get("users", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des images :", error);
    throw error;
  }
}