import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import {
  GET_ORGANISMOS_QUERY_KEY,
  RESTORE_ORGANISMO_MUTATION_KEY,
} from "../../utils/consts";
import type { ApiResponse } from "../../interfaces/api-response";

const useRestoreOrganismo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [RESTORE_ORGANISMO_MUTATION_KEY],
    mutationFn: async (id: number) => {
      const response = await axiosInstance.patch<ApiResponse<IOrganismo>>(
        `/organismos/${id}/restore`,
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ORGANISMOS_QUERY_KEY] });
    },
  });
};

export default useRestoreOrganismo;
