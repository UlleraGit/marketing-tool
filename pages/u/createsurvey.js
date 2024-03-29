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
  const [price, setPrice] = React.useState(0);
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

    sessionStorage.setItem('survey', JSON.stringify({
      type: "ipsurvey",
      title: title,
      question: question,
      answerA: answerA,
      answerB: answerB,
      ageMin: ageMin,
      ageMax: ageMax,
      numbertoask: questNum,
      country: country,
      gender: gender,
    }))
    router.push("/u/checkout")
  }

  React.useEffect(() => {
    if (ageMin > 17 && ageMin < 35) {
      setPrice(50 * (questNum/1000) + questNum * 0.35);
    } else if (ageMin >= 35) {
      setPrice(75 * (questNum/1000) + questNum * 0.35);
    } else {
      setPrice(questNum * 0.25);
    }
  }, [ageMin, questNum]);
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
            <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
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
            <Box>
              <Typography>Preis</Typography>
              <Typography>{price}</Typography>
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
                  width: "40%",
                  height: "58px",
                },
              ]}
            >
              Umfrage aufgeben
            </Button>
          </Box>
        </Container>
        <FooterAdmin />
      </div>
    );
  }
  else {
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
            <Box>
              <Typography>Preis</Typography>
              <Typography>{price + " €"}</Typography>
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
              Umfrage aufgeben
            </Button>
          </Box>
        </Container>
        <FooterAdmin />
      </div>
    );
  }
}
