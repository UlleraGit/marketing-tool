import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import ToggleButton from "/components/ToggleButton";
import Link from "next/link";
import HeaderUser from "/components/HeaderUser";
import HeaderAdmin from "/components/HeaderAdmin";
import FooterAdmin from "/components/FooterAdmin";

export default function CreateSurvy({ data }) {
  const titleRef = React.useRef();
  const questionRef = React.useRef();
  const answerARef = React.useRef();
  const answerBRef = React.useRef();
  const ageMinRef = React.useRef();
  const ageMaxRef = React.useRef();
  const countryRef = React.useRef();
  const [questNum, setQuestNum] = React.useState();
  const [gender, setGender] = React.useState();
  const [fastSurv, setFastSurv] = React.useState(false);
  console.log(data)
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/api/private/camprequest", {
      method: "POST",
      body: JSON.stringify({
        collection: "adRequests",
        task: "set",
        data: {
          user: data.username,
          status: "ÜBERPRÜFUNG",
          title: titleRef.current.value,
          question: questionRef.current.value,
          answerA: answerARef.current.value,
          answerB: answerBRef.current.value,
          ageMin: ageMinRef.current.value,
          ageMax: ageMaxRef.current.value,
          country: countryRef.current.value,
          questionedNum: questNum,
          gender: gender,
          fastSurvey: fastSurv,
        },
      }),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        setErr(err.err);
      });
  };
  return (
    <div style={{ backgroundColor: "#f2f2f2" }}>
      {data.state == "true" ? <HeaderAdmin /> : <HeaderUser />}
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
              <Typography variant="h5">Land/Region</Typography>
              <TextField
                margin="normal"
                fullWidth
                name="locations"
                label="Land/Region"
                id="locations"
                required
                inputRef={countryRef}
                sx={{
                  my: "10px",
                  backgroundColor: "#fff",
                  borderRadius: "4px",
                }}
              />
            </Box>
          </Box>
          <Box>
            <Typography variant="h5">Anzahl der Befragten</Typography>
            <ToggleButton
              onClick={(state) => {
                setQuestNum(state);
              }}
              value={["1000+", "2500+", "5000+", "10000+"]}
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
            <Typography variant="h5">Fast Survey</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(event) => {
                    setFastSurv(event.target.checked);
                  }}
                  value="remember"
                  color="primary"
                  size="large"
                />
              }
              label="Mit der Fast Survey Option können Sie innerhalb von 24 Stunden Ihre Daten erheben."
            />
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

export async function getServerSideProps(context) {
  let data = {
    state: context.req.headers["x-admin-state"],
    username: context.req.headers["x-username"],
  };
  return { props: { data } };
}
