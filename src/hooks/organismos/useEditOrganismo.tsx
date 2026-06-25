import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import type { ApiResponse } from "../../interfaces/api-response";
import {
  EDIT_ORGANISMO_MUTATION_KEY,
  GET_ORGANISMO_BY_ID_QUERY_KEY,
  GET_ORGANISMOS_QUERY_KEY,
} from "../../utils/consts";

interface EditarOrganismoPayload {
  id: number;
  nombre: string;
  caratula: string;
  ciudad: string;
  fuero: string;
}

const useEditOrganismo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [EDIT_ORGANISMO_MUTATION_KEY],
    mutationFn: async (payload: EditarOrganismoPayload) => {
      const response = await axiosInstance.patch<ApiResponse<IOrganismo>>(
        `/organismos/${payload.id}`,
        payload,
      );
      return response.data.data;
    },
    onSuccess: (_, payload) => {
      queryClient.invalidateQueries({ queryKey: [GET_ORGANISMOS_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [GET_ORGANISMO_BY_ID_QUERY_KEY, payload.id],
      });
    },
  });
};

export default useEditOrganismo;
