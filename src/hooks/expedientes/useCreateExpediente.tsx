import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import {
  CREATE_EXPEDIENTE_MUTATION_KEY,
  GET_EXPEDIENTES_QUERY_KEY,
  GET_ESTADISTICAS_QUERY_KEY,
} from "../../utils/consts";
import type { ApiResponse } from "../../interfaces/api-response";

interface PersonaPayload {
  dni: number;
  nombre: string;
  apellido: string;
}

interface PersonaVinculadaPayload extends PersonaPayload {
  tipo_vinculo: number;
}

export interface CreateExpedientePayload {
  organismo_id: number;
  tipo: string;
  numero: number;
  anno: number;
  caratula: string;
  ciudad: string;
  actor: PersonaPayload;
  personas: PersonaVinculadaPayload[];
}

const useCreateExpediente = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [CREATE_EXPEDIENTE_MUTATION_KEY],
    mutationFn: async (payload: CreateExpedientePayload) => {
      const response = await axiosInstance.post<ApiResponse<IExpedienteDetail>>(
        "/expedientes",
        payload,
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_EXPEDIENTES_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [GET_ESTADISTICAS_QUERY_KEY] });
    },
  });
};

export default useCreateExpediente;
