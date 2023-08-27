/* eslint-disable */
import { useState } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function verificationPage() {
    const router = useRouter()
    const [verificationCode, setVerificationCode] = useState('');
    const [error, setError] = useState('');
    const [success, setSucccess] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        let tempcode = parseInt(verificationCode)
        try {
            fetch('/api/public/verification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: tempcode.toString(), username: currentUser.trim() }),
            }).then((response) => {
                if (response.ok) {
                    // Verification successful
                    setSucccess(true)
                    console.log('Verification successful');
                    router.push("/")
                } else {
                    // Error occurred during verification
                    const data = response.json();
                    setError(data.message);
                }
            })
        } catch (error) {
            // Network or server error occurred
            setError('An error occurred during verification.');
        }
    };

    const getNewCode = (event) => {
        event.preventDefault();
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        try {
            fetch('/api/public/resendverification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: currentUser }),
            })
        } catch (error) {
            // Network or server error occurred
            setError('An error occurred during verification.');
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', gap: "10px" }}>
            <Typography variant="h4" gutterBottom>
                Verification Page
            </Typography>
            <form style={{ width:"20%" }}>
                <TextField
                    label="Verification Code"
                    type="text"
                    value={verificationCode}
                    onChange={(event) => setVerificationCode(event.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                {(success) ? <Typography>Du hast dich erfolgreich verifiziert! Du wirst gleich weitergeleitet!</Typography> : <></>}
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Verify
                    </Button>
                    <Button onClick={getNewCode}>
                        Neuen Code Anfordern.
                    </Button>
                </Box>
                <Link href={"/"} style={{ alignSelf: "start" }}>
                    zurück
                </Link>
            </form>
            {error && <Typography variant="body1" color="error">{error}</Typography>}
        </div>
    );
}
