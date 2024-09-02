import { useMutation } from "react-query";
import { AuthByEmailRequest, User } from "../lib/types";
import { MutationResponse, useApiDataClient } from "../lib/utils";

export const useEmailOnlyAuth = (): MutationResponse<
  AuthByEmailRequest,
  User
> => {
  const apiClient = useApiDataClient();
  // const url = `${process.env.API_BASE_URL}/user/auth-by-email`;// TODO: check why process.env is not working
  const url = `http://localhost:3001/user/auth-by-email`;

  return useMutation((requestData: AuthByEmailRequest) =>
    apiClient.post<User>(url, requestData)
  );
};
