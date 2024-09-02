import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserTask } from "../services";
import { toFormattedDateString, toFormattedDateTimeString } from "../lib/utils";

type DetailDataRowProps = {
  value?: string;
  label: string;
};

function DetailDataRow({ label, value }: DetailDataRowProps) {
  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction="row" justifyContent={"initial"}>
        <Typography sx={{ p: 1 }}>{label}:</Typography>
        {value && <Typography sx={{ p: 1 }}>{value}</Typography>}
      </Stack>
    </Paper>
  );
}

type Props = {
  userId: number;
};

export default function UserTaskDetails({ userId }: Props) {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const {
    data: task,
    isLoading,
    error,
  } = useGetUserTask(userId, Number(taskId));

  if (!task) return null;

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4" sx={{ m: 2 }}>
        Task Details
      </Typography>
      <Container maxWidth="lg">
        <Stack spacing={1}>
          <DetailDataRow label="Id" value={task.id.toString()} />
          <DetailDataRow label="Name" value={task.name} />
          <DetailDataRow label="Description" value={task.description} />
          <DetailDataRow
            label="Due Date"
            value={toFormattedDateString(task.dueDate)}
          />
          <DetailDataRow label="Status" value={task.status} />
          <DetailDataRow
            label="Created At"
            value={toFormattedDateTimeString(task.createdAt)}
          />
          <DetailDataRow
            label="Updated At"
            value={
              task.updatedAt ? toFormattedDateTimeString(task.updatedAt) : ""
            }
          />
        </Stack>
        <Button
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </Container>
    </Box>
  );
}
