import ResultGrid from "../../components/ResultGrid";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import useSWR from 'swr';
import CircularProgress from '@mui/material/CircularProgress';
import FooterAdmin from "../../components/FooterAdmin"
// Helper function to fetch data
export default function results(props) {
    const fetcher = (...args) => fetch(...args, {
        method: "POST",
        body: JSON.stringify({}),
    }).then(res => res.json()).then(newres => newres.map((x, i) => {
        if (x.type === "dcsurvey") {
            return ({ _id: x._id, id: i, type: x.type, status: x.status, title: x.title, numberofasked: x.answers.length, numbertoask: x.numbertoask })
        }
        else {
            let temp = parseInt(x.answers.answers[1].value) + parseInt(x.answers.answers[0].value)
            return ({ _id: x._id, id: i, type: x.type, status: x.status, title: x.title, numberofasked: temp, numbertoask: x.numbertoask })
        }
    }))
    const { data, error, isLoading, isValidating } = useSWR('/api/private/results', fetcher, {
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
        <>
            <Header />
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mx: "10%", minHeight: "100vh", }}>
                <ResultGrid value={data} />
            </Box>
            <FooterAdmin />
        </>
    )
};
