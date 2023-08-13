import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import * as React from "react";
import _ from "lodash";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import PopupBox from "../components/PopupBox";
import { useMediaQuery } from "@mui/material";
/* eslint-disable */
export default function dcQustion(props) {
    const [answersAmmount, setAnswersAmmount] = React.useState([[], []]);
    const [answers, setAnswers] = React.useState(["", ""]);
    const [question, setQuestion] = React.useState("");
    //const [buttons, setButtons] = React.useState([]);
    const [image, setImage] = React.useState("");
    const phone = useMediaQuery('(max-width:767px)')
    const tablet = useMediaQuery('(max-width:1024px)')

    const handleAnswerChange = (event) => {
        const { id, value } = event.target;
        setAnswers((prevAnswers) => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[id] = value;
            return updatedAnswers;
        })
    }

    const handleAddAnswerAmmount = (event) => {
        if (answersAmmount.length < 8) {
            setAnswersAmmount([...answersAmmount, []]);
            setAnswers([...answers, ""]);
        }
    }

    const handleFilePreview = (event) => {
        const file = event.target.files[0];
        setImage(URL.createObjectURL(event.target.files[0]));
        console.log(URL.createObjectURL(event.target.files[0]))
    };

    React.useEffect(() => {
        props.onChange(props.id, answers, question, image);
    }, [answers, question, image]);

    if (tablet) {
        return (
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px", boxShadow: "0 3px 10px rgb(0 0 0 / 1)", borderRadius: "20px" }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "20px", mx: "5%", my: "2%" }}>
                    <TextField onChange={(event) => { setQuestion(event.target.value); }} label="Question" variant="outlined" />
                    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "21px 5px" }}>
                        {answersAmmount.map((a, i) =>
                            <TextField key={i} id={i} sx={{ width: "49%" }} onChange={(event) => { handleAnswerChange(event); }} label={"Antwortmöglichkeit " + i} variant="outlined" />
                        )}
                    </Box>
                    <Button variant="outlined" onClick={(e) => { handleAddAnswerAmmount(); }}>
                        + Weitere Antwortmöglichkeit Hinzufügen
                    </Button>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", mx: "5%", my: "2%", gap: "10px" }}>
                    <Typography component="h5" variant="h5" fontSize="20px">Vorschau</Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", height: "700px", width: "100%", boxShadow: "0 3px 10px rgb(0 0 0 / 1)", borderRadius: "20px" }}>
                        <Box sx={{ display: "flex", borderRadius: "20px 20px 0 0", backgroundImage: `url('${image}')`, backgroundSize: "100% 100%", minHeight: "40%", height: "40%", justifyContent: "center", alignContent: "center", alignItems: "center", }}>
                            <PopupBox onClick={(e) => { setImage(e) }} />
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", height: "60%", width: "100%", gap: "5px" }}>
                            <Typography sx={{ height: "10%", alignSelf: "center" }}>
                                {question}
                            </Typography>
                            <Box sx={{ display: "flex", flexWrap: "wrap", width: "90%", alignSelf: "center", alignContent: "flex-start", height: "90%", gap: "2.5%" }}>
                                {
                                    answers.map((answer, index) =>
                                        <Button key={index} sx={{ width: "100%", height: "10%", color: "#0000ff", borderColor: "#0000ff", backgroundColor: "#fff", '&:hover': { backgroundColor: "#0000ff", color: "#fff", borderColor: "#0000ff" }, borderRadius: "10px", }} variant="outlined">
                                            {answer}
                                        </Button>
                                    )
                                }
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    } else {
        return (
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px", boxShadow: "0 3px 10px rgb(0 0 0 / 1)", borderRadius: "20px" }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "20px", mx: "5%", my: "2%" }}>
                    <TextField onChange={(event) => { setQuestion(event.target.value); }} label="Question" variant="outlined" />
                    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "21px 5px" }}>
                        {answersAmmount.map((a, i) =>
                            <TextField key={i} id={i} sx={{ width: "49%" }} onChange={(event) => { handleAnswerChange(event); }} label={"Antwortmöglichkeit " + i} variant="outlined" />
                        )}
                    </Box>
                    <Button variant="outlined" onClick={(e) => { handleAddAnswerAmmount(); }}>
                        + Weitere Antwortmöglichkeit Hinzufügen
                    </Button>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", mx: "5%", my: "2%", gap: "10px" }}>
                    <Typography component="h5" variant="h5" fontSize="20px">Vorschau</Typography>
                    <Box sx={{ display: "flex", height: "500px", width: "100%", boxShadow: "0 3px 10px rgb(0 0 0 / 1)", borderRadius: "20px" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", width: "60%", height: "100%", justifyContent: "center", alignItems: "center", gap: "20px" }}>
                            <Typography>
                                {question}
                            </Typography>
                            <Box sx={{ display: "flex", flexWrap: "wrap", width: "600px", justifyContent: "flex-start", alignContent: "flex-start", height: "250px", gap: "4%" }}>
                                {
                                    answers.map((answer, index) =>
                                        <Button key={index} sx={{ width: "99%", height: "12.5%", color: "#0000ff", borderColor: "#0000ff", backgroundColor: "#fff", '&:hover': { backgroundColor: "#0000ff", color: "#fff", borderColor: "#0000ff" }, borderRadius: "10px", }} variant="outlined">
                                            {answer}
                                        </Button>
                                    )
                                }
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", borderRadius: "0 20px 20px 0", backgroundImage: `url('${image}')`, backgroundSize: "100% 100%", minWidth: "40%", widht: "40%", justifyContent: "center", alignContent: "center", alignItems: "center", gap: "10px 20px" }}>

                            <PopupBox onClick={(e) => { setImage(e) }} />

                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    }
}
