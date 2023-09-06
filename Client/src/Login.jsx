import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "./Header";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        setEmailError(false);
        setPasswordError(false);

        if (email === "") {
            setEmailError(true);
        }
        if (password === "") {
            setPasswordError(true);
        }

        if (email && password) {
            console.log(email, password);
        }
    };

    return (
        <>
            <Header />
            <div
                style={{
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", // Add a box shadow for the card effect
                    borderRadius: "15px", // Add rounded corners
                    width: "60%",
                    margin: "0 auto",
                    padding: "20px",
                    textAlign: "center",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                <h2>Login Form</h2>
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        variant="outlined"
                        color="secondary"
                        type="email"
                        sx={{ mb: 3 }}
                        fullWidth
                        value={email}
                        error={emailError}
                    />
                    <TextField
                        label="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        variant="outlined"
                        color="secondary"
                        type="password"
                        value={password}
                        error={passwordError}
                        fullWidth
                        sx={{ mb: 3 }}
                    />
                    <Button
                        variant="outlined"
                        color="secondary"
                        type="submit"
                        style={{ borderRadius: "5px" }}
                    >
                        Login
                    </Button>
                </form>
                <small>
                    Need an account? <Link to="/register">Register here</Link>
                </small>
            </div>
        </>
    );
};

export default Login;
