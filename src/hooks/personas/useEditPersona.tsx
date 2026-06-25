import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import type { ApiResponse } from "../../interfaces/api-response";
import {
  EDIT_PERSONA_MUTATION_KEY,
  GET_PERSONA_BY_ID_QUERY_KEY,
  GET_PERSONAS_QUERY_KEY,
} from "../../utils/consts";

interface EditarPersonaPayload {
  id: number;
  dni: string;
  nombre: string;
  apellido: string;
}

const useEditPersona = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [EDIT_PERSONA_MUTATION_KEY],
    mutationFn: async (payload: EditarPersonaPayload) => {
      const response = await axiosInstance.patch<ApiResponse<IPersona>>(
        `/personas/${payload.id}`,
        payload,
      );
      return response.data.data;
    },
    onSuccess: (_, payload) => {
      queryClient.invalidateQueries({ queryKey: [GET_PERSONAS_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [GET_PERSONA_BY_ID_QUERY_KEY, payload.id],
      });
    },
  });
};

export default useEditPersona;
