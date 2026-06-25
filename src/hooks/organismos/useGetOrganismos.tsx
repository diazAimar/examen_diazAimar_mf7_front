import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { GET_ORGANISMOS_QUERY_KEY } from "../../utils/consts";
import type { ApiResponse } from "../../interfaces/api-response";

const useGetOrganismos = () => {
  return useQuery({
    queryKey: [GET_ORGANISMOS_QUERY_KEY],
    queryFn: async () => {
      const response =
        await axiosInstance.get<ApiResponse<IOrganismo[]>>("/organismos");
      return response.data.data ?? [];
    },
  });
};

export default useGetOrganismos;
