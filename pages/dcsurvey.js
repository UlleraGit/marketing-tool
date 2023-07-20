import { Box, Button, Typography } from "@mui/material"
import SurveyForm from "/components/SurveyForm"
import Header from "../components/Header"
import * as React from "react"
import { useRouter } from "next/router"
import useSWR from 'swr'
import { CircularProgress } from "@mui/material"

export default function dcSurvey() {
    const [survey, setSurvey] = React.useState([])
    const router = useRouter();

    const fetcher = (...args) => fetch(...args, {
        method: "POST",
        body: JSON.stringify({}),
    }).then(res => res.json()).then(a => { setSurvey(a[0].survey); return (a) })
    const { data, error } = useSWR('/api/public/requestnewsurvey', fetcher);
    const isLoading = !data && !error;

    const submitForm = (event) => {
        let answers = []
        for (let i = 0; i < survey.length; i++) {
            answers = [...answers, sessionStorage.getItem(`answer-${(i + 1)}`)]
        }
        fetch("/api/public/handin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                answer: answers,
                id: data._id,
                email: sessionStorage.getItem("email")
            })
        })
            .then((res) => res.json())
            .then((data) => router.push('/u/dashboard'));
    }
    const handleClick = () => {
        console.log(data)
    }

    if (error) {
        return <div>Error occurred while fetching data.</div>;
    }

    if (isLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mx: "10%", minHeight: "100vh", }}>
                <CircularProgress />
            </Box>);
    }

    return (
        <>
            <Header />
            <button onClick={handleClick}>t</button>
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
                    <Typography fontWeight="bold" fontSize="60px"> Danke für deine Antworten!</Typography>
                    <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", }}>
                        <Button onClick={((event) => { submitForm(event) })} sx={{ width: "700px", height: "30px", color: "#0000ff", borderColor: "#0000ff", backgroundColor: "#fff", '&:hover': { backgroundColor: "#0000ff", color: "#fff", borderColor: "#0000ff" }, borderRadius: "10px", }} variant="outlined">
                            Umfrage Einreichen
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}