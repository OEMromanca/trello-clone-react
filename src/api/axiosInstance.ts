import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import Cookies from "js-cookie";

interface ErrorResponse {
  message?: string;
  errors?: { [key: string]: string[] };
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    try {
      const csrfToken = Cookies.get("X-CSRF-Token");
      config.headers["X-CSRF-Token"] = csrfToken;
      return config;
    } catch (err) {
      throw new Error(
        `axios# Problem with request during pre-flight phase: ${err}.`
      );
    }
  },
  (error: AxiosError): Promise<AxiosError> => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    console.log("Received response from:", response.config.url);
    return response;
  },
  (error: AxiosError<ErrorResponse>): Promise<AxiosError<ErrorResponse>> => {
    if (error.response) {
      const status = error.response.status;
      console.error(
        `Error ${status}: ${
          error.response?.data?.message ?? "An error occurred."
        }`
      );
    } else {
      console.error("Network error. Please check your internet connection.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
