
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import HeaderAdmin from "/components/HeaderAdmin"
import DataGrid from "/components/DataGrid";
import FooterAdmin from "/components/FooterAdmin";
import Link from 'next/link'

export default function UserOverview() {
    return (
        <div style={{ backgroundColor: "#f2f2f2", display: "felx", flexDirection: "column" }}>
            <HeaderAdmin />
            <Container sx={{ minHeight: "86.7vh",mt:3 }}>
            <Link href="/u/dashboard" style={{ color: "#000" }}>
                zurück
            </Link>
                <Typography component="h3" variant="h3" fontWeight="bold" sx={{ mt: "10px", mb: "12.5px" }}>
                    Einstellungen
                </Typography>
                <Typography component="h5" variant="h5" sx={{ mt: "12.5", mb: "10px" }}>
                    Benutzerübersicht
                </Typography>
                <DataGrid />
            </Container>
            <FooterAdmin />
        </div>
    );
}