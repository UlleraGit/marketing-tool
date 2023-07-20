import Box from "@mui/material/Box"
import * as React from "react"
import { Button, FormControl, RadioGroup, FormControlLabel, FormLabel, Radio, Typography } from "@mui/material"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
export default function surveyForm(props) {
    const prevId = Number(props.id) - 1
    const nextId = Number(props.id) + 1
    const [selectedAnswer, setSelectedAnswer] = React.useState();
    const [buttons, setButtons] = React.useState();
    const handleChange = (event) => {
        setSelectedAnswer(event.target.attributes["value"].value)
        sessionStorage.setItem('answer-' + props.id, event.target.attributes["value"].value)
    };

    React.useEffect(() => {
        sessionStorage.clear();
    }, [])
    
    React.useEffect(() => {
        setButtons(props.questions.answers.map((answer, index) =>
            (selectedAnswer == index) ?
                <Button sx={{ width: "99%", height: "20%", color: "#fff", borderColor: "#0000ff", backgroundColor: "#0000ff", '&:hover': { backgroundColor: "#0000ff", color: "#fff", borderColor: "#0000ff" }, borderRadius: "10px", }} href={"#question-" + nextId} key={index} variant="outlined" value={index} onClick={(e) => handleChange(e)}>
                    {answer}
                </Button>
                :
                <Button sx={{ width: "99%", height: "20%", color: "#0000ff", borderColor: "#0000ff", backgroundColor: "#fff", '&:hover': { backgroundColor: "#0000ff", color: "#fff", borderColor: "#0000ff" }, borderRadius: "10px", }} href={"#question-" + nextId} key={index} variant="outlined" value={index} onClick={(e) => handleChange(e)}>
                    {answer}
                </Button>
        ))
    }, [selectedAnswer]);

    return (
        <Box id={"question-" + props.id} sx={{ display: "flex", minWidth: "90vw", height: "100vh", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ display: "flex", minWidth: "90vw", width: "90vw", height: "90vh",  boxShadow:" 0 3px 10px rgb(0 0 0 / 1)", borderRadius: "20px" }}>
                <Box sx={{ display: "flex", flexDirection: "column", width: "60%", height: "100%", justifyContent: "center", alignItems: "center", gap: "20px" }}>
                    <Typography component="h5" variant="h5" fontSize="40px" fontWeight="bold" >{props.id + ". " + props.questions.question}</Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", width: "600px", justifyContent: "flex-start", alignContent: "flex-start", height: "250px", gap: "4%", }}>
                        {buttons}
                    </Box>
                </Box>
                <Box sx={{
                    display: "flex", borderRadius:"0 20px 20px 0", minWidth: "40%", widht: "40%", backgroundImage: `url(${props.img})`, backgroundSize: "100% 100%", justifyContent: "flex-end", alignContent: "flex-end", alignItems: "flex-end", gap: "10px 20px"
                }}>
                    {
                        (props.id == 1) ?
                            <Box sx={{ width: "129px", height: "40px", backgroundColor: "#0000ff", borderRadius: '10px', marginRight: "30px", marginBottom: "3px" }}>
                                <Button href={"#question-" + nextId} sx={{ color: '#fff', height: '100%', width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <ArrowDropDownIcon />
                                </Button>
                            </Box>
                            :
                            <Box sx={{ display: "flex", width: "129px", height: "40px", backgroundColor: "#0000ff", borderRadius: '10px', marginRight: "30px", marginBottom: "3px" }}>
                                <Button href={"#question-" + prevId} sx={{ color: '#fff', height: '100%', width: "49%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <ArrowDropUpIcon />
                                </Button>
                                <Box sx={{ backgroundColor: "#fff", width: "1%", height: "100%" }} >
                                </Box>
                                <Button href={"#question-" + nextId} sx={{ color: '#fff', height: '100%', width: "49%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <ArrowDropDownIcon />
                                </Button>
                            </Box>
                    }
                </Box>
            </Box>
        </Box>
    )
}