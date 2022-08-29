import { Alert, AlertType } from "@/models/Alert/Alert";
import axios from "axios";

const config = {
  baseURL: process.env.VUE_APP_API_URL || "http://127.0.0.1:8000/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

const instance = axios.create(config);

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }

  return config;
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  /**
   * Manejo de errores de la API
   * @param error Error de la peticion
   * @returns
   */
  function (error) {
    let message = "";

    if (error.response.status == 0) {
      message = "No se pudo establecer conexión con el servidor";
    } else if (error.response.status == 500) {
      message = "Error del servidor";
    } else if (error.response.status >= 400 && error.response.status < 500) {
      if (error.response.data.errors != undefined) {
        message = error.response.data.errors[0];
      } else {
        message = error.response.statusText;
      }
    } else {
      message = error.response.statusText;
    }

    // Mostramos el error en una alerta
    Alert.show({
      type: AlertType.Error,
      message: message,
    });
    return Promise.resolve(error.response);
  }
);

export default instance;
