import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 90,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "status",
    align: "center",
    headerName: "User status",
    renderCell({ row }) {
      return (
        <Menu>
          <MenuItem children="ACTIVE" />
          <MenuItem children="INACTIVE" />
        </Menu>
      );
    },
  },
  {
    field: "title",
    headerName: "Titel der Umfrage",
    width: 150,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "question",
    headerName: "Fragestellung",
    width: 150,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "age",
    headerName: "Alter",
    type: "number",
    width: 110,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "region",
    headerName: "Land/Region",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "numberofasked",
    headerName: "Anzahl der Befragten (n)",
    type: "number",
    width: 200,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "download",
    headerName: "",
    sortable: false,
    width: 40,
    renderCell: () => (
      <Link href={{ pathname: "/u/statistic", query: {} }}>
        <ArrowForwardIcon />
      </Link>
    ),
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 10, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 11, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 12, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 13, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 14, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 15, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 16, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 17, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 18, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default (props) => {
  const [pageSize, setPageSize] = React.useState(5);
  return (
    <Box
      sx={{
        height: 600,
        width: "100%",
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "rgba(90, 90, 90,1)",
          color: "#fff",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        checkboxSelection
        disableSelectionOnClick
        sx={{ backgroundColor: "#fff" }}
      />
    </Box>
  );
};
