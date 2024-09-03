import {
  Container,
  CssBaseline,
  Box,
  TableContainer,
  TextField,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetUserTasks } from "../services";
import { UserTask } from "../lib/types/task";
import { toFormattedDateString, toFormattedDateTimeString } from "../lib/utils";
import { Fab, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UpsertTaskDialog from "./upsert-task-dialog";
import { Fragment, useEffect, useState } from "react";
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import TablePaginationActions from "./table-pagination-actions";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

type Props = {
  userId: number;
};

export default function UserTaskList({ userId }: Props) {
  const navigate = useNavigate();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const {
    data: tasks,
    refetch,
    isLoading,
    isRefetching,
  } = useGetUserTasks(userId);

  useEffect(() => {
    console.log("useEffect(openCreateDialog)");

    if (!isRefetching) refetch();
  }, [openCreateDialog]);

  const columns: ColumnDef<UserTask>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Task Name",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "dueDate",
      header: "Due Date",
      cell: (params) => (
        <>{toFormattedDateString(params.row.original.dueDate)}</>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: (params) => (
        <>{toFormattedDateTimeString(params.row.original.createdAt)}</>
      ),
    },

    {
      accessorKey: "updatedAt",
      header: "Updated At",
      cell: (params) => (
        <>{toFormattedDateTimeString(params.row.original.updatedAt)}</>
      ),
    },
  ];

  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const table = useReactTable<UserTask>({
    data: tasks?.data ?? [],
    columns: columns,
    state: {
      sorting,
    },
    manualSorting: true,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel<UserTask>(),
    getSortedRowModel: getSortedRowModel<UserTask>(),
    getFilteredRowModel: getFilteredRowModel<UserTask>(),
    getPaginationRowModel: getPaginationRowModel<UserTask>(),
  });

  const [pageSize, setPageSize] = useState(tasks?.pageSize || 10);
  const [pageIndex, setPageIndex] = useState(tasks?.pageIndex || 0);

  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  useEffect(() => {
    console.log("useEffect( sorting)");
    params.set("pageIndex", pageIndex.toString());
    params.set("pageSize", pageSize.toString());

    if (sorting.length > 0) {
      params.set("sortBy", sorting[0].id);
      params.set("order", sorting[0].desc ? "desc" : "asc");
    } else {
      params.delete("sortBy");
      params.delete("order");
    }

    setSearchParams(params);
    if (!isRefetching) refetch();
  }, [sorting, pageIndex, pageSize]);

  useEffect(() => {
    console.log("useEffect( search)");

    if (searchTerm.length > 0) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }

    setSearchParams(params);

    if (!isRefetching) refetch();
  }, [searchTerm]);

  return (
    <Container maxWidth="xl">
      <Stack spacing={2} sx={{ my: 2 }} direction="row">
        <Fragment>
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            onClick={() => setOpenCreateDialog(true)}
          >
            <AddIcon />
            Add Task
          </Fab>
          <UpsertTaskDialog
            isCreateMode={true}
            openDialog={openCreateDialog}
            onToggleDialog={() => {
              setOpenCreateDialog(!openCreateDialog);
            }}
          />
        </Fragment>
        <TextField
          id="search"
          name="search"
          value={searchTerm}
          label="Search by Task Name"
          variant="outlined"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(event.target.value);
          }}
        />
      </Stack>

      <Box sx={{ mt: 5, width: "100%" }}>
        <CssBaseline />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} color="primary">
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      key={header.id}
                      sx={{
                        cursor: "pointer",
                        backgroundColor: "table-header",
                      }}
                      className="MuiTableRow-head"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <Stack spacing={2} direction="row">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <ArrowDropDown />,
                          desc: <ArrowDropUp />,
                          false: "",
                        }[header.column.getIsSorted() as string] ?? null}
                      </Stack>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  hover={true}
                  key={row.id}
                  onClick={() => navigate(`/task-view/${row.original.id}`)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[
            5,
            10,
            25,
            { label: "All", value: tasks?.total || 0 },
          ]}
          component="div"
          count={tasks?.total || 0}
          rowsPerPage={pageSize}
          page={pageIndex}
          slotProps={{
            select: {
              inputProps: { "aria-label": "rows per page" },
              native: true,
            },
          }}
          onPageChange={(_, page) => {
            setPageIndex(page);
          }}
          onRowsPerPageChange={(e) => {
            const size = e.target.value ? Number(e.target.value) : 10;
            console.log("Size Changed", size);
            setPageSize(size);
          }}
          ActionsComponent={TablePaginationActions}
        />
      </Box>
    </Container>
  );
}
