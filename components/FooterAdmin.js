import { BottomNavigation, Toolbar, } from "@mui/material";
import { Box } from "@mui/system"
export default function footerAdmin() {
    return (
        <Box sx={{ flexGrow: 1}}>
            <BottomNavigation  sx={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor:"#0000FF", height:"30px" }}>
                <p style={{ fontSize: "15px", color:"#fff",my:"0px" }}>
                    &copy; datacircle GmbH
                </p>
            </BottomNavigation>
        </Box>
    );
}