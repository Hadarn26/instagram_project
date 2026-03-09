import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { axiosInstance } from "../../config/queries/axiosInstance";

export function useSimpleQuery<T>(
  url: string,
  queryKey?: string[],
  options?: UseQueryOptions<T, AxiosError>
): UseQueryResult<T, AxiosError> {
  return useQuery<T, AxiosError>({
    queryKey: queryKey ?? url.split("/").filter(Boolean),
    queryFn: async () => {
      const response: AxiosResponse<T> = await axiosInstance.get<T>(url);
      return response.data;
    },
    ...options,
  });
}
