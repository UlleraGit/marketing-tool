import * as React from "react"
import FileUploadIcon from "@mui/icons-material"
import { Box } from "@mui/material";

export default function UploadButton(props) {
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState(null);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('/api/public/imageupload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                // File uploaded successfully
                const data = await response.json();
                setImageUrl(data.imageUrl);
            } else {
                // Handle upload error
                const errorData = await response.json();
                console.error(errorData.error);
            }
        } catch (error) {
            // Handle network error
            console.error('An error occurred while uploading the file:', error);
        }
    };
    return (
        <Box>
            <label htmlFor="upload-input">
                <FileUploadIcon />
            </label>
            <input id="upload-input" type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileUpload} />
        </Box>
    )
}