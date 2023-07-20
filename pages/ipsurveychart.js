import * as React from 'react'
import PieChart from "../components/PieChart"
import BarChart from '../components/BarChart'
import { Box } from '@mui/material'
import Link from 'next/link'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import useSWR from 'swr'

export default function ipSurveyChart(props) {
    return (
        <Box sx={{ width: "100%", height: "100vh" }}>
            <Box sx={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-around", overflow:"hidden" }}>
                <Box sx={{ display: "flex", minHeight: "49%", justifyContent: "space-around", alignContent: "space-around" }}>
                    <Box sx={{ display: "flex", flexDirection:"column", width: "49%", justifyContent: "center", alignItems: "center", boxShadow: " 0 3px 10px rgb(0 0 0 / 1)", }}>
                        <Box sx={{ width: "100%", pl:"30px" }}>
                            <Link href="/results" style={{ color: "#000" }}>
                                <KeyboardBackspaceIcon fontSize='large' />
                            </Link>
                        </Box>
                        <Box sx={{ width: "90%", height: "60%" }}>
                            <BarChart
                                labels={['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']}
                                data={{
                                    label: '# of Votes',
                                    data: [12, 19, 3, 5, 2, 3],
                                }} />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", boxShadow: " 0 3px 10px rgb(0 0 0 / 1)", width: "49%", height: "100%", justifyContent: "space-around", alignContent: "space-around", alignItems: "stretch" }}>
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
                                Erhebungszeitraum
                            </p>
                            <p>
                                2 Tage
                            </p>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mx: "5%" }}>
                            <p>
                                Anzahl der Befragten:
                            </p>
                            <p>
                                91
                            </p>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mx: "5%" }}>
                            <p>
                                Art der Befragung:
                            </p>
                            <p >
                                Instagram Befragung
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
                            <PieChart data={[33, 58]} labels={["JA", "Nein"]} />
                        </Box>
                    </Box>
                    <Box sx={{ width: "49%", display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", alignItems: "center", boxShadow: " 0 3px 10px rgb(0 0 0 / 1)" }}>
                        <p sx={{ textDecoration: "underline" }} >
                            Geschlecht:
                        </p>
                        <Box sx={{}}>
                            <PieChart data={[0, 100]} labels={["Männer", "Frauen"]} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}