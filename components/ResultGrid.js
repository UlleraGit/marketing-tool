/** @jsxImportSource @emotion/react */
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import { useRouter } from "next/router";
/* eslint-disable */
export default function resultGrid(props) {
    let rows = props.value;
    const router = useRouter();
    const [pageSize, setPageSize] = React.useState(10);
    const columns = [
        {
            field: "type",
            headerName: "Befragungsart",
            width: 150,
            headerAlign: "center",
        },
        {
            field: "status",
            headerAlign: "center",
            width: 150,
            headerName: "Status",
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
            width: 300,
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
                if (params.row.status === "FERTIG" || params.row.status === "AKTIV") {
                    if (params.row.type === 'dcsurvey') {
                        return (
                            <Link id={params.id} href={{ pathname: `/dcsurveychart` , query: { slected_survey: params.row._id }}}>
                                <ArrowForwardIcon style={{ color: "#0000ff" }} />
                            </Link>
                        )
                    }
                    else if (params.row.type === "ipsurvey") {
                        return (
                            <Link id={params.id} href={{ pathname: `/ipsurveychart`, query: { slected_survey: params.row._id } }}>
                                <ArrowForwardIcon style={{ color: "#0000ff" }} />
                            </Link>
                        )
                    }
                }
                else {
                    return (
                        <>
                        </>
                    )
                }
            },
            headerAlign: "center",
        },
    ];

    return (
        <Box
            sx={{
                height: 600,
                width: "100%",

                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#212529",
                    borderRadius: "10px 10px 0 0",
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
                "& .facebook-data-inreview": {
                    backgroundColor: "#e6e2d8",
                    border: "2px solid #e6e2d8"
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

                sx={{ borderRadius: "10px", boxShadow: " 0 3px 10px rgb(0 0 0 / 1)", "& .MuiSvgIcon-root": { color: "#fff" } }}
            />
        </Box>
    );
};
/* eslint-disable */