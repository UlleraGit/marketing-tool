/* eslint-disable */ 
import * as React from 'react';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';

const ThankYouPage = () => {
    const router = useRouter();
    React.useEffect(() => {
        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );
        const paymentIntent = new URLSearchParams(window.location.search).get(
            "payment_intent"
        );
        if (!clientSecret) {
            return;
        }
        if (!paymentIntent) {
            return;
        }
        let data = sessionStorage.getItem('survey');
        data = JSON.parse(data)
        try {
            if (data.type === "dcsurvey") {
                fetch("/api/private/createdcsurvey", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        clientSecret,
                        paymentIntent,
                        data
                    }),
                })
                    .then(response => {
                        if (response.ok) {
                            console.log("Survey data submitted successfully");
                            sessionStorage.removeItem('survey');
                            router.push('/u/dashboard')
                        } else {
                            return response.json().then(errorData => {
                                throw new Error(errorData.error);
                            });
                        }
                    })
                    .catch(error => {
                        console.error("An error occurred while submitting the survey data:", error);
                    });
            }
            else if(data.type === "ipsurvey"){
                fetch("/api/private/createipsurvey", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        clientSecret,
                        paymentIntent,
                        ...data
                    }),
                })
                    .then(response => {
                        if (response.ok) {
                            console.log("Survey data submitted successfully");
                            sessionStorage.removeItem('survey');
                            router.push('/u/dashboard')
                        } else {
                            return response.json().then(errorData => {
                                throw new Error(errorData.error);
                            });
                        }
                    })
                    .catch(error => {
                        console.error("An error occurred while submitting the survey data:", error);
                    });
            }
        } catch (error) {
            console.error("An error occurred while submitting the survey data:", error);
        }
    }, []);
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundColor: (theme) => theme.palette.background.default,
            }}
        >
            <CheckCircleIcon
                sx={{
                    fontSize: 80,
                    color: (theme) => theme.palette.success.main,
                    marginBottom: (theme) => theme.spacing(2),
                }}
            />
            <Typography
                variant="h5"
                component="h1"
                sx={{
                    marginBottom: (theme) => theme.spacing(2),
                }}
            >
                Thank You!
            </Typography>
            <Typography variant="body1" component="p">
                Your payment was successful.
            </Typography>
            <Typography variant="body1" component="p">
                Bitte das Fenster nicht schließen. Du wirst gleich weitergeleitet.
            </Typography>
        </Box>
    );
};

export default ThankYouPage;
