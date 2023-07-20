import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Header from "/components/Header"
import FooterAdmin from "/components/FooterAdmin";
import Box from "@mui/material/Box"
import PieChartIcon from '@mui/icons-material/PieChart';
import Link from 'next/link'

export default function surveySelect() {
    return (
        <div style={{ backgroundColor: "#f2f2f2", display: "felx", minHeight: "100vh", flexDirection: "column" }}>
            <Header/>
            <Container sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", my: "10px" }}>
                <Typography component="h5" variant="h5" sx={{ mt: "7%", mb: "3%" }}>
                    Erstellen wir eine neue Umfrage.
                </Typography>
                <Typography component="h4" variant="h4" fontWeight="bold" sx={{ mt: "0", mb: "0" }}>
                    Wählen Sie bitte die passende Befragungsmethode aus.
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", width: "100%", mt: "15px", gap: "40px" }}>
                    <Link href="/createdcsurvey" style={{color:"#000", textDecoration: 'none'}}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                            <Box sx={{ backgroundColor: "blue", borderRadius: "25px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", minWidth: "200px", minHeight: "200px" }}>
                                <PieChartIcon sx={{ fontSize: 60, color: "#fff" }} />
                            </Box>
                            <Box sx={{ width: "50%" }}>
                                <Typography component="h5" variant="h5" sx={{ color: "#0000ff" }}>
                                    datacircle-Befragung
                                </Typography>
                                <Typography component="p" variant="p" fontWeight="bold">
                                    100 Befrage | 7 Tage Befragungszeitraum
                                </Typography>
                                <Typography component="p" variant="p" >
                                    Unsere Social-Media-Befragung eignet sich für die, die eine schnelle Erhebung von validen Daten benötigen. Bsp.: StudentInnen und SchülerInnen.
                                </Typography>
                                <Typography component="p" variant="p" >
                                    + Unkompliziert und kostenlos
                                </Typography>
                                <Typography component="p" variant="p" >
                                    - Maximal 8 Fragestellungen und geringere Aussagekraft.
                                </Typography>
                            </Box>
                        </Box>
                    </Link>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                        <Box sx={{ backgroundColor: "blue", borderRadius: "25px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", width: "200px", height: "200px" }}>
                            <PieChartIcon sx={{ fontSize: 60, color: "#fff" }} />
                        </Box>
                        <Typography component="p" variant="p">
                            Bei Umfrage teilnehmen
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                        <Box sx={{ backgroundColor: "blue", borderRadius: "25px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", width: "200px", height: "200px" }}>
                            <PieChartIcon sx={{ fontSize: 60, color: "#fff" }} />
                        </Box>
                        <Typography component="p" variant="p">
                            Ergebnisse ansehen
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                        <Box sx={{ backgroundColor: "blue", borderRadius: "25px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", width: "200px", height: "200px" }}>
                            <Box>
                                <PieChartIcon sx={{ fontSize: 60, color: "#fff" }} />
                            </Box>
                        </Box>
                        <Typography component="p" variant="p">
                            zur Datenpalttform
                        </Typography>
                    </Box>
                </Box>
            </Container>
            <FooterAdmin />
        </div>
    );
}