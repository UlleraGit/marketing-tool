/** @jsxImportSource @emotion/react */
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { css } from "@emotion/react";

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
    cellClassName: (params) => {
      switch (params.row.status) {
        case "FERTIG":
          return "facebook-data-finished";
        case "AKTIV":
          return "facebook-data-active";
        case "ÜBERPRÜFUNG":
          return "facebook-data-verifying";
        case "ABGELEHNT":
          return "facebook-data-declined";
        default:
          return "";
      }
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
  { id: 1, status: "AKTIV", lastName: "Snow", firstName: "Jon", age: 35 },
  {
    id: 2,
    status: "FERTIG",
    lastName: "Lannister",
    firstName: "Cersei",
    age: 42,
  },
  {
    id: 3,
    status: "ÜBERPRÜFUNG",
    lastName: "Lannister",
    firstName: "Jaime",
    age: 45,
  },
  { id: 4, status: "ABGELEHNT", lastName: "Stark", firstName: "Arya", age: 16 },
  {
    id: 5,
    status: "ABGELEHNT",
    lastName: "Targaryen",
    firstName: "Daenerys",
    age: null,
  },
  {
    id: 6,
    status: "ABGELEHNT",
    lastName: "Melisandre",
    firstName: null,
    age: 150,
  },
  {
    id: 7,
    status: "ABGELEHNT",
    lastName: "Clifford",
    firstName: "Ferrara",
    age: 44,
  },
  {
    id: 8,
    status: "ABGELEHNT",
    lastName: "Frances",
    firstName: "Rossini",
    age: 36,
  },
  {
    id: 9,
    status: "ABGELEHNT",
    lastName: "Roxie",
    firstName: "Harvey",
    age: 65,
  },
  {
    id: 10,
    status: "ABGELEHNT",
    lastName: "Roxie",
    firstName: "Harvey",
    age: 65,
  },
  {
    id: 11,
    status: "ABGELEHNT",
    lastName: "Roxie",
    firstName: "Harvey",
    age: 65,
  },
  {
    id: 12,
    status: "ABGELEHNT",
    lastName: "Roxie",
    firstName: "Harvey",
    age: 65,
  },
  {
    id: 13,
    status: "ABGELEHNT",
    lastName: "Roxie",
    firstName: "Harvey",
    age: 65,
  },
  {
    id: 14,
    status: "ABGELEHNT",
    lastName: "Roxie",
    firstName: "Harvey",
    age: 65,
  },
  {
    id: 15,
    status: "ÜBERPRÜFUNG",
    lastName: "Roxie",
    firstName: "Harvey",
    age: 65,
  },
  {
    id: 16,
    status: "ÜBERPRÜFUNG",
    lastName: "Roxie",
    firstName: "Harvey",
    age: 65,
  },
  {
    id: 17,
    status: "ÜBERPRÜFUNG",
    lastName: "Roxie",
    firstName: "Harvey",
    age: 65,
  },
  {
    id: 18,
    status: "ÜBERPRÜFUNG",
    lastName: "Roxie",
    firstName: "Harvey",
    age: 65,
  },
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
        "& .facebook-data-finished": {
          backgroundColor: "#EB0388",
          border: "2px solid #EB0388",
          borderradius: "10px",
        },
        "& .facebook-data-active": {
          backgroundColor: "#2bfa20",
          border: "2px solid #2bfa20",
        },
        "& .facebook-data-verifying": {
          backgroundColor: "#f7a120",
          border: "2px solid #f7a120",
        },
        "& .facebook-data-declined": {
          backgroundColor: "#f52525",
          border: "2px solid #f52525",
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
