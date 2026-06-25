import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import {
  DELETE_PERSONA_BY_ID_MUTATION_KEY,
  GET_PERSONA_BY_ID_QUERY_KEY,
  GET_PERSONAS_QUERY_KEY,
} from "../../utils/consts";
import type { ApiResponse } from "../../interfaces/api-response";

const useDeletePersonaById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [DELETE_PERSONA_BY_ID_MUTATION_KEY],
    mutationFn: async (id: number) => {
      const response = await axiosInstance.delete<ApiResponse<null>>(
        `/personas/${id}`,
      );
      return response.data.data ?? null;
    },
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: [GET_PERSONAS_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [GET_PERSONA_BY_ID_QUERY_KEY, id],
      });
    },
  });
};

export default useDeletePersonaById;
