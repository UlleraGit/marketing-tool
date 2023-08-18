/* eslint-disable */
import React, { useState } from 'react';
import { Button, Autocomplete, FormControl, FormControlLabel, Checkbox, InputLabel, MenuItem, Select, TextField, Typography, Box } from '@mui/material';
import berufe from '../util/berufe'
import universities from '../util/universities';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function RegisterPage() {
    const router = useRouter()
    var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '-')
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState(utc);
    const [selectedBeruf, setSelectedBeruf] = React.useState('');
    const [selectedUniversity, setSelectedUniversity] = React.useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [ageError, setAgeError] = useState('');
    const [isAccepted, setIsAccepted] = useState(false);
    const [checkboxError, setCheckboxError] = useState('')
    const [plz, setPlz] = useState('')
    const [place, setPlace] = useState('')

    const handleCheckboxChange = (event) => {
        setIsAccepted(event.target.checked);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const today = new Date();
        const selectedDate = new Date(birthday);
        const age = today.getFullYear() - selectedDate.getFullYear();

        // Check if age is less than 16
        if (age < 16) {
            setAgeError('Du must mindestens 16 Jahre alt sein um dich registrien zu können.');
            return;
        }
        if (!isAccepted) {
            setCheckboxError('Du must die AGBs akzeptieren!')
            return;
        }
        const formData = {
            firstName,
            lastName,
            birthday,
            password,
            email,
            address,
            selectedBeruf,
            selectedUniversity,
            plz,
            place
        };
        // Password validation
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password);
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);

        if (!hasNumber || !hasSpecialChar || !hasUppercase || !hasLowercase) {
            setPasswordError('Password must contain at least 1 number, 1 special character, 1 uppercase letter, and 1 lowercase letter.');
            return;
        }

        fetch('api/public/register', {
            method: 'POST',
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Form submitted successfully');
                sessionStorage.setItem('currentUser', JSON.stringify(data.user));
                router.push("/verification")
            })
            .catch((error) => {
                console.error('Error submitting form:', error);
            });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <form onSubmit={handleSubmit} style={{ width: '400px' }}>
                <Link href={"/"}>
                    zurück
                </Link>
                <Typography variant="h5" gutterBottom>
                    Register
                </Typography>

                <TextField
                    label="First Name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />

                <TextField
                    label="Last Name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />

                <TextField
                    label="Birthday"
                    type="date"
                    value={birthday}
                    onChange={(event) => { setBirthday(event.target.value.toString()) }}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                {ageError && <Typography color="error">{ageError}</Typography>}

                <Autocomplete
                    options={berufe}
                    getOptionLabel={(option) => option.name}
                    //value={selectedBeruf}
                    onChange={(event, newValue) => {
                        setSelectedBeruf(event.target.textContent);
                    }}
                    renderInput={(params) => <TextField {...params} label="Beruf" />}
                    required
                />

                {selectedBeruf == "Student" ? (
                    <FormControl fullWidth margin="normal">
                        <Autocomplete
                            options={universities}
                            getOptionLabel={(option) => option.name}
                            //value={selectedBeruf}
                            onChange={(event, newValue) => {
                                setSelectedUniversity(event.target.textContent);
                            }}
                            renderInput={(params) => <TextField {...params} label="Universitäten" />}
                        />
                    </FormControl>
                ) : ''}

                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                {passwordError && <p className="error-message">{passwordError}</p>}

                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />

                <TextField
                    label="Straße"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    fullWidth
                    margin="normal"
                    multiline
                    required
                />
                <TextField
                    label="PLZ"
                    value={plz}
                    onChange={(event) => setPlz(event.target.value)}
                    fullWidth
                    margin="normal"
                    multiline
                    required
                />
                <TextField
                    label="Ort"
                    value={place}
                    onChange={(event) => setPlace(event.target.value)}
                    fullWidth
                    margin="normal"
                    multiline
                    required
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isAccepted}
                            onChange={handleCheckboxChange}
                            name="acceptTerms"
                            color="primary"
                        />
                    }
                    label="Ich bin mit den AGBs einverstanden."
                />
                {checkboxError && <Typography color="error">{checkboxError}</Typography>}
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Button type="submit" variant="contained" color="primary">
                        Register
                    </Button>
                    <Link href={"/restartverification"}>
                        Du hast bereits ein verifizierungscode? Hier fortsetzen...
                    </Link>
                </Box>
            </form>
        </div>
    );
};
