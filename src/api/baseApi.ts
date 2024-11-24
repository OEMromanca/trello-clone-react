
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosInstance from './axiosInstance';


export async function get<TResponseData>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<TResponseData>> {
  const response = await axiosInstance.get<TResponseData>(url, config);
  return response;  
}

export async function put<TResponseData, TRequestData>(
  url: string,
  data: TRequestData,
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse<TResponseData>> {
  const response = await axiosInstance.put<TResponseData>(url, data, config);
  return response;
}

export async function post<TResponseData, TRequestData>(
  url: string,
  data: TRequestData,
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse<TResponseData>> {
  const response = await axiosInstance.post<TResponseData>(url, data, config);
  return response;
}

export async function del<TResponseData>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<TResponseData>> {
  const response = await axiosInstance.delete<TResponseData>(url, config);
  return response;
}
