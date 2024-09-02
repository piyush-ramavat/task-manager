import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useCreateTask, useUpdateTask } from "../services";
import { CreateUserTask, UpdateUserTask, UserTask } from "../lib/types/task";
import DatePicker from "react-datepicker";
import { CircularProgress, Typography } from "@mui/material";
import { useCookies } from "react-cookie";
type Props = {
  isCreateMode: boolean;
  openDialog: boolean;
  onToggleDialog: () => void;
  task?: UserTask;
};
export default function UpsertTaskDialog({
  isCreateMode,
  task,
  openDialog,
  onToggleDialog,
}: Props) {
  const [cookies] = useCookies();

  const updateMutation = useUpdateTask(cookies.userId);
  const createMutation = useCreateTask(cookies.userId);

  const [dueDate, setDueDate] = useState(task?.dueDate);

  const handleClose = () => {
    onToggleDialog();
  };

  async function createTask(formJson: { [k: string]: any }) {
    const requestData: CreateUserTask = {
      name: formJson.name,
      description: formJson.description,
      dueDate: dueDate!,
    };

    await createMutation.mutateAsync(requestData);
  }

  async function updateTask(formJson: { [k: string]: any }) {
    const requestData: UpdateUserTask = {
      id: task!.id,
      name: formJson.name,
      description: formJson.description,
      dueDate: dueDate!,
    };

    await updateMutation.mutateAsync(requestData);
  }

  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          if (isCreateMode) {
            await createTask(formJson);
          } else {
            await updateTask(formJson);
          }
          handleClose();
        },
      }}
    >
      <DialogTitle>
        {isCreateMode ? `Create Task` : `Edit Task - id: ${task!.id}`}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="Task Name"
          value={task?.name}
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="description"
          name="description"
          value={task?.description}
          label="Task Description"
          fullWidth
          variant="standard"
          multiline
          rows={5}
        />
        <>
          <Typography
            variant="body2"
            className="MuiInputLabel-shrink MuiInputLabel-sizeMedium  MuiFormLabel-colorPrimary MuiFormLabel-filled Mui-required  "
          >
            Due date*
          </Typography>
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date!)}
          />
        </>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">save</Button>
        {updateMutation.isLoading && <CircularProgress />}
      </DialogActions>
    </Dialog>
  );
}
