import { useMutation, useQuery } from "@tanstack/react-query";
import {
  MutationResponse,
  QueryResponse,
  useApiDataClient,
} from "../lib/utils";
import {
  CreateUserTask,
  Paginated,
  UpdateUserTask,
  UserTask,
} from "../lib/types/task";
import { useSearchParams } from "react-router-dom";

export const useGetUserTasks = (
  userId: number
): QueryResponse<Paginated<UserTask[]>> => {
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const apiClient = useApiDataClient();
  const url = `${process.env.REACT_APP_API_BASE_URL}/api/${userId}/tasks/list?${params}`;
  return useQuery({
    queryKey: [url],
    queryFn: () => {
      return apiClient.get<Paginated<UserTask[]>>(url);
    },
    enabled: !!userId,
    retry: false,
  });
};

export const useGetUserTask = (
  userId: number,
  taskId: number
): QueryResponse<UserTask> => {
  const apiClient = useApiDataClient();
  // /api/:userId/tasks/:taskId
  const url = `${process.env.REACT_APP_API_BASE_URL}/api/${userId}/tasks/${taskId}`;
  return useQuery({
    queryKey: [`user-${userId}-task-${taskId}`],
    queryFn: () => {
      return apiClient.get<UserTask>(url);
    },
    enabled: !!userId && !!taskId,
    refetchOnMount: true,
  });
};

export const useCreateTask = (
  userId: number
): MutationResponse<CreateUserTask, UserTask> => {
  const apiClient = useApiDataClient();
  // /api/:userId/tasks
  const url = `${process.env.REACT_APP_API_BASE_URL}/api/${userId}/tasks`;

  return useMutation({
    mutationFn: (requestData: CreateUserTask) =>
      apiClient.post<UserTask>(url, requestData),
  });
};

export const useUpdateTask = (
  userId: number
): MutationResponse<UpdateUserTask, UserTask> => {
  const apiClient = useApiDataClient();
  // /api/:userId/tasks
  const url = `${process.env.REACT_APP_API_BASE_URL}/api/${userId}/tasks`;

  // return useMutation((requestData: UpdateUserTask) =>
  //   apiClient.put<UserTask>(url, requestData)
  // );
  return useMutation({
    mutationFn: (requestData: UpdateUserTask) =>
      apiClient.put<UserTask>(url, requestData),
  });
};
