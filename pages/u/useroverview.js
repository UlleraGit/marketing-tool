import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import HeaderAdmin from "../../components/HeaderAdmin";
import UserGrid from "../../components/UsersGrid";
import FooterAdmin from "../../components/FooterAdmin";
import Link from 'next/link'
import Box from "@mui/material/Box";

export default function UserOverview({ data }) {
    return (
        <div style={{ backgroundColor: "#f2f2f2", display: "felx", flexDirection: "column" }}>
            <HeaderAdmin />
            <Container sx={{ minHeight: "86.7vh", mt: 3 }}>
                <Box>
                    <Link href="/u/dashboard" style={{ color: "#000" }}>
                        zurück
                    </Link>
                </Box>
                <Typography component="h3" variant="h3" fontWeight="bold" sx={{ mt: "10px", mb: "12.5px" }}>
                    Einstellungen
                </Typography>
                <Typography component="h5" variant="h5" sx={{ mt: "12.5", mb: "10px" }}>
                    Benutzerübersicht
                </Typography>
                <UserGrid value={data.tableData} />
            </Container>
            <FooterAdmin />
        </div>
    );
}
export async function getServerSideProps(context) {
    let getData = await connection({ task: "get", find: { manager: context.req.headers["x-admin-state"] }, collection: "teams" }).then(result => { return result })
    let data = {
        state: context.req.headers["x-admin-state"],
        tableData: getData,
    };
    return { props: { data } };
}