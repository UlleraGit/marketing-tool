import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import Typography from "@mui/material/Typography"
import ToggleButton from '/components/ToggleButton'
import Link from 'next/link'
import HeaderUser from "/components/HeaderUser"
import FooterUser from "/components/FooterUser"

export default function CreateSurvy() {
    return (
        <div style={{ backgroundColor: "#f2f2f2", }}>
            <HeaderUser />
            <Container >
                <Box component="form" noValidate sx={{ mt: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: "25px", mb: "2%" }}>
                    <Link href="/u/dashboard" style={{ color: "#000" }}>
                        zurück
                    </Link>
                    <Typography component="h3" variant="h3" sx={{ alignSelf: 'left', fontWeight: "bold" }}>
                        Erstellen wir eine neue Umfrage.
                    </Typography>
                    <Box>
                        <Typography variant="h5" sx={{ margin: '0' }} >
                            Titel der Umfrage
                        </Typography>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="title"
                            label="Tietel der Umfrage"
                            name="title"
                            sx={{ my: '10px', backgroundColor: '#fff', borderRadius: '4px' }}
                        />
                    </Box>
                    <Box>
                        <Typography variant="h5">
                            Fragestellung
                        </Typography>
                        <TextField
                            margin="normal"
                            fullWidth
                            name="question"
                            label="Fragestellung"
                            id="question"
                            sx={{ my: '10px', backgroundColor: '#fff', borderRadius: '4px' }}
                        />
                    </Box>
                    <Box>
                        <Typography variant="h5">
                            Antwortmöglichkeiten
                        </Typography>
                        <Box sx={{ display: 'flex', gap: '3%' }}>
                            <TextField
                                margin="normal"
                                fullWidth
                                name="answer1"
                                label="Antwortmöglichkeit A"
                                id="answer1"
                                sx={{ my: '10px', backgroundColor: '#fff', borderRadius: '4px' }}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                name="answer2"
                                label="Antwortmöglichkeit B"
                                id="answer2"
                                sx={{ my: '10px', backgroundColor: '#fff', borderRadius: '4px' }}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: '3%' }}>
                        <Box sx={{ width: '50%' }}>
                            <Typography variant="h5">
                                Alter
                            </Typography>
                            <Box sx={{ display: 'flex', gap: '3%' }}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    name="agemin"
                                    label="Alter (von)"
                                    id="agemin"
                                    sx={{ my: '10px', backgroundColor: '#fff', borderRadius: '4px' }}
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    name="agemax"
                                    label="Alter (bis)"
                                    id="agemax"
                                    sx={{ my: '10px', backgroundColor: '#fff', borderRadius: '4px' }}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ width: '50%' }}>
                            <Typography variant="h5">
                                Land/Region
                            </Typography>
                            <TextField
                                margin="normal"
                                fullWidth
                                name="locations"
                                label="Land/Region"
                                id="locations"
                                sx={{ my: '10px', backgroundColor: '#fff', borderRadius: '4px' }}
                            />
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="h5">
                            Anzahl der Befragten
                        </Typography>
                        <ToggleButton value={["1000+", "2500+", "5000+", "10000+"]} />
                    </Box>
                    <Box>
                        <Typography variant="h5">
                            Geschlecht der Befragten
                        </Typography>
                        <ToggleButton value={["Männlich", "Weiblich", "Alle"]} />
                    </Box>
                    <Box>
                        <Typography variant="h5">
                            Fast Survey
                        </Typography>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" size="large" />}
                            label='Mit der Fast Survey Option können Sie innerhalb von 24 Stunden Ihre Daten erheben.'
                        />
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={[{ '&:hover': { backgroundColor: "#FF54BD", color: '#fff' } }, { mb: 5, backgroundColor: "#EB0388", color: '#fff', width: "25%", height: "58px" }]}
                    >
                        Umfrage aufgeben
                    </Button>
                </Box>
            </Container>
            <FooterUser />
        </div>
    )
}