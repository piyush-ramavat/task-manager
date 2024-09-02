import { Container, CssBaseline, Box } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";

import { useNavigate } from "react-router-dom";
import { useGetUserTasks } from "../services";
import { UserTask } from "../lib/types/task";
import { toFormattedDateString, toFormattedDateTimeString } from "../lib/utils";
import { Fab, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UpsertTaskDialog from "./upsert-task-dialog";
import { Fragment, useEffect, useState } from "react";

type Props = {
  userId: number;
};

export default function UserTaskList({ userId }: Props) {
  const navigate = useNavigate();
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const {
    data: tasks,
    refetch,
    isLoading,
    isRefetching,
  } = useGetUserTasks(userId);

  useEffect(() => {
    refetch();
  }, [openEditDialog, refetch]);

  if (!userId || isLoading || !tasks || tasks.length <= 0) {
    return null;
  }
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
    },
    {
      field: "name",
      headerName: "Task Name",
      width: 255,
    },
    {
      field: "description",
      headerName: "Description",
      width: 255,
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 100,
      renderCell: (params: GridRenderCellParams<any, Date>) => (
        <>{toFormattedDateString(params.value)}</>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 90,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 180,
      renderCell: (params: GridRenderCellParams<any, Date>) => (
        <>{toFormattedDateTimeString(params.value)}</>
      ),
    },

    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 180,
      renderCell: (params: GridRenderCellParams<any, Date>) => (
        <>{toFormattedDateTimeString(params.value)}</>
      ),
    },
  ];
  return (
    <Container maxWidth="xl">
      <Stack spacing={2} sx={{ my: 2 }} direction="row">
        <Fragment>
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            onClick={() => setOpenEditDialog(true)}
          >
            <AddIcon />
            Add Task
          </Fab>

          <UpsertTaskDialog
            isCreateMode={true}
            openDialog={openEditDialog}
            onToggleDialog={() => {
              setOpenEditDialog(!openEditDialog);
            }}
          />
        </Fragment>
      </Stack>

      <Box sx={{ mt: 5, width: "100%" }}>
        <CssBaseline />
        <DataGrid
          autoHeight
          rows={tasks}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 15,
              },
            },
          }}
          loading={isLoading || isRefetching}
          getRowId={(row) => row.id}
          onRowClick={(task: GridRowParams<UserTask>) => {
            navigate(`/task-view/${task.id}`);
          }}
        />
      </Box>
    </Container>
  );
}
