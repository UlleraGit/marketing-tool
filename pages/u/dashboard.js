import Link from 'next/link'
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import HeaderAdmin from "/components/HeaderAdmin"
import DataGrid from "/components/DataGrid";
import FooterAdmin from "/components/FooterAdmin";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import PieChart from "/components/PieChart"

export default function Dashboard() {
    return (
        <div style={{ backgroundColor: "#f2f2f2", display: "felx", flexDirection: "column" }}>
            <HeaderAdmin />
            <Container sx={{ minHeight: "86.7vh", mt: 3 }}>
                <Typography component="h3" variant="h3" fontWeight="bold" sx={{ mt: "10px", mb: "12.5px" }}>
                    Hey. Schön, dass du da bist!
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", my: "5px" }}>
                    <Typography component="h5" variant="h5" >
                        Übersicht
                    </Typography>
                    <Link href="/u/createsurvey" passHref>
                        <Button variant="contained" >
                            <AddCircleOutlineIcon sx={{ mr: 1 }} /> Umfrage erstellen
                        </Button>
                    </Link>
                </Box>
                <DataGrid />
            </Container>
            <FooterAdmin />
        </div>
    );
}
