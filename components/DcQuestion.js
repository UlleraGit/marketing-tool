import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import * as React from "react";
import _ from "lodash";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import PopupBox from "../components/PopupBox";

export default function dcQustion(props) {
    const [answersAmmount, setAnswersAmmount] = React.useState([
        <TextField key={0} id="0" sx={{ width: "49%" }} onChange={(event) => { handleAnswerChange(event);  }} label={"Antwortmöglichkeit " + 1} variant="outlined" />,
        <TextField key={1} id="1" sx={{ width: "49%" }} onChange={(event) => { handleAnswerChange(event); }} label={"Antwortmöglichkeit " + 2} variant="outlined" />
    ]);
    const [answers, setAnswers] = React.useState(["", ""]);
    const [question, setQuestion] = React.useState("");
    const [buttons, setButtons] = React.useState([]);
    const [image, setImage] = React.useState("");

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
            const newAnswerId = answersAmmount.length.toString();
            setAnswersAmmount([...answersAmmount, <TextField key={newAnswerId} id={newAnswerId} sx={{ width: "49%" }} onChange={(event) => { handleAnswerChange(event) }} label={"Antwortmöglichkeit " + (answersAmmount.length + 1)} variant="outlined" />]);
            setAnswers([...answers, ""]);
        }
    }

    const handleFilePreview = (event) => {
        const file = event.target.files[0];
        setImage(URL.createObjectURL(event.target.files[0]));
        console.log(URL.createObjectURL(event.target.files[0]))
    };

    React.useEffect(() => {
        setButtons(answers.map((answer, index) =>
            <Button key={index} sx={{ width: "99%", height: "12.5%", color: "#0000ff", borderColor: "#0000ff", backgroundColor: "#fff", '&:hover': { backgroundColor: "#0000ff", color: "#fff", borderColor: "#0000ff" }, borderRadius: "10px", }} variant="outlined">
                {answer}
            </Button>
        ));
    }, [answers]);

    React.useEffect(() => {
        props.onChange(props.id, answers, question, image);
    }, [answers, question, image]);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px", boxShadow: "0 3px 10px rgb(0 0 0 / 1)", borderRadius: "20px" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px", mx: "5%", my: "2%" }}>
                <TextField onChange={(event) => { setQuestion(event.target.value); }} label="Question" variant="outlined" />
                <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "21px 5px" }}>
                    {answersAmmount}
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
                            {buttons}
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", borderRadius: "0 20px 20px 0", backgroundImage: `url('${image}')`, backgroundSize: "100% 100%", minWidth: "40%", widht: "40%", justifyContent: "center", alignContent: "center", alignItems: "center", gap: "10px 20px" }}>
                        <Box sx={{ display: "flex", width: "50px", height: "50px", backgroundColor: "#0000ff", borderRadius: '10px',justifyContent:"center"}}>
                            <PopupBox onClick={(e) => { setImage(e) }} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
