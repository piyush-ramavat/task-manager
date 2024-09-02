import { dbService } from "../lib/db-service";
import { CreateTaskRequest, TaskStatus, UpdateTaskRequest, UserTask } from "../lib/types";

const getStatus = (date: Date): TaskStatus => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // We need to consider the date only

  const dueDate = new Date(date);
  dueDate.setHours(0, 0, 0, 0);

  const dueSoonDate = new Date(today);
  dueSoonDate.setDate(today.getDate() + 7);

  if (dueDate < today) {
    return TaskStatus.Overdue;
  } else if (dueDate > today && dueDate < dueSoonDate) {
    return TaskStatus.DueSoon;
  }

  return TaskStatus.NotUrgent;
};

export const createTask = async (taskDetails: CreateTaskRequest): Promise<UserTask> => {
  const db = dbService();

  const created = await db.task.create({
    data: {
      ...taskDetails,
    },
  });

  return {
    ...created,
    status: getStatus(created.dueDate),
  } as UserTask;
};

export const findAllTasksForUser = async (userId: number): Promise<UserTask[]> => {
  const db = dbService();

  const tasks = await db.task.findMany({
    where: {
      userId,
    },
    orderBy: {
      id: "asc",
    },
  });

  const userTasks = tasks.map((task) => {
    return { ...task, status: getStatus(task.dueDate) } as UserTask;
  });

  return userTasks;
};

export const findTask = async (taskId: number, userId: number): Promise<UserTask | undefined> => {
  const db = dbService();

  const task = await db.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });

  return task
    ? ({
        ...task,
        status: getStatus(task.dueDate),
      } as UserTask)
    : undefined;
};

export const updateTask = async (taskDetails: UpdateTaskRequest): Promise<UserTask> => {
  const db = dbService();

  const updated = await db.task.update({
    data: { ...taskDetails },
    where: { id: taskDetails.id },
  });

  return {
    ...updated,
    status: getStatus(updated.dueDate),
  } as UserTask;
};
