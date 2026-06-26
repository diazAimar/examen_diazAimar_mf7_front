import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import {
  GET_EXPEDIENTES_QUERY_KEY,
  RESTORE_EXPEDIENTE_MUTATION_KEY,
} from "../../utils/consts";
import type { ApiResponse } from "../../interfaces/api-response";

const useRestoreExpediente = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [RESTORE_EXPEDIENTE_MUTATION_KEY],
    mutationFn: async (id: number) => {
      const response = await axiosInstance.patch<ApiResponse<IExpediente>>(
        `/expedientes/${id}/restore`,
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_EXPEDIENTES_QUERY_KEY] });
    },
  });
};

export default useRestoreExpediente;
