import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../Header";
import "./Form.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Axios from "axios";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUserError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [toastId, setToastId] = useState(null); // Store toastId in state

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
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
        try {
            const response = await Axios.post("http://localhost:3000/login", {
                username,
                password,
            });

            if (response.data.success) {
                const id = toast.success("Login Successful");
                setToastId(id); // Store the toastId in state
                setLoginSuccess(true);
            } else {
                toast.error("Incorrect username or password");
            }
        } catch (error) {
            toast.error("Incorrect username or password");
            console.error("Login error:", error);
        }
    };

    useEffect(() => {
        if (loginSuccess && toastId) {
            // Check the status after a delay
            setTimeout(() => {
                const isActive = toast.isActive(toastId);
                if (isActive) {
                    toast.done(); // Mark the toast as done
                    console.log("Done");
                    navigate("/screens");
                }
            }, 1000); // Adjust the delay as needed
        }
    }, [loginSuccess, toastId, navigate]);


    return (
        <>
            <Header />
            <div className="form">
                <h2>Login Form</h2>
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        onChange={(e) => setUsername(e.target.value)}
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
            </div>
        </>
    );
};

export default Login;
