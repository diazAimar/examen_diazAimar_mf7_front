import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { GET_ORGANISMO_BY_ID_QUERY_KEY } from "../../utils/consts";
import type { ApiResponse } from "../../interfaces/api-response";

const useGetOrganismoById = (id: number | null) => {
  return useQuery({
    queryKey: [GET_ORGANISMO_BY_ID_QUERY_KEY, id],
    enabled: id !== null,
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse<IOrganismo>>(
        `/organismos/${id}`,
      );
      return response.data.data ?? null;
    },
  });
};

export default useGetOrganismoById;
