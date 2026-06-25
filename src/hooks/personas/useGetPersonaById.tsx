import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { GET_PERSONA_BY_ID_QUERY_KEY } from "../../utils/consts";
import type { ApiResponse } from "../../interfaces/api-response";

const useGetPersonaById = (id: number | null) => {
  return useQuery({
    queryKey: [GET_PERSONA_BY_ID_QUERY_KEY, id],
    enabled: id !== null,
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse<IPersonaDetail>>(
        `/personas/${id}`,
      );
      return response.data.data ?? null;
    },
  });
};

export default useGetPersonaById;
