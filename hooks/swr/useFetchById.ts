import useSWR from "swr";
import { fetcher } from "@/lib/fetchers/fetcher";

export const useFetchById = <T = any>(
  url: string,
  id?: string | number,
) => {
  const key = id ? `${url}/${id}` : null;

  const { data, error, isLoading, mutate } = useSWR<T>(key, fetcher);

  return {
    data,
    isLoading,
    isError: error,
    refetch: mutate,
  };
};
