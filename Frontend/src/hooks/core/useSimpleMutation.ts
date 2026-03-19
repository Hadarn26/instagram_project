import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosResponse, Method } from "axios";
import { axiosInstance } from "../../config/queries/axiosInstance";

export function useSimpleMutation<T>(
  url: string,
  method: Method,
  options?: UseMutationOptions<AxiosResponse<unknown, unknown>, unknown, T, unknown>
): ReturnType<typeof useMutation<AxiosResponse<unknown, unknown>, unknown, T, unknown>> {
  return useMutation({
    mutationFn: (payload: T) =>
      axiosInstance.request({ url, method, data: payload }),
    ...options,
  });
}
