/*import * as React from "react";
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
import { useRouter } from "next/router";

export default function CreateSurvy() {
  const titleRef = React.useRef();
  const questionRef = React.useRef();
  const answerARef = React.useRef();
  const answerBRef = React.useRef();
  const ageMinRef = React.useRef();
  const ageMaxRef = React.useRef();
  const [country, setCountry] = React.useState();
  const [questNum, setQuestNum] = React.useState();
  const [gender, setGender] = React.useState();
  const [price, setPrice] = React.useState(0);
  const router = useRouter();
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/api/private/camprequest", {
      method: "POST",
      body: JSON.stringify({
        collection: "adRequests",
        task: "set",
        data: {
          status: "ÜBERPRÜFUNG",
          title: titleRef.current.value,
          question: questionRef.current.value,
          answerA: answerARef.current.value,
          answerB: answerBRef.current.value,
          ageMin: ageMinRef.current.value,
          ageMax: ageMaxRef.current.value,
          questionedNum: questNum,
          country: country,
          gender: gender,
        },
      }),
    })
      .then((response) => {
        router.push("/u/dashboard");
      })
      .catch((err) => {
        setErr(err.err);
      });
  };

  React.useEffect(() => {
    if (ageMinRef > 20 && ageMinRef < 35) {
      console.log(questNum)
      setPrice(50+questNum*0.25)
    } else if (ageMinRef > 35) {
      setPrice(75+questNum*0.25)
    }else{
      setPrice(questNum*0.25)
    }
  }, [ageMinRef,questNum])

  return (
    <div style={{ backgroundColor: "#f2f2f2" }}>
      <Header />
      <Container>
        <Box
          component="form"
          noValidate
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
              label="Tietel der Umfrage"
              name="title"
              inputRef={titleRef}
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
              inputRef={questionRef}
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
                inputRef={answerARef}
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
                inputRef={answerBRef}
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
              <Box sx={{ display: "flex", gap: "5px", alignItems: "end" }}>
                <Typography variant="h5">Alter</Typography>
                <Typography variant="caption">Verwenden Sie nur Zahlen bei der Angabe!</Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "3%" }}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="agemin"
                  label="Alter (von)"
                  id="agemin"
                  type="number"
                  inputRef={ageMinRef}
                  required
                  sx={{
                    my: "10px",
                    backgroundColor: "#fff",
                    borderRadius: "4px",
                  }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="agemax"
                  label="Alter (bis)"
                  id="agemax"
                  required
                  inputRef={ageMaxRef}
                  sx={{
                    my: "10px",
                    backgroundColor: "#fff",
                    borderRadius: "4px",
                  }}
                />
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
              value={["1000", "2500", "5000", "10000"]}
            />
          </Box>
          <Box>
            <Typography variant="h5">Geschlecht der Befragten</Typography>
            <ToggleButton
              onClick={(state) => {
                setGender(state);
              }}
              value={["Männlich", "Weiblich", "Alle"]}
            />
          </Box>
          <Box>
            <Typography>Preis</Typography>
            <Typography>{price}</Typography></Box>
          <Button
            type="submit"
            variant="contained"
            sx={[
              { "&:hover": { backgroundColor: "#FF54BD", color: "#fff" } },
              {
                mb: 5,
                backgroundColor: "#EB0388",
                color: "#fff",
                width: "25%",
                height: "58px",
              },
            ]}
            onClick={(event) => handleSubmit(event)}
          >
            Umfrage aufgeben
          </Button>
        </Box>
      </Container>
      <FooterAdmin />
    </div>
  );
}
*/

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
import { useRouter } from "next/router";

export default function CreateSurvy() {
  const [title, setTitle] = React.useState("");
  const [question, setQuestion] = React.useState("");
  const [answerA, setAnswerA] = React.useState("");
  const [answerB, setAnswerB] = React.useState("");
  const [ageMin, setAgeMin] = React.useState("");
  const [ageMax, setAgeMax] = React.useState("");
  const [country, setCountry] = React.useState();
  const [questNum, setQuestNum] = React.useState("1000");
  const [gender, setGender] = React.useState("Alle");
  const [price, setPrice] = React.useState(0);
  const router = useRouter();

  /*const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/api/private/camprequest", {
      method: "POST",
      body: JSON.stringify({
        collection: "adRequests",
        task: "set",
        data: {
          status: "ÜBERPRÜFUNG",
          title: title,
          question: question,
          answerA: answerA,
          answerB: answerB,
          ageMin: ageMin,
          ageMax: ageMax,
          questionedNum: questNum,
          country: country,
          gender: gender,
        },
      }),
    })
      .then((response) => {
        router.push("/u/dashboard");
      })
      .catch((err) => {
        setErr(err.err);
      });
  };*/

  const handleSubmit = (event) => {  
      sessionStorage.setItem('survey', JSON.stringify({
        type: "ipsurvey",
        title: title,
        question: question,
        answerA: answerA,
        answerB: answerB,
        ageMin: ageMin,
        ageMax: ageMax,
        questionedNum: questNum,
        country: country,
        gender: gender,
      }))
      router.push("/checkout")
  }

  React.useEffect(() => {
    if (ageMin > 20 && ageMin < 35) {
      setPrice(50 + questNum * 0.25);
    } else if (ageMin >= 35) {
      setPrice(75 + questNum * 0.25);
    } else {
      setPrice(questNum * 0.25);
    }
  }, [ageMin, questNum]);

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
              label="Tietel der Umfrage"
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
              <Box sx={{ display: "flex", gap: "5px", alignItems: "end" }}>
                <Typography variant="h5">Alter</Typography>
                <Typography variant="caption">
                  Verwenden Sie nur Zahlen bei der Angabe!
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "3%" }}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="agemin"
                  label="Alter (von)"
                  id="agemin"
                  type="number"
                  value={ageMin}
                  onChange={(e) => setAgeMin(e.target.value)}
                  required
                  sx={{
                    my: "10px",
                    backgroundColor: "#fff",
                    borderRadius: "4px",
                  }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="agemax"
                  label="Alter (bis)"
                  id="agemax"
                  required
                  value={ageMax}
                  onChange={(e) => setAgeMax(e.target.value)}
                  sx={{
                    my: "10px",
                    backgroundColor: "#fff",
                    borderRadius: "4px",
                  }}
                />
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
            <Typography>{price}</Typography>
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={[
              { "&:hover": { backgroundColor: "#FF54BD", color: "#fff" } },
              {
                mb: 5,
                backgroundColor: "#EB0388",
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
