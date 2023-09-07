import React, { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { Link } from "react-router-dom";
import Header from "../Header";
import "./Form.css"

const RegisterForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [password, setPassword] = useState('');
    const [department, setDepartment] = useState('');

    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [dateOfBirthError, setDateOfBirthError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [departmentError, setDepartmentError] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();

        // Reset previous errors
        setFirstNameError(false);
        setLastNameError(false);
        setEmailError(false);
        setDateOfBirthError(false);
        setPasswordError(false);
        setDepartmentError(false);

        // Perform validation and set errors if necessary
        if (firstName === "") {
            setFirstNameError(true);
        }
        if (lastName === "") {
            setLastNameError(true);
        }
        if (email === "") {
            setEmailError(true);
        }
        if (dateOfBirth === "") {
            setDateOfBirthError(true);
        }
        if (password === "") {
            setPasswordError(true);
        }
        if (department === "") {
            setDepartmentError(true);
        }

        // Continue with form submission if no errors
        if (!(firstNameError || lastNameError || emailError || dateOfBirthError || passwordError || departmentError)) {
            console.log(firstName, lastName, email, dateOfBirth, password, department);
        }
    }

    return (
        <>
            <Header />
            <div className='form'
                style={{
                    marginTop: "2em",
                }}
            >
                <h2>Register Form</h2>
                <form onSubmit={handleSubmit} action={<Link to="/login" />}>
                    <Stack spacing={2} direction="row" sx={{ marginBottom: 3 }}>
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="First Name"
                            onChange={e => setFirstName(e.target.value)}
                            value={firstName}
                            fullWidth
                            required
                            error={firstNameError}
                        />
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Last Name"
                            onChange={e => setLastName(e.target.value)}
                            value={lastName}
                            fullWidth
                            required
                            error={lastNameError}
                        />
                    </Stack>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Department"
                        onChange={e => setDepartment(e.target.value)}
                        value={department}
                        fullWidth
                        required
                        sx={{ mb: 3 }}
                        error={departmentError}
                    />
                    <TextField
                        type="email"
                        variant='outlined'
                        color='secondary'
                        label="Email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        fullWidth
                        required
                        sx={{ mb: 3 }}
                        error={emailError}
                    />
                    <TextField
                        type="password"
                        variant='outlined'
                        color='secondary'
                        label="Password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        required
                        fullWidth
                        sx={{ mb: 3 }}
                        error={passwordError}
                    />
                    <TextField
                        type="date"
                        variant='outlined'
                        color='secondary'
                        label="Date of Birth"
                        onChange={e => setDateOfBirth(e.target.value)}
                        value={dateOfBirth}
                        fullWidth
                        required
                        sx={{ mb: 3 }}
                        error={dateOfBirthError}
                    />
                    <Button
                        variant="outlined"
                        color="secondary"
                        type="submit"
                    >
                        Register
                    </Button>
                </form>
                <small>Already have an account? <Link to="/">Login Here</Link></small>
            </div>
        </>
    )
}

export default RegisterForm;
