import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import {
  CREATE_PERSONA_MUTATION_KEY,
  GET_PERSONAS_QUERY_KEY,
} from "../../utils/consts";
import type { ApiResponse } from "../../interfaces/api-response";

interface CreatePersonaPayload {
  dni: string;
  nombre: string;
  apellido: string;
}

const useCreatePersona = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [CREATE_PERSONA_MUTATION_KEY],
    mutationFn: async (payload: CreatePersonaPayload) => {
      const response = await axiosInstance.post<ApiResponse<IPersona>>(
        "/personas",
        payload,
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_PERSONAS_QUERY_KEY] });
    },
  });
};

export default useCreatePersona;
