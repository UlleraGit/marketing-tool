import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import DcQuestion from "../components/DcQuestion";
import ClearIcon from "@mui/icons-material/Clear";
import * as React from "react";
import _ from "lodash";
import { useRouter } from "next/router";

export default function CreateDcSurvey(props) {
    const [questions, setQuestions] = React.useState([{ id: "question-0", key: "question-1" }]);
    const [data, setData] = React.useState([{ id: "question-1", Q: "", A: ["", ""], img: "" }])
    const [title, setTitle] = React.useState("")
    const router = useRouter();
    const handleAddQuestion = () => {
        const newId = _.uniqueId("question-");
        if (questions.length < 9) {
            setQuestions((prevQuestions) => [
                ...prevQuestions,
                { id: newId, key: newId },
            ]);
        }
    };

    const handleDeleteQuestion = (id) => {
        setQuestions((prevQuestions) =>
            prevQuestions.filter((question) => question.id !== id)
        );
        setData((prevData) =>
            prevData.filter((question) => question.id !== id)
        );
    };

    const handleQuestionChange = (id, answers, question, image) => {
        setData((prevData) => {
            const questionIndex = questions.findIndex((question) => question.id === id);
            if (questionIndex !== -1) {
                const updatedData = [...prevData];
                updatedData[questionIndex] = { id: id, Q: question, A: answers, img: image };
                return updatedData;
            } else {
                const newData = { id: id, Q: question, A: answers, img: image };
                return [...prevData, newData];
            }
        });
    };

    const handleUploadFile = (event) => {
        const formData = new FormData();
        formData.append("image", file);
        try {
            const response = fetch("/api/public/imageupload", {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                console.log("File uploaded successfully");
            } else {
                const errorData = response.json();
                console.error(errorData.error);
            }
        } catch (error) {
            console.error("An error occurred while uploading the file:", error);
        }
    };

    const handleSubmit = (uploadData) => {
        const temp = uploadData
        let submitData = temp.map((a, i) => ({ Q: a.Q, A: a.A, img: a.img }))
        let data = { type: "dcsurvey", title: title , questions: submitData }
        sessionStorage.setItem('survey', JSON.stringify(data))
        router.push("/checkout")
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                mx: "10%",
                minHeight: "100vh",
                height: "100%",
                gap: "20px",
                py: "2%",
            }}
        >
            <Typography
                component="h5"
                variant="h5"
                fontSize="30px"
                fontWeight="bold"
            >
                Erstellen wir eine neue Umfrage
            </Typography>
            <TextField onChange={(e) => setTitle(e.target.value)} id="" label="Titel" variant="outlined" sx={{ width: "50%" }} />
            {questions.map((question) => (
                <Box key={question.key} sx={{ display: "flex", flexDirection: "column" }}>
                    <ClearIcon
                        id={question.id}
                        onClick={() => handleDeleteQuestion(question.id)}
                    />
                    <DcQuestion key={question.id} id={question.id} onChange={handleQuestionChange} />
                </Box>
            ))}
            <Box>
                <Typography>Price:</Typography>
                <Typography>{questions.length * 60 + "€"}</Typography>
            </Box>
            {questions.length < 9 && (
                <Button variant="outlined" onClick={handleAddQuestion}>
                    + Frage Hinzufügen
                </Button>
            )}
            <Button onClick={() => handleSubmit(data)} variant="outlined">Einreichen</Button>
        </Box>
    );
}
