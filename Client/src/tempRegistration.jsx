import React, { useEffect, useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../Header";
import "./Form.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CircularIndeterminate from "../CircularIndeterminate";

const RegisterForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [department, setDepartment] = useState("");
    const [userName, setUser] = useState("");

    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [dateOfBirthError, setDateOfBirthError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [departmentError, setDepartmentError] = useState(false);
    const [userNameError, setuserNameError] = useState(false);
    const [roleError, setRoleError] = useState(false);
    const [start, setStart] = useState(false);
    const [toastId, setToastId] = useState(null);
    const [registered, setRegister] = useState(false);
    const [role, setRole] = useState('');
    const dimmedFormClass = start ? "dimmed-form" : "";


    const navigate = useNavigate();
    useEffect(() => {

        if (registered && toastId) {
            // Check the status after a delay
            setStart(false);
            setTimeout(() => {
                const isActive = toast.isActive(toastId);
                if (isActive) {
                    toast.done(); // Mark the toast as done

                    navigate("/");

                }
            }, 1000); // Adjust the delay as needed
        }
    }, [start, registered, toastId, navigate]);




    const handleChange = (event) => {
        setRole(event.target.value);
    };
    function handleSubmit(event) {
        event.preventDefault();

        // Reset previous errors
        setFirstNameError(false);
        setLastNameError(false);
        setEmailError(false);
        setDateOfBirthError(false);
        setPasswordError(false);
        setDepartmentError(false);
        setRoleError(false);
        setuserNameError(false);

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

        if (password === "") {
            setPasswordError(true);
        }
        if (department === "") {
            setDepartmentError(true);
        }
        if (userName === "") {
            setuserNameError(true);
        }
        if (role === "") {
            setRoleError(true)
        }

        // Continue with form submission if no errors
        if (
            !(
                firstNameError ||
                lastNameError ||
                emailError ||
                dateOfBirthError ||
                passwordError ||
                departmentError
            )
        ) {
            console.log(firstName, lastName, email, dateOfBirth, password, department);
        }
    }

    const Register = () => {
        if (
            !(
                firstNameError ||
                lastNameError ||
                emailError ||
                dateOfBirthError ||
                passwordError ||
                departmentError
            )
        ) {
            // Create an object with the user's registration data

            const userData = {
                firstname: firstName,
                lastname: lastName,
                department: department,
                email: email,
                username: userName,
                password: password,
                role: role
            };
            console.log(userData)

            // Make a POST request to the registration endpoint with the user's data
            setStart(true)
            Axios.post("http://localhost:3000/register", userData)
                .then((response) => {
                    // Handle the response from the server (e.g., display a success message)


                    const id = toast.success("Registration successful!", response.data);
                    setToastId(id);
                    setRegister(true);
                })
                .catch((error) => {
                    // Handle any errors that may occur during the POST request
                    console.error("Registration failed:", error);
                    setStart(false);
                });
        }
    };

    return (
        <>
            <Header />
            <div
                className={`form ${dimmedFormClass}`}  // Apply dimming class conditionally
                style={{
                    marginTop: "10vh",
                }}
            >
                <h2>Register Form</h2>
                {start && (<CircularIndeterminate color={"red"} info="Registering..." />)}
                <form onSubmit={handleSubmit} action={<Link to="/login" />} style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
                    <Stack spacing={2} direction="row" sx={{ marginBottom: 3 }}>
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="First Name"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            fullWidth
                            required
                            error={firstNameError}
                        />
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Last Name"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            fullWidth
                            required
                            error={lastNameError}
                        />
                    </Stack>
                    <Select

                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        sx={{ mb: 3 }}
                        error={departmentError}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Select an option' }}
                    >
                        <MenuItem value="" disabled >
                            <p style={{ color: "red", margin: "0", padding: "0" }}>Select Department*</p>
                        </MenuItem>
                        <MenuItem value="Computer Science">Computer Science</MenuItem>
                        <MenuItem value="Information Systems">Information Systems</MenuItem>
                        <MenuItem value="Applied and Mathematical Statistics">Applied and Mathematical Statistics </MenuItem>
                        <MenuItem value="Applied Mathematics">Applied Mathematics </MenuItem>
                        <MenuItem value="Law">Law </MenuItem>


                    </Select>
                    <Select
                        value={role}
                        onChange={handleChange}
                        sx={{ mb: 3 }}
                        error={roleError}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Select an option' }}
                    >

                        <MenuItem value="" disabled>
                            <p style={{ color: "red", margin: "0", padding: "0" }}> Select Role*</p>
                        </MenuItem>
                        <MenuItem value="admin">admin</MenuItem>
                        <MenuItem value="user">user</MenuItem>

                    </Select>
                    <TextField
                        type="email"
                        variant="outlined"
                        color="secondary"
                        label="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        fullWidth
                        required
                        sx={{ mb: 3 }}
                        error={emailError}
                    />
                    <TextField
                        type="text"
                        variant="outlined"
                        color="secondary"
                        label="Username"
                        onChange={(e) => setUser(e.target.value)}
                        value={userName}
                        fullWidth
                        required
                        sx={{ mb: 3 }}
                        error={userNameError}
                    />
                    <TextField
                        type="password"
                        variant="outlined"
                        color="secondary"
                        label="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        fullWidth
                        sx={{ mb: 3 }}
                        error={passwordError}
                    />

                    <Button
                        variant="outlined"
                        color="secondary"
                        type="submit"
                        onClick={Register}
                        style={{ width: "20%", marginLeft: "40%" }}
                    >
                        Register
                    </Button>
                    <ToastContainer />
                </form>
                <small>
                    Already have an account? <Link to="/">Login Here</Link>
                </small>
            </div>
        </>
    );
};

export default RegisterForm;
