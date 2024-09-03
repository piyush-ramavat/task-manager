import { useMutation } from "@tanstack/react-query";
import { AuthByEmailRequest, User } from "../lib/types";
import { MutationResponse, useApiDataClient } from "../lib/utils";

export const useEmailOnlyAuth = (): MutationResponse<
  AuthByEmailRequest,
  User
> => {
  const apiClient = useApiDataClient();
  const url = `${process.env.REACT_APP_API_BASE_URL}/user/auth-by-email`;

  return useMutation({
    mutationFn: (requestData: AuthByEmailRequest) =>
      apiClient.post<User>(url, requestData),
  });
};
