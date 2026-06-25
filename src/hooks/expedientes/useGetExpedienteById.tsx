import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { GET_EXPEDIENTE_BY_ID_QUERY_KEY } from "../../utils/consts";
import type { ApiResponse } from "../../interfaces/api-response";

const useGetExpedienteById = (id: number | null) => {
  return useQuery({
    queryKey: [GET_EXPEDIENTE_BY_ID_QUERY_KEY, id],
    enabled: id !== null,
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse<IExpedienteDetail>>(
        `/expedientes/${id}`,
      );
      return response.data.data ?? null;
    },
  });
};

export default useGetExpedienteById;
