import * as React from 'react';
import Box from "@mui/material/Box"
import BarChart from '../../components/BarChart';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Link from 'next/link';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import useSWR from 'swr';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';

export default function dcSurveyChart(props) {
    const router = useRouter()
    const id = router.asPath.split('=')[1];
    const [collapse, setCollapse] = React.useState([]);

    const fetcher = (...args) => fetch(...args, {
        method: "POST",
        body: JSON.stringify({ id: id }),
    }).then(res => res.json())
        .then(r => {
            let temp = r.survey.map(a => ({ ...a, A: [...a.A] }));
            let result = temp.map((a, i) => { return (a.A.fill(0)) })
            let ans = r.answers.map(a => a);
            ans.map((b, i) => {
                b.map((a, f) => {
                    result[f][a]++
                })
            })
            console.log(r.survey.length)
            setCollapse(() => { let t = []; for (let i = 0; i < r.survey.length; i++) { t.push(false) }; return (t) })
            return ({ result, survey: r.survey })
        })
    const { data, error, isLoading, isValidating } = useSWR('/api/private/getdcsurvey', fetcher, {
        revalidateOnFocus: false,
    })

    const handleCollapseClosed = (e) => {
        setCollapse((old) => {
            old[e.target.id] = true;
            return ([...old])
        })
    }
    const handleCollapseOpen = (e) => {
        setCollapse((old) => {
            old[e.target.id] = false;
            return ([...old])
        })
    }

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
        <Box sx={{ display: "flex", minWidth: "100vw", minHeight: "100vh", width: "100%", height: "100%", flexDirection: "column", py: "2%", px: "2%", alignItems: "center", rowGap: "20px" }}>
            <Box sx={{ width: "100%", }}>
                <Link href="/u/results" style={{ color: "#000" }}>
                    <KeyboardBackspaceIcon fontSize='large' />
                </Link>
            </Box>
            {
                collapse.map((answer, index) => {
                    if (answer) {
                        return (
                            <Box sx={{ display: "flex", width: "100%", height: "100%", flexDirection: "column", boxShadow: "0 3px 10px rgb(0 0 0 / 1)", }}>
                                <Box sx={{ display: "flex", justifyContent: "flex-end", justifyItems: "center", alignItems: "center" }}>
                                    <Box id={index} sx={{ display: "flex", justifyItems: "center", alignItems: "center" }} >
                                        <KeyboardArrowDownIcon id={index} fontSize='large' onClick={handleCollapseOpen} />
                                    </Box>
                                </Box>
                                <Box sx={{ display: "flex", minWidth: "100%", minHeight: "100%", flexDirection: "column", alignItems: "center", justifyContent: "center", alignContent: "center" }}>
                                    <Typography>
                                        {data.survey[index].Q}
                                    </Typography>
                                    <Box sx={{ width: "90vw", height: "60vh" }}>
                                        <BarChart
                                            labels={data.survey[index].A}
                                            data={{
                                                label: '# of Votes',
                                                data: data.result[index],
                                            }} />
                                    </Box>
                                </Box>
                            </Box>
                        )
                    } else {
                        return (
                            <Box sx={{ display: "flex", width: "100%", height: "100%", flexDirection: "column", boxShadow: "0 3px 10px rgb(0 0 0 / 1)", }}>
                                <Box sx={{ display: "flex", justifyContent: "flex-end", justifyItems: "center", alignItems: "center" }}>
                                <Typography>
                                        {data.survey[index].Q}
                                    </Typography>
                                    <Box id={index} sx={{ display: "flex", justifyItems: "center", alignItems: "center" }} onClick={handleCollapseClosed}>
                                        <KeyboardArrowRightIcon id={index} fontSize='large' />
                                    </Box>
                                </Box>
                            </Box>
                        )
                    }
                }

                )
            }
        </Box>
    )
}