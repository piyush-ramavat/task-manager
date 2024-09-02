import { useQuery } from "react-query";
import { QueryResponse, useApiDataClient } from "../lib/utils";
import { UserTask } from "../lib/types/task";

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
      retry: false,
    }
  );
};
