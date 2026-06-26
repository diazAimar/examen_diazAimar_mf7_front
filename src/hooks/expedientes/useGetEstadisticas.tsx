import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { GET_ESTADISTICAS_QUERY_KEY } from "../../utils/consts";
import type { ApiResponse } from "../../interfaces/api-response";

const useGetEstadisticas = () => {
  return useQuery({
    queryKey: [GET_ESTADISTICAS_QUERY_KEY],
    queryFn: async () => {
      const response =
        await axiosInstance.get<ApiResponse<IEstadisticas>>(
          "/expedientes/estadisticas",
        );
      return response.data.data ?? null;
    },
  });
};

export default useGetEstadisticas;
