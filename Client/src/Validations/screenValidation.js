import * as Yup from "yup";
export const screenValidation = Yup.object({
  screenName: Yup.string().required("Name of screen is required"),
  department: Yup.string().required("Department is required"),
});
