import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../Header";
import "./Form.css"
import { useNavigate } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


const Login = () => {
    const [username, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUserError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const navigate = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault();

        setUserError(false);
        setPasswordError(false);

        if (username === "") {
            setEmailError(true);
        }
        if (password === "") {
            setPasswordError(true);
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
                <form autoComplete="off" onSubmit={handleSubmit} >
                    <TextField
                        label="Username"
                        onChange={(e) => setUser(e.target.value)}
                        required
                        variant="outlined"
                        color="secondary"
                        type="text"
                        sx={{ mb: 3 }}
                        fullWidth
                        value={username}
                        error={usernameError}
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

                    <br /> {/* Add a line break to move the button to the next line */}
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
                    Skip Login? < Link to="/screens">Click me</Link>
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
