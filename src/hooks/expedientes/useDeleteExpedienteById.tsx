import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import {
  DELETE_EXPEDIENTE_BY_ID_MUTATION_KEY,
  GET_EXPEDIENTE_BY_ID_QUERY_KEY,
  GET_EXPEDIENTES_QUERY_KEY,
} from "../../utils/consts";
import type { ApiResponse } from "../../interfaces/api-response";

const useDeleteExpedienteById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [DELETE_EXPEDIENTE_BY_ID_MUTATION_KEY],
    mutationFn: async (id: number) => {
      const response = await axiosInstance.delete<ApiResponse<null>>(
        `/expedientes/${id}`,
      );
      return response.data.data ?? null;
    },
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: [GET_EXPEDIENTES_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [GET_EXPEDIENTE_BY_ID_QUERY_KEY, id],
      });
    },
  });
};

export default useDeleteExpedienteById;
