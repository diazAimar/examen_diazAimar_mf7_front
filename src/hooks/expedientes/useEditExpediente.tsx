import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import {
  EDIT_EXPEDIENTE_MUTATION_KEY,
  GET_EXPEDIENTES_QUERY_KEY,
  GET_EXPEDIENTE_BY_ID_QUERY_KEY,
  GET_ESTADISTICAS_QUERY_KEY,
} from "../../utils/consts";
import type { ApiResponse } from "../../interfaces/api-response";
import type { CreateExpedientePayload } from "./useCreateExpediente";

interface EditExpedientePayload extends CreateExpedientePayload {
  id: number;
}

const useEditExpediente = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [EDIT_EXPEDIENTE_MUTATION_KEY],
    mutationFn: async ({ id, ...payload }: EditExpedientePayload) => {
      const response = await axiosInstance.patch<ApiResponse<IExpedienteDetail>>(
        `/expedientes/${id}`,
        payload,
      );
      return response.data.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [GET_EXPEDIENTES_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [GET_EXPEDIENTE_BY_ID_QUERY_KEY, variables.id],
      });
      queryClient.invalidateQueries({ queryKey: [GET_ESTADISTICAS_QUERY_KEY] });
    },
  });
};

export default useEditExpediente;
