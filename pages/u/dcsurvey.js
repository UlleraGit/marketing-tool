/* eslint-disable */
import { Box, Button, Typography } from "@mui/material"
import SurveyForm from "/components/SurveyForm"
import Header from "../../components/Header"
import * as React from "react"
import { useRouter } from "next/router"
import useSWR from 'swr'
import { CircularProgress } from "@mui/material"

export default function dcSurvey() {
    const [survey, setSurvey] = React.useState([])
    const [button, setButton] = React.useState(true)
    const router = useRouter();

    const fetcher = (...args) => fetch(...args, {
        method: "POST",
        body: JSON.stringify({}),
    }).then(res => res.json()).then((a) => { setSurvey(a[0].survey); return (a) })
    const { data, error, isLoading, isValidating } = useSWR('/api/private/requestnewsurvey', fetcher, {
        revalidateOnFocus: false,
    });

    const submitForm = (event) => {
        let answers = []
        setButton(false)
        for (let i = 0; i < survey.length; i++) {
            if (sessionStorage.getItem(`answer-${(i + 1)}`) === null) {
                break
            }
            answers = [...answers, sessionStorage.getItem(`answer-${(i + 1)}`)]
        }

        if (data[0].survey.length != answers.length) {
            alert("Bitte beantworte alle Fragen!")
            setButton(true)
            return
        }
        fetch("/api/private/handin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                answer: answers,
                id: data[0]._id,
            })
        })
            .then((res) => res.json())
            .then(() => router.push('/u/dashboard'));
    }

    if (error) {
        return <Box sx={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}><div>Derzeit stehen keine Umfragen zur verfügung. Versuche es später nocheinmal.</div></Box>;
    }

    if (isLoading || isValidating) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mx: "10%", minHeight: "100vh", }}>
                <CircularProgress />
            </Box>);
    }

    return (
        <>
            <Header />

            {survey.map((x, i) => {
                return (
                    <SurveyForm key={i} id={i + 1} questions={
                        {
                            question: x.Q,
                            answers: x.A
                        }
                    }
                        img={x.img}
                    />
                )
            })}
            <Box id={"question-" + (survey.length + 1)} sx={{ display: "flex", minWidth: "90vw", height: "100vh", justifyContent: "center", alignItems: "center" }}>
                <Box sx={{ display: "flex", flexDirection: "column", minWidth: "90vw", width: "90vw", height: "90vh", boxShadow: " 0 3px 10px rgb(0 0 0 / 1)", borderRadius: "20px", justifyContent: "center", alignItems: "center", rowGap: "20px" }}>
                    <Typography fontWeight="bold" fontSize="45px"> Danke für deine Antworten!</Typography>
                    <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", }}>
                        <Button onClick={(button) ? ((event) => { submitForm(event) }) : ((event) => {event.preventDefault()})} sx={{ width: "700px", height: "30px", color: "#0000ff", borderColor: "#0000ff", backgroundColor: "#fff", '&:hover': { backgroundColor: "#0000ff", color: "#fff", borderColor: "#0000ff" }, borderRadius: "10px", }} variant="outlined">
                            Umfrage Einreichen
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}