import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useUpdateTask } from "../services";
import { UserTask } from "../lib/types/task";
import DatePicker from "react-datepicker";
import { CircularProgress, Typography } from "@mui/material";
type Props = {
  task: UserTask;
  isOpen: boolean;
  onToggleDialog: () => void;
};
export default function UpsertTaskDialog({
  task,
  isOpen,
  onToggleDialog,
}: Props) {
  const mutation = useUpdateTask(task.userId);

  const [dueDate, setDueDate] = useState(task.dueDate);

  const handleClose = () => {
    onToggleDialog();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          const requestData: UserTask = {
            ...task,
            ...{
              name: formJson.name,
              description: formJson.description,
              dueDate,
            },
          };

          await mutation.mutateAsync(requestData);
          handleClose();
        },
      }}
    >
      <DialogTitle>Edit Task - id: {task.id}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="Task Name"
          value={task.name}
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="description"
          name="description"
          value={task.description}
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
        {mutation.isLoading && <CircularProgress />}
      </DialogActions>
    </Dialog>
  );
}
