import * as Yup from "yup";

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

export const screenValidation = Yup.object({
  screenName: Yup.string().required("Name of screen is required"),
  department: Yup.string().required("Department is required"),
});

export const contentValidation = Yup.object({
  slideTitle: Yup.string().required("Slide title is required"),
  post: Yup.string().required("Post is required"),
});
