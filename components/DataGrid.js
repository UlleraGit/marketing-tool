/** @jsxImportSource @emotion/react */
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from "next/link";
import { useRouter } from "next/router";
/* eslint-disable */
export default function dataGrid(props) {
  let rows = [];
  let adminState;
  (props.state === "true") ? adminState = true : adminState = false;
  const router = useRouter();
  const [pageSize, setPageSize] = React.useState(10);
  const columns = [
    {
      field: "user",
      headerName: "Auftraggeber",
      width: 90,
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
          case "INREVIEW":
            return "facebook-data-inreview";
          default:
            return "";
        }
      },
    },
    {
      field: "title",
      headerName: "Titel der Umfrage",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "question",
      headerName: "Fragestellung",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "answerA",
      headerName: "Antwort A",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "answerB",
      headerName: "Antwort B",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "age",
      headerName: "Alter",
      type: "number",
      width: 110,
      headerAlign: "center",
    },
    {
      field: "region",
      headerName: "Land/Region",
      width: 160,
      headerAlign: "center",
    },
    {
      field: "numberofasked",
      headerName: "Anzahl der Befragten (n)",
      type: "number",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "numbertoask",
      headerName: "Anzahl der zu Befragenden",
      type: "number",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "download",
      headerName: "",
      sortable: false,
      width: 70,
      renderCell: (params) => {
        if (params.row.status === "ÜBERPRÜFUNG" && props.state === "true") {
          return (
            <>
              <Link onClick={() => handleConfirm(params.id)} href={"/u/dashboard"}>
                <CheckIcon />
              </Link>
              <Link onClick={() => handleDecline(params.id)} href={"/u/dashboard"}>
                <CloseIcon />
              </Link>
            </>
          )
        }
        else if (params.row.status === "ABGELEHNT") {
          return (
            <Link onClick={()=>handleDelete(params.id)} href={"/u/dashboard"}>
              <DeleteIcon />
            </Link>
          )
        }
        else if (params.row.status === "INREVIEW"){
          return(
            <>
            </>
          )
        }
        else {
          return (
            <Link id={params.id} href={{ pathname: "/u/statistic" }}>
              <ArrowForwardIcon />
            </Link>
          )
        }
      },
      headerAlign: "center",
    },
  ];

  const handleConfirm = (id) => {
    fetch("http://localhost:3000/api/private/confirm", {
      method: "POST",
      body: JSON.stringify(
        props.value[id]
      )
    })
  }
  const handleDecline = (id) => {
    fetch("/api/private/decline", {
      method: "POST",
      body: JSON.stringify(
        props.value[id]
      ),
    }).then(router.reload())
  }
  const handleDelete = (id) => {
    fetch("/api/private/delete", {
      method: "POST",
      body: JSON.stringify(
        props.value[id]
      ),
    }).then(router.reload())
  }

  for (var i = 0; i < props.value.length; i++) {
    rows.push({
      id: i,
      user: props.value[i].user,
      status: props.value[i].status,
      title: props.value[i].title,
      question: props.value[i].question,
      answerA: props.value[i].answerA,
      answerB: props.value[i].answerB,
      region: props.value[i].country[0].name,
      numbertoask: props.value[i].questionedNum,
      age: props.value[i].ageMin + " - " + props.value[i].ageMax,
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
        "& .facebook-data-inreview":{
          backgroundColor: "#e6e2d8",
          border: "2px solid ##e6e2d8"
        }
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        columnVisibilityModel={{
          answerA: adminState,
          answerB: adminState,
        }}
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
/* eslint-disable */