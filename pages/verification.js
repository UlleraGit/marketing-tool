/* eslint-disable */ 
import { useState } from 'react';
import { Typography, TextField, Button } from '@mui/material';

export default function verificationPage() {
    const [verificationCode, setVerificationCode] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        try {
            const response = await fetch('/api/public/verification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: verificationCode, username: currentUser.username }),
            });

            if (response.ok) {
                // Verification successful
                console.log('Verification successful');
                window.location.href = '/'
            } else {
                // Error occurred during verification
                const data = await response.json();
                setError(data.message);
            }
        } catch (error) {
            // Network or server error occurred
            setError('An error occurred during verification.');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', gap: "10px" }}>
            <Typography variant="h4" gutterBottom>
                Verification Page
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: '400px' }}>
                <TextField
                    label="Verification Code"
                    type="text"
                    value={verificationCode}
                    onChange={(event) => setVerificationCode(event.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <Button type="submit" variant="contained" color="primary">
                    Verify
                </Button>
            </form>
            {error && <Typography variant="body1" color="error">{error}</Typography>}
        </div>
    );
}
