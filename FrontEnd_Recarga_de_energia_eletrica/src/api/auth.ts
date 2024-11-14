import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

export const login = async (
  username: string,
  password: string
): Promise<string> => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    return response.data.token;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Erro ao realizar login";
    throw new Error(errorMessage);
  }
};

export const register = async (
  username: string,
  password: string,
  confirmPassword: string
) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      password,
      confirmPassword,
    });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Erro ao registrar usuário";
    throw new Error(errorMessage);
  }
};
