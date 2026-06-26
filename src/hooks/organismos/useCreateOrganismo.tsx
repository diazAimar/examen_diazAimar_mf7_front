import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import {
  CREATE_ORGANISMO_MUTATION_KEY,
  GET_ORGANISMOS_QUERY_KEY,
} from "../../utils/consts";
import type { ApiResponse } from "../../interfaces/api-response";

interface CreateOrganismoPayload {
  nombre: string;
  caratula: string;
  ciudad: string;
  fuero: string;
}

const useCreateOrganismo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [CREATE_ORGANISMO_MUTATION_KEY],
    mutationFn: async (payload: CreateOrganismoPayload) => {
      const response = await axiosInstance.post<ApiResponse<IOrganismo>>(
        "/organismos",
        payload,
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ORGANISMOS_QUERY_KEY] });
    },
  });
};

export default useCreateOrganismo;
