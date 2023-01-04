import { BottomNavigation, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system"



export default () => {
    return (
        <Box sx={{ flexGrow: 1}}>
            <BottomNavigation  sx={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor:"#EB0388", height:"30px" }}>
                <Typography sx={{ fontSize: "15px", color:"#fff",my:"0px" }}>
                    &copy;Zgefragt
                </Typography>
            </BottomNavigation>
        </Box>
    );
}