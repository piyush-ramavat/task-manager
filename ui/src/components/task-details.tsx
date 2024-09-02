import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserTask } from "../services";
import { toFormattedDateString, toFormattedDateTimeString } from "../lib/utils";
import { Fragment, useEffect, useState } from "react";
import UpsertTaskDialog from "./upsert-task-dialog";

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
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const {
    data: task,
    refetch,
    isLoading,
    isRefetching,
  } = useGetUserTask(userId, Number(taskId));

  useEffect(() => {
    refetch();
  }, [openEditDialog, refetch]);

  if (!task) return null;

  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 5, width: "100%" }}>
        <Typography variant="h4" sx={{ m: 2 }}>
          Task Details
        </Typography>
        {(isLoading || isRefetching) && <CircularProgress />}
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
          <Stack spacing={2} sx={{ my: 2 }} direction="row">
            <Fragment>
              <Button
                variant="contained"
                onClick={() => setOpenEditDialog(true)}
              >
                Edit
              </Button>
              <UpsertTaskDialog
                isCreateMode={false}
                task={task}
                openDialog={openEditDialog}
                onToggleDialog={() => {
                  setOpenEditDialog(!openEditDialog);
                }}
              />
            </Fragment>
            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </Stack>
        </Container>
      </Box>
    </Container>
  );
}
