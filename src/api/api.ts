import { get, post } from './baseApi';
import { AxiosError, AxiosResponse } from 'axios';

export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string;
}

interface ErrorResponse {
  message: string;
}

const baseURL: string = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  throw new Error("Base URL is not set. Please check the .env file.");
}

export const fetchCsrfToken = async (): Promise<void> => {
  await get<void>(`${baseURL}/api/csrf-token`);
};

export const loginUser = async (username: string, password: string): Promise<void> => {
  const response: AxiosResponse<void> = await post<void, { email: string; password: string }>(
    `${baseURL}/users/login`,
    { email: username, password }
  );

  if (response.status !== 200) {
    const errorResponse = response.data as unknown;
    const errorMessage = (errorResponse as ErrorResponse)?.message || 'Unknown error';
    throw new Error('Login failed: ' + errorMessage);
  }
};

export const fetchUserProfile = async (): Promise<UserProfile> => {
  const response: AxiosResponse<UserProfile> = await get<UserProfile>(`${baseURL}/users/profile`);
  return response.data;
};

export const registerUser = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<void> => {
  try {
    const response: AxiosResponse<void> = await post<void, { firstName: string; lastName: string; email: string; password: string }>(
      `${baseURL}/users/register`,
      userData
    );

    if (response.status !== 201) {
      const errorResponse = response.data as unknown;
      const errorMessage = (errorResponse as ErrorResponse)?.message || 'Unknown error';
      throw new Error('Registration failed: ' + errorMessage);
    }

    console.log('Registration successful:', response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || 'Unknown error';
      throw new Error('Registration failed: ' + errorMessage);
    } else {
      throw new Error('Registration failed: ' + (error as Error).message);
    }
  }
};

 


