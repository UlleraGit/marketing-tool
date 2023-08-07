/* eslint-disable */ 
import Header from "../../components/Header";
import PricingPage from "../../components/PricingPage";
import FooterAdmin from "../../components/FooterAdmin";
import { Box } from "@mui/material";
export default function reports() {
    return (
        <>
            <Header />
            <Box sx={{ display: "flex", flexDirection: "column", width: "100%", minHeight: "100vh", padding: "2% 25% 0 25%", justifyContent: "center", alignContent: "center" }}>
                <PricingPage />
            </Box>
            <FooterAdmin />
        </>
    )
}