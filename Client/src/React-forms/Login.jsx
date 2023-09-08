import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../Header";
import "./Form.css"
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const navigate = useNavigate();

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
    const CarouselRoute = () => {
        navigate('/carousel');


    }

    return (
        <>
            <Header />
            <div className="form"


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
                    Skip Login? < Link to="/dashboard">Click me</Link>
                </small>

                <Button
                    onClick={CarouselRoute}

                >
                    Carousel Sample
                </Button>
            </div>
        </>
    );
};

export default Login;
