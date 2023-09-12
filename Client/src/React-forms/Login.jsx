import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../Header";
import "./Form.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Axios from "axios";

const Login = () => {
    const [username, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUserError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState("");
    const [loginError, setLoginError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        setUserError(false);
        setPasswordError(false);

        if (username === "") {
            setUserError(true);
            return;
        } else if (password === "") {
            setPasswordError(true);
            return;
        }

        Axios.post(`http://localhost:3000/login`, { username, password }).then(
            (res) => {
                if (res.data.error) {
                    setLoginError("Incorrect pawword or username!");
                    toast.error("Incorrect pawword or username!")
                    setLoginSuccess("");
                } else {
                    localStorage.setItem("token", res.data.token);
                    setLoginSuccess("You are Logged in");
                    setLoginError("");
                    toast.success("You are Logged in");
                    navigate("/screens");
                }
            }
        );
    };

    const CarouselRoute = () => {
        navigate("/carousel");
    };

    return (
        <>
            <Header />
            <div className="form">
                <h2>Login Form</h2>
                {loginSuccess && <div className="success">{loginSuccess}</div>}
                {loginError && <div className="error">{loginError}</div>}
                <form autoComplete="off" onSubmit={handleSubmit}>
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

                    <br />
                    <Button
                        variant="outlined"
                        color="secondary"
                        type="submit"
                        style={{ borderRadius: "5px" }}
                    >
                        Login
                    </Button>
                </form>
                <ToastContainer />
                <small>
                    Need an account? <Link to="/register">Register here</Link>
                    Skip Login? <Link to="/screens">Click me</Link>
                </small>

                <Button onClick={CarouselRoute}>Carousel Sample</Button>
            </div>
        </>
    );
};

export default Login;
