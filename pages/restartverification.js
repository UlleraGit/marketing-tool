/* eslint-disable */
import { useState } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function verificationPage() {
    const router = useRouter()
    const [verificationCode, setVerificationCode] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [codeRequested, setCodeRequested] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        let tempcode = parseInt(verificationCode)
        console.log(tempcode)
        try {
            fetch('/api/public/verification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: tempcode.toString(), username: email.trim() }),
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

    const getNewCode = (event) => {
        event.preventDefault();
        try {
            fetch('/api/public/resendverification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: email }),
            }).then((response) => {
                if (response.ok) {
                    setCodeRequested(true)
                    console.log('Verification successful');
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
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', gap: "10px" }}>

            <Typography variant="h4" gutterBottom>
                Verification Page
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: '400px', display:"flex", flexDirection:"column" }}>
                {
                    (codeRequested) ?
                        (
                            <>
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
                            </>
                        )
                        :
                        (
                            <>
                                <TextField
                                    label="Email"
                                    type="text"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    fullWidth
                                    margin="normal"
                                    required
                                />
                                <Button variant="contained" onClick={getNewCode}>
                                    Neuen Code Anfordern.
                                </Button>
                            </>
                        )
                }
                <Link href={"/"}>
                    zurück
                </Link>
            </form>
            {error && <Typography variant="body1" color="error">{error}</Typography>}
        </div>
    );
}
