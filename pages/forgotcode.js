import { useState } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { useRouter } from "next/router";
import { useMediaQuery } from "@mui/material";

export default function VerificationPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const phone = useMediaQuery('(max-width:767px)')
    const tablet = useMediaQuery('(max-width:1024px)')

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            fetch('/api/public/requestmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: email }),
            }).then(response => {
                if (response.ok) {
                    sessionStorage.setItem('currentUser', email);
                    router.push("/resetpassword");
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
    if (tablet) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', gap: "10px" }}>
                <Typography variant="h4" gutterBottom>
                    Passwort zurücksetzen
                </Typography>
                <form style={{ width: '90vw' }}>
                    <TextField
                        label="Email"
                        type="text"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        code beantragen
                    </Button>
                </form>
                {error && <Typography variant="body1" color="error">{error}</Typography>}
            </div>
        );
    } else {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', gap: "10px" }}>
                <Typography variant="h4" gutterBottom>
                    Passwort zurücksetzen
                </Typography>
                <form style={{ width: '20vw' }}>
                    <TextField
                        label="Email"
                        type="text"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        code beantragen
                    </Button>
                </form>
                {error && <Typography variant="body1" color="error">{error}</Typography>}
            </div>
        );
    }
}


