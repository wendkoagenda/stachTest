import { AxiosRequestConfig, AxiosResponse } from "axios";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AxiosError<T = any> extends Error {
  config: AxiosRequestConfig;
  code?: string;
  request?: any;
  response?: AxiosResponse<T>;
  isAxiosError: boolean;
  toJSON: () => object;
}
