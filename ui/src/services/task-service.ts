import { useMutation, useQuery } from "react-query";
import {
  MutationResponse,
  QueryResponse,
  useApiDataClient,
} from "../lib/utils";
import { CreateUserTask, UpdateUserTask, UserTask } from "../lib/types/task";

export const useGetUserTasks = (userId: number): QueryResponse<UserTask[]> => {
  const apiClient = useApiDataClient();
  const url = `${process.env.REACT_APP_API_BASE_URL}/api/${userId}/tasks/list`;
  return useQuery(
    `user-${userId}-task-list`,
    () => {
      return apiClient.get<UserTask[]>(url);
    },
    {
      enabled: !!userId,
      retry: false,
    }
  );
};

export const useGetUserTask = (
  userId: number,
  taskId: number
): QueryResponse<UserTask> => {
  const apiClient = useApiDataClient();
  // /api/:userId/tasks/:taskId
  const url = `${process.env.REACT_APP_API_BASE_URL}/api/${userId}/tasks/${taskId}`;
  return useQuery(
    `user-${userId}-task-${taskId}`,
    () => {
      return apiClient.get<UserTask>(url);
    },
    {
      enabled: !!userId && !!taskId,
      keepPreviousData: false,
      cacheTime: 0,
      refetchOnMount: true,
    }
  );
};

export const useCreateTask = (
  userId: number
): MutationResponse<CreateUserTask, UserTask> => {
  const apiClient = useApiDataClient();
  // /api/:userId/tasks
  const url = `${process.env.REACT_APP_API_BASE_URL}/api/${userId}/tasks`;

  return useMutation((requestData: CreateUserTask) =>
    apiClient.post<UserTask>(url, requestData)
  );
};

export const useUpdateTask = (
  userId: number
): MutationResponse<UpdateUserTask, UserTask> => {
  const apiClient = useApiDataClient();
  // /api/:userId/tasks
  const url = `${process.env.REACT_APP_API_BASE_URL}/api/${userId}/tasks`;

  return useMutation((requestData: UpdateUserTask) =>
    apiClient.put<UserTask>(url, requestData)
  );
};
