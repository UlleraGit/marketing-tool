/** @jsxImportSource @emotion/react */
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import CloseIcon from '@mui/icons-material/Close';
import Link from "next/link";
export default (props) => {
  let rows = [];
  const [pageSize, setPageSize] = React.useState(10);
  const columns = [
    {
      field: "user",
      headerName: "Auftraggeber",
      width: 90,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Titel der Umfrage",
      width: 150,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "team",
      headerName: "Team",
      width: 150,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "delete",
      headerName: "",
      sortable: false,
      width: 70,
      renderCell: (params) => {
        return (
          <Link href={{ pathname: "/u/statistic", query: {} }}>
            <CloseIcon />
          </Link>
        )
      },
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
  ];

  for (var i = 0; i < props.value.length; i++) {
    rows.push({
     user:props.value[i].user,
     name:props.value[i].name,
     team:props.value[i].team
    })
  }
  return (
    <Box
      sx={{
        height: 600,
        width: "100%",
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "rgba(90, 90, 90,1)",
          color: "#fff",
        }
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        disableSelectionOnClick
        sx={{ backgroundColor: "#fff" }}
      />
    </Box>
  );
};
