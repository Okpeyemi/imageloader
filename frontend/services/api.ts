import axios from "axios";
import { API_URL } from "@/server/server";

const api = axios.create({
  baseURL: `${API_URL}`,
});

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
    console.error("Erreur lors de l'enregistrement de l'utilisateur :", error);
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
    console.error("Erreur lors de la connexion de l'utilisateur :", error);
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
