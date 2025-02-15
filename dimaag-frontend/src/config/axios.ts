import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useMemo } from "react";
import { redirect } from "react-router-dom";

export function useAxiosClient() {
  const { getToken } = useAuth();
  const client = useMemo(() => {
    const axiosClient = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
    axiosClient.interceptors.request.use(async (config) => {
      try {
        const token = await getToken();
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      } catch (error) {
        return Promise.reject(error);
      }
    });
    axiosClient.interceptors.response.use(
      async (response) => response,
      async (error) => {
        if (error.response.status === 401) {
          redirect("/signup");
        }
        return Promise.reject(error);
      }
    );
    return axiosClient;
  }, []);
  return client;
}
