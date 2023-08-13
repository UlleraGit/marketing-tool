/* eslint-disable */
import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ToggleButton from "/components/ToggleButton";
import Link from "next/link";
import Header from "../../components/Header";
import FooterAdmin from "/components/FooterAdmin";
import Autocomplete from "../../components/Autocomplete";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useRouter } from "next/router";
import { useMediaQuery } from "@mui/material";

export default function CreateSurvy() {
    const ageRange = Array.from({ length: 65 - 15 }, (_, index) => 16 + index);
    const [title, setTitle] = React.useState("");
    const [question, setQuestion] = React.useState("");
    const [answerA, setAnswerA] = React.useState("");
    const [answerB, setAnswerB] = React.useState("");
    const [ageMin, setAgeMin] = React.useState(16);
    const [ageMax, setAgeMax] = React.useState(65);
    const [country, setCountry] = React.useState();
    const [questNum, setQuestNum] = React.useState("1000");
    const [gender, setGender] = React.useState("Alle");
    const [text, setText] = React.useState("")
    const router = useRouter();
    const phone = useMediaQuery('(max-width:767px)')
    const tablet = useMediaQuery('(max-width:1024px)')

    const handleSubmit = (event) => {
        event.preventDefault();

        if (ageMax < ageMin) {
            alert("Minimum Alter muss kleiner seine als das maximum Alter.");
            return;
        }

        if (
            !title ||
            !question ||
            !answerA ||
            !answerB ||
            !ageMin ||
            !ageMax ||
            !country ||
            !questNum ||
            !gender
        ) {
            alert("Please fill out all the required fields before submitting.");
            return;
        }
        try {
            fetch("/api/private/createipsurveypro", {
                method: "POST",
                body: JSON.stringify({
                    type: "ipsurveypro",
                    title: title,
                    question: question,
                    answerA: answerA,
                    answerB: answerB,
                    ageMin: ageMin,
                    ageMax: ageMax,
                    questionedNum: questNum,
                    country: country,
                    gender: gender,
                    text: text
                })
            })
                .then(async (data) => {
                    if (data.ok) {
                        console.log("File uploaded successfully");
                        router.push("/u/dashboard")
                    }
                })
        } catch (error) {
            console.error("An error occurred while uploading the file:", error);
        }
    };

    if (tablet) {
        return (
            <div style={{ backgroundColor: "#f2f2f2" }}>
                <Header />
                <Container>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{
                            mt: 3,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            gap: "25px",
                            mb: "2%",
                        }}
                    >
                        <Box>
                            <Link href="/u/dashboard" style={{ color: "#000" }}>
                                zurück
                            </Link>
                        </Box>
                        <Typography
                            component="h3"
                            variant="h3"
                            sx={{ alignSelf: "left", fontWeight: "bold" }}
                        >
                            Erstellen wir eine neue Umfrage.
                        </Typography>
                        <Box>
                            <Typography variant="h5" sx={{ margin: "0" }}>
                                Titel der Umfrage
                            </Typography>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="title"
                                label="Titel der Umfrage"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                sx={{ my: "10px", backgroundColor: "#fff", borderRadius: "4px" }}
                            />
                        </Box>
                        <Box>
                            <Typography variant="h5">Fragestellung</Typography>
                            <TextField
                                margin="normal"
                                fullWidth
                                name="question"
                                label="Fragestellung"
                                id="question"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                sx={{ my: "10px", backgroundColor: "#fff", borderRadius: "4px" }}
                            />
                        </Box>
                        <Box>
                            <Typography variant="h5">Antwortmöglichkeiten</Typography>
                            <Box sx={{ display: "flex", gap: "3%" }}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    name="answer1"
                                    label="Antwortmöglichkeit A"
                                    id="answer1"
                                    value={answerA}
                                    onChange={(e) => setAnswerA(e.target.value)}
                                    sx={{
                                        my: "10px",
                                        backgroundColor: "#fff",
                                        borderRadius: "4px",
                                    }}
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    name="answer2"
                                    label="Antwortmöglichkeit B"
                                    id="answer2"
                                    value={answerB}
                                    onChange={(e) => setAnswerB(e.target.value)}
                                    sx={{
                                        my: "10px",
                                        backgroundColor: "#fff",
                                        borderRadius: "4px",
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <Typography variant="h5">Alter</Typography>
                            <Box sx={{ display: "flex", gap: "3%" }}>
                                <FormControl fullWidth>
                                    <InputLabel id="agemin-label">Alter (von)</InputLabel>
                                    <Select
                                        labelId="agemin-label"
                                        value={ageMin}
                                        onChange={(e) => setAgeMin(e.target.value)}
                                        label="Alter (von)"
                                        fullWidth
                                        sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
                                    >
                                        {ageRange.map((age) => (
                                            <MenuItem key={age} value={age}>
                                                {age}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel id="agemax-label">Alter (bis)</InputLabel>
                                    <Select
                                        labelId="agemax-label"
                                        value={ageMax}
                                        onChange={(e) => setAgeMax(e.target.value)}
                                        label="Alter (bis)"
                                        fullWidth
                                        sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
                                    >
                                        {ageRange.map((age) => (
                                            <MenuItem key={age} value={age}>
                                                {age}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                        <Box sx={{ direction: "flex", flexDirection: "column" }}>
                            <Typography variant="h5">
                                Länder
                            </Typography>
                            <Autocomplete onChange={(event, value) => setCountry(value)} />
                        </Box>
                        <Box>
                            <Typography variant="h5">Anzahl der Befragten</Typography>
                            <ToggleButton
                                onClick={(state) => {
                                    setQuestNum(state);
                                }}
                                startingValue="1000"
                                value={["1000", "2500", "5000", "10000"]}
                            />
                        </Box>
                        <Box>
                            <Typography variant="h5">Geschlecht der Befragten</Typography>
                            <ToggleButton
                                onClick={(state) => {
                                    setGender(state);
                                }}
                                startingValue="Alle"
                                value={["Männlich", "Weiblich", "Alle"]}
                            />
                        </Box>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { backgroundColor: '#fff', width: "100%" },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                id="outlined-multiline"
                                label="Beschreib die zusätzlichen Zielgruppenerwartungen."
                                multiline
                                rows={4}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </Box>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={[
                                { "&:hover": { backgroundColor: "#0000ff", color: "#fff" } },
                                {
                                    mb: 5,
                                    backgroundColor: "#0000ff",
                                    color: "#fff",
                                    width: "25%",
                                    height: "58px",
                                },
                            ]}
                        >
                            Angebot anfragen
                        </Button>
                    </Box>
                </Container>
                <FooterAdmin />
            </div>
        );
    } else {
        return (
            <div style={{ backgroundColor: "#f2f2f2" }}>
                <Header />
                <Container>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{
                            mt: 3,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            gap: "25px",
                            mb: "2%",
                        }}
                    >
                        <Box>
                            <Link href="/u/dashboard" style={{ color: "#000" }}>
                                zurück
                            </Link>
                        </Box>
                        <Typography
                            component="h3"
                            variant="h3"
                            sx={{ alignSelf: "left", fontWeight: "bold" }}
                        >
                            Erstellen wir eine neue Umfrage.
                        </Typography>
                        <Box>
                            <Typography variant="h5" sx={{ margin: "0" }}>
                                Titel der Umfrage
                            </Typography>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="title"
                                label="Titel der Umfrage"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                sx={{ my: "10px", backgroundColor: "#fff", borderRadius: "4px" }}
                            />
                        </Box>
                        <Box>
                            <Typography variant="h5">Fragestellung</Typography>
                            <TextField
                                margin="normal"
                                fullWidth
                                name="question"
                                label="Fragestellung"
                                id="question"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                sx={{ my: "10px", backgroundColor: "#fff", borderRadius: "4px" }}
                            />
                        </Box>
                        <Box>
                            <Typography variant="h5">Antwortmöglichkeiten</Typography>
                            <Box sx={{ display: "flex", gap: "3%" }}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    name="answer1"
                                    label="Antwortmöglichkeit A"
                                    id="answer1"
                                    value={answerA}
                                    onChange={(e) => setAnswerA(e.target.value)}
                                    sx={{
                                        my: "10px",
                                        backgroundColor: "#fff",
                                        borderRadius: "4px",
                                    }}
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    name="answer2"
                                    label="Antwortmöglichkeit B"
                                    id="answer2"
                                    value={answerB}
                                    onChange={(e) => setAnswerB(e.target.value)}
                                    sx={{
                                        my: "10px",
                                        backgroundColor: "#fff",
                                        borderRadius: "4px",
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", gap: "3%" }}>
                            <Box sx={{ width: "50%" }}>
                                <Typography sx={{mb:"10px"}} variant="h5">Alter</Typography>
                                <Box sx={{ display: "flex", gap: "3%" }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="agemin-label">Alter (von)</InputLabel>
                                        <Select
                                            labelId="agemin-label"
                                            value={ageMin}
                                            onChange={(e) => setAgeMin(e.target.value)}
                                            label="Alter (von)"
                                            fullWidth
                                            sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
                                        >
                                            {ageRange.map((age) => (
                                                <MenuItem key={age} value={age}>
                                                    {age}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <InputLabel id="agemax-label">Alter (bis)</InputLabel>
                                        <Select
                                            labelId="agemax-label"
                                            value={ageMax}
                                            onChange={(e) => setAgeMax(e.target.value)}
                                            label="Alter (bis)"
                                            fullWidth
                                            sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
                                        >
                                            {ageRange.map((age) => (
                                                <MenuItem key={age} value={age}>
                                                    {age}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>
                            <Box sx={{ width: "50%" }}>
                                <Autocomplete onChange={(event, value) => setCountry(value)} />
                            </Box>
                        </Box>
                        <Box>
                            <Typography variant="h5">Anzahl der Befragten</Typography>
                            <ToggleButton
                                onClick={(state) => {
                                    setQuestNum(state);
                                }}
                                startingValue="1000"
                                value={["1000", "2500", "5000", "10000"]}
                            />
                        </Box>
                        <Box>
                            <Typography variant="h5">Geschlecht der Befragten</Typography>
                            <ToggleButton
                                onClick={(state) => {
                                    setGender(state);
                                }}
                                startingValue="Alle"
                                value={["Männlich", "Weiblich", "Alle"]}
                            />
                        </Box>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { backgroundColor: '#fff', width: "100%" },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                id="outlined-multiline"
                                label="Beschreib die zusätzlichen Zielgruppenerwartungen."
                                multiline
                                rows={4}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </Box>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={[
                                { "&:hover": { backgroundColor: "#0000ff", color: "#fff" } },
                                {
                                    mb: 5,
                                    backgroundColor: "#0000ff",
                                    color: "#fff",
                                    width: "25%",
                                    height: "58px",
                                },
                            ]}
                        >
                            Angebot anfragen
                        </Button>
                    </Box>
                </Container>
                <FooterAdmin />
            </div>
        );
    }

}
