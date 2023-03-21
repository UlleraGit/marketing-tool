import { BottomNavigation, Toolbar, } from "@mui/material";
import { Box } from "@mui/system"
export default function footerAdmin() {
    return (
        <Box sx={{ flexGrow: 1}}>
            <BottomNavigation  sx={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor:"#fff", height:"30px" }}>
                <p style={{ fontSize: "15px", color:"#EB0388",my:"0px" }}>
                    &copy;Zgefragt
                </p>
            </BottomNavigation>
        </Box>
    );
}