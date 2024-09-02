import { Container, CssBaseline, Box } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";

import { useNavigate } from "react-router-dom";
import { useGetUserTasks } from "../services";
import { UserTask } from "../lib/types/task";

type Props = {
  userId: number;
};

export default function UserTaskList({ userId }: Props) {
  const navigate = useNavigate();
  const { data: tasks, isLoading, error } = useGetUserTasks(userId);

  if (!userId || isLoading || !tasks || tasks.length <= 0) {
    return <>No Data Yet</>;
  }
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 10,
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
      width: 200,
    },
    {
      field: "status",
      headerName: "Status",
      width: 90,
    },
  ];
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 5, height: 400, width: "100%" }}>
        <CssBaseline />
        <DataGrid
          rows={tasks}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          loading={isLoading}
          getRowId={(row) => row.id}
          onRowClick={(task: GridRowParams<UserTask>) => {
            console.log("Row Clicked", task);
          }}
        />
      </Box>
    </Container>
  );
}
