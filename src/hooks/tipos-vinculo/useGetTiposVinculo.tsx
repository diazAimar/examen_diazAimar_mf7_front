import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { GET_TIPOS_VINCULO_QUERY_KEY } from "../../utils/consts";
import type { ApiResponse } from "../../interfaces/api-response";

const useGetTiposVinculo = () => {
  return useQuery({
    queryKey: [GET_TIPOS_VINCULO_QUERY_KEY],
    queryFn: async () => {
      const response =
        await axiosInstance.get<ApiResponse<ITipoVinculo[]>>("/tipos-vinculo");
      return response.data.data ?? [];
    },
  });
};

export default useGetTiposVinculo;
