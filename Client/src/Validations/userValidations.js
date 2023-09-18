import * as Yup from "yup";

export const userSchema = Yup.object().shape({
  firstname: Yup.string().trim().required(),
  lastname: Yup.string().trim().required(),
  department: Yup.string().trim().required(),
  email: Yup.string().email().trim().required(),
  username: Yup.string().min(4).trim().required(),
  password: Yup.string().min(4).trim().required(),
  role: Yup.string().trim().required,
});

export const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export const registrationValidation = Yup.object({
  firstname: Yup.string().required("First Name is required"),
  lastname: Yup.string().required("Last Name is required"),
  department: Yup.string().required("Department is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  role: Yup.string().required("Role is required"),
});
