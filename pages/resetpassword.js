/* eslint-disable */
import { useState } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useMediaQuery } from "@mui/material";

export default function verificationPage() {
    const router = useRouter()
    const [verificationCode, setVerificationCode] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const phone = useMediaQuery('(max-width:767px)')
    const tablet = useMediaQuery('(max-width:1024px)')

    const handleSubmit = (event) => {
        event.preventDefault();
        const currentUser = sessionStorage.getItem('currentUser');

        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password);
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);

        if (!hasNumber || !hasSpecialChar || !hasUppercase || !hasLowercase) {
            setPasswordError('Password must contain at least 1 number, 1 special character, 1 uppercase letter, and 1 lowercase letter.');
            return;
        }

        try {
            fetch('/api/public/setpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: verificationCode.trim(), username: currentUser.trim(), password: password.trim() }),
            }).then((response) => {
                if (response.ok) {
                    // Verification successful
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

    if (tablet) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', gap: "10px" }}>
                <Typography variant="h4" gutterBottom>
                    Verification Page
                </Typography>
                <form style={{ width: '90vw' }}>
                    <TextField
                        label="Erhaltenen Code hier eingeben!"
                        type="text"
                        value={verificationCode}
                        onChange={(event) => setVerificationCode(event.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Neues Passwort hier angeben"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Verify
                    </Button>
                </form>
                {error && <Typography variant="body1" color="error">{error}</Typography>}
            </div>
        )
    } else {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', gap: "10px" }}>
                <Typography variant="h4" gutterBottom>
                    Verification Page
                </Typography>
                <form style={{ width: '20vw' }}>
                    <TextField
                        label="Erhaltenen Code hier eingeben!"
                        type="text"
                        value={verificationCode}
                        onChange={(event) => setVerificationCode(event.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Neues Passwort hier angeben"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Verify
                    </Button>
                </form>
                {error && <Typography variant="body1" color="error">{error}</Typography>}
            </div>
        );
    }
}
