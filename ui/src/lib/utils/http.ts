import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosRequestConfig,
  AxiosResponseHeaders,
} from "axios";
import { useCallback } from "react";
import _ from "lodash";
import { UseMutationResult, UseQueryResult } from "react-query";

export const createApiClient = () => axios.create();

export type QueryResponse<ResponseT> = UseQueryResult<ResponseT, AxiosError>;
export type MutationResponse<RequestT, ResponseT> = UseMutationResult<
  ResponseT,
  AxiosError,
  RequestT,
  unknown
>;

/**
 * Creates an Axios Api client wrapper that will automatically extract the data from the response.
 */
export const useApiDataClient = (
  onErrorCallback?: (error: unknown) => Promise<unknown> | void
) => {
  // Create API client and add response interceptor
  const axiosClient = createApiClient();

  axiosClient.interceptors.response.use(
    (response) => response,
    onErrorCallback ? onErrorCallback : console.error
  );

  const getAuthHeaders =
    useCallback(async (): Promise<AxiosResponseHeaders> => {
      const headers = new AxiosHeaders();
      headers.set("Content-Type", "application/json");
      return headers;
    }, []);

  return {
    get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
      return getAuthHeaders().then(async (headers) => {
        const res = await axiosClient.get<T>(
          url,
          _.merge({}, { headers }, config)
        );
        return res.data as T;
      });
    },
    post<T>(
      url: string,
      data?: unknown,
      config?: AxiosRequestConfig
    ): Promise<T> {
      return getAuthHeaders().then((headers) =>
        axiosClient
          .post<T>(url, data, _.merge({}, { headers }, config))
          .then((res) => res.data as T)
      );
    },
    put<T>(
      url: string,
      data?: unknown,
      config?: AxiosRequestConfig
    ): Promise<T> {
      return getAuthHeaders().then((headers) =>
        axiosClient
          .put<T>(url, data, _.merge({}, { headers }, config))
          .then((res) => res.data as T)
      );
    },
  };
};
