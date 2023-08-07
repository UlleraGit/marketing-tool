/* eslint-disable */ 
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Header from "../../components/Header"
import FooterAdmin from "/components/FooterAdmin";
import Box from "@mui/material/Box"
import PieChartIcon from '@mui/icons-material/PieChart';
import Link from 'next/link'
import useSWR from "swr";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

export default function surveySelect() {
    const [answeredSurveys, setansweredSurveys] = useState()
    const fetcher = (...args) => fetch(...args, {
        method: "POST",
    }).then(res => res.json()).then(res => { setansweredSurveys(Math.floor(res / 7)); return (res) })
    const { data, error, isLoading, isValidating } = useSWR('/api/private/getuser', fetcher, {
        revalidateOnFocus: false,
    })
    if (error) {
        return <div>Error occurred while fetching data.</div>;
    }

    if (isLoading || isValidating) {
        return (
            <>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mx: "10%", minHeight: "100vh", }}>
                    <CircularProgress />
                </Box>
            </>);
    }

    return (
        <div style={{ backgroundColor: "#f2f2f2", display: "felx", minHeight: "100vh", flexDirection: "column" }}>
            <Header />
            <Container sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", mb: "100px" }}>
                <Typography component="h5" variant="h5" sx={{ mt: "7%", mb: "3%" }}>
                    Erstellen wir eine neue Umfrage.
                </Typography>
                <Typography component="h4" variant="h4" fontWeight="bold" sx={{ mt: "0", mb: "0" }}>
                    Wähle bitte eine passende Befragungsmethode aus!
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", width: "100%", mt: "15px", gap: "50px" }}>
                    <Link href="/u/createdcsurvey" style={{ color: "#000", textDecoration: 'none' }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                            <Box sx={{ backgroundColor: "blue", borderRadius: "25px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", minWidth: "200px", minHeight: "200px" }}>
                                <PieChartIcon sx={{ fontSize: 60, color: "#fff" }} />
                            </Box>
                            <Box sx={{ width: "50%", display: "flex", flexDirection: "column", gap: "10px" }}>
                                <Typography component="h5" variant="h5" sx={{ color: "#0000ff" }}>
                                    datacircle-community-Befragung
                                </Typography>
                                <Typography component="p" variant="p" fontWeight="bold">
                                    max. 100 Befragte | max. 10 Fragestellungen
                                </Typography>
                                <Box sx={{ display: "flex", gap: "10px" }}>
                                    <Typography sx={{ textDecoration: "underline" }}>
                                        kostenlos
                                    </Typography>
                                    <Typography > Verfügbare Gratisumfragen: {answeredSurveys}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Link>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                        <Link href="/u/createsurvey" style={{ color: "#000", textDecoration: 'none' }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                                <Box sx={{ backgroundColor: "blue", borderRadius: "25px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", minWidth: "200px", minHeight: "200px" }}>
                                    <PieChartIcon sx={{ fontSize: 60, color: "#fff" }} />
                                </Box>
                                <Box sx={{ width: "50%", display: "flex", flexDirection: "column", gap: "10px" }}>
                                    <Typography component="h5" variant="h5" sx={{ color: "#0000ff" }}>
                                        Impression Survey
                                    </Typography>
                                    <Typography component="p" variant="p" fontWeight="bold">
                                        100-10.000 Befragte | 24h-14 Tage Befragungszeitraum
                                    </Typography>
                                    <Typography sx={{ textDecoration: "underline" }}>
                                        Kosten pro Fragestellung ab 300€
                                    </Typography>
                                </Box>
                            </Box>
                        </Link>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                        <Link href="/u/createsurveypro" style={{ color: "#000", textDecoration: 'none' }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                                <Box sx={{ backgroundColor: "blue", borderRadius: "25px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", minWidth: "200px", minHeight: "200px" }}>
                                    <PieChartIcon sx={{ fontSize: 60, color: "#fff" }} />
                                </Box>
                                <Box sx={{ width: "50%", display: "flex", flexDirection: "column", gap: "10px" }}>
                                    <Typography component="h5" variant="h5" sx={{ color: "#0000ff" }}>
                                        Impression Survey PRO
                                    </Typography>
                                    <Typography component="p" variant="p" fontWeight="bold">
                                        1.000-10.000 Befragte | 24h-14 Tage Befragungszeitraum
                                    </Typography>
                                    <Typography sx={{ textDecoration: "underline" }}>
                                        Kosten pro Fragestellung auf Anfrage
                                    </Typography>
                                </Box>
                            </Box>
                        </Link>
                    </Box>
                </Box>
            </Container>
            <FooterAdmin />
        </div>
    );
}