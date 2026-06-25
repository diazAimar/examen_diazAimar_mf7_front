import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import {
  GET_PERSONAS_QUERY_KEY,
  RESTORE_PERSONA_MUTATION_KEY,
} from "../../utils/consts";
import type { ApiResponse } from "../../interfaces/api-response";

const useRestorePersona = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [RESTORE_PERSONA_MUTATION_KEY],
    mutationFn: async (id: number) => {
      const response = await axiosInstance.patch<ApiResponse<IPersona>>(
        `/personas/${id}/restore`,
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_PERSONAS_QUERY_KEY] });
    },
  });
};

export default useRestorePersona;
