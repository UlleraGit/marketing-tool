/* eslint-disable */ 
import * as React from 'react'
import PieChart from "../../components/PieChart"
import BarChart from '../../components/BarChart'
import { Box } from '@mui/material'
import Link from 'next/link'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import useSWR from 'swr'
import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'

export default function ipSurveyChart(props) {
    const router = useRouter()
    const id = router.asPath.split('=')[1];

    const fetcher = (...args) => fetch(...args, {
        method: "POST",
        body: JSON.stringify({ id: id }),
    })
        .then(res => res.json())
        .then(r => {
            let ages = [...new Set(r.answers.groups.map((a, i) => (a.age)))]
            let genders = [...new Set(r.answers.groups.map((a, i) => { if (a.gender === "unknown") { return ("Keine Angabe") } else { return (a.gender) } }))]
            const agesSum = new Map()
            const gendersSum = new Map()
            r.answers.groups.map((a, i) => {
                if (agesSum.has(a.age)) {
                    agesSum.set(a.age, parseInt(agesSum.get(a.age)) + parseInt(a.result[0].value))
                } else {
                    agesSum.set(a.age, parseInt(a.result[0].value))
                }
            })
            r.answers.groups.map((a, i) => {
                if (gendersSum.has(a.gender)) {
                    gendersSum.set(a.gender, parseInt(gendersSum.get(a.gender)) + parseInt(a.result[0].value))
                } else {
                    gendersSum.set(a.gender, parseInt(a.result[0].value))
                }
            })
            let answersSum = parseInt(r.answers.answers[1].value) + parseInt(r.answers.answers[0].value)
            return ({ title: r.title, ages, genders, agesSum:Array.from(agesSum.values()), gendersSum: Array.from(gendersSum.values()), answerA: r.answerA, answerB: r.answerB, answers: [r.answers.answers[1].value, r.answers.answers[0].value],answersSum, type: r.type })
        })

    const { data, error, isLoading, isValidating } = useSWR('/api/private/getipsurvey', fetcher, {
        revalidateOnFocus: false,
    })

    if (error) {
        return <div>Error occurred while fetching data.</div>;
    }

    if (isLoading || isValidating) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mx: "10%", minHeight: "100vh", }}>
                <CircularProgress />
            </Box>);
    }

    return (
        <Box sx={{ width: "100%", height: "100vh" }}>
            <Box sx={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-around", overflow: "hidden" }}>
                <Box sx={{ display: "flex", minHeight: "49%", justifyContent: "space-around", alignContent: "space-around" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", width: "49%", justifyContent: "center", alignItems: "center", boxShadow: " 0 3px 10px rgb(0 0 0 / 1)", }}>
                        <Box sx={{ width: "100%", pl: "30px" }}>
                            <Link href="/u/results" style={{ color: "#000" }}>
                                <KeyboardBackspaceIcon fontSize='large' />
                            </Link>
                        </Box>
                        <Box sx={{ width: "90%", height: "60%" }}>
                            <BarChart
                                labels={data.ages}
                                data={{
                                    label: '# of Votes',
                                    data: data.agesSum,
                                }} />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", boxShadow: " 0 3px 10px rgb(0 0 0 / 1)", width: "49%", height: "100%", justifyContent: "space-around", alignContent: "space-around", alignItems: "stretch" }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mx: "5%" }}>
                            <p>
                                Titel
                            </p>
                            <p >
                                {data.title}
                            </p>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mx: "5%" }}>
                            <p>
                                Veröffentlichungsdatum:
                            </p>
                            <p >
                                31.03.2023
                            </p>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mx: "5%" }}>
                            <p>
                                Anzahl der Befragten:
                            </p>
                            <p>
                                {data.answersSum}
                            </p>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mx: "5%" }}>
                            <p>
                                Art der Befragung:
                            </p>
                            <p >
                                {(data.type === "ipsurveypro") ? "Impression Survey PRO" : "Impression Survey"}
                            </p>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "100%", minHeight: "49%", justifyContent: "space-around" }}>
                    <Box sx={{ width: "49%", display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", alignItems: "center", boxShadow: " 0 3px 10px rgb(0 0 0 / 1)" }}>
                        <p sx={{ textDecoration: "underline" }} >
                            Resultat:
                        </p>
                        <Box >
                            <PieChart data={data.answers} labels={[data.answerA, data.answerB]} />
                        </Box>
                    </Box>
                    <Box sx={{ width: "49%", display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", alignItems: "center", boxShadow: " 0 3px 10px rgb(0 0 0 / 1)" }}>
                        <p sx={{ textDecoration: "underline" }} >
                            Geschlecht:
                        </p>
                        <Box >
                            <PieChart data={data.gendersSum} labels={data.genders} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}