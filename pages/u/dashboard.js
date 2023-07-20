import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Header from "../../components/Header"
import FooterAdmin from "../../components/FooterAdmin";
import Box from "@mui/material/Box"
import ChatIcon from '@mui/icons-material/Chat';
import PieChartIcon from '@mui/icons-material/PieChart';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import CampaignIcon from '@mui/icons-material/Campaign';
import Link from "next/link";
export default function dashboard() {
    return (
        <div style={{ backgroundColor: "#f2f2f2", display: "felx", minHeight: "100vh", flexDirection: "column" }}>
            <Header />
            <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh" }}>
                <Typography component="h5" variant="h5" sx={{ mt: "7%", mb: "3%" }}>
                    Hey. Schön, dass Sie da sind!
                </Typography>
                <Typography component="h4" variant="h4" fontWeight="bold" sx={{ mt: "0", mb: "0" }}>
                    Wie können wir Ihnen helfen?
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", width: "100%", mt: "15px", justifyContent: "space-between", }}>
                    <Link href="/surveyselect"  style={{ textDecoration: 'none', color:"#000" }}>
                        <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", gap: "20px" }}>
                            <Box sx={{ backgroundColor: "blue", borderRadius: "25px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", width: "200px", height: "200px" }}>
                                <CampaignIcon sx={{ fontSize: 60, color: "#fff", }} />
                            </Box>
                            <Typography component="p" variant="p">
                                Neue Umfrage erstellen
                            </Typography>
                        </Box>
                    </Link>
                    <Link href="/surveystodo"  style={{ textDecoration: 'none', color:"#000" }}>
                        <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", gap: "20px" }}>
                            <Box sx={{ backgroundColor: "blue", borderRadius: "25px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", width: "200px", height: "200px" }}>
                                <ChatIcon sx={{ fontSize: 60, color: "#fff" }} />
                            </Box>
                            <Typography component="p" variant="p">
                                Bei Umfrage teilnehmen
                            </Typography>
                        </Box>
                    </Link>
                    <Link href="/results"  style={{ textDecoration: 'none', color:"#000" }}>
                        <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", gap: "20px" }}>
                            <Box sx={{ backgroundColor: "blue", borderRadius: "25px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", width: "200px", height: "200px" }}>
                                <PieChartIcon sx={{ fontSize: 60, color: "#fff" }} />
                            </Box>
                            <Typography component="p" variant="p">
                                Ergebnisse ansehen
                            </Typography>
                        </Box>
                    </Link>
                    <Link href="/"  style={{ textDecoration: 'none', color:"#000" }}>
                        <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", gap: "20px" }}>
                            <Box sx={{ backgroundColor: "blue", borderRadius: "25px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", width: "200px", height: "200px" }}>
                                <Box>
                                    <FindInPageIcon sx={{ fontSize: 60, color: "#fff" }} />
                                </Box>
                            </Box>
                            <Typography component="p" variant="p">
                                zur Datenpalttform
                            </Typography>
                        </Box>
                    </Link>
                </Box>
            </Container>
            <FooterAdmin />
        </div>
    );
}