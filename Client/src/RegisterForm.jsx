import React, { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { Link } from "react-router-dom";
import Header from "./Header";
import "./Form.css"
const RegisterForm = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [password, setPassword] = useState('')
    const [department, setDepartment] = useState('')


    function handleSubmit(event) {
        event.preventDefault();
        console.log(firstName, lastName, email, dateOfBirth, password)
    }

    return (
        <>
            <Header />
            <div className='form'
            > <h2>Register Form</h2>
                <form onSubmit={handleSubmit} action={<Link to="/login" />}>
                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="First Name"
                            onChange={e => setFirstName(e.target.value)}
                            value={firstName}
                            fullWidth
                            required
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
                        sx={{ mb: 4 }}
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
                        sx={{ mb: 4 }}
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
                        sx={{ mb: 4 }}
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
                        sx={{ mb: 4 }}
                    />
                    <Button variant="outlined" color="secondary" type="submit">Register</Button>
                </form>
                <small>Already have an account? <Link to="/">Login Here</Link></small>

            </div>
        </>
    )
}

export default RegisterForm;