import React, { useEffect, useState } from "react";
import { Box, Button, TextField, CircularProgress } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import swal from "sweetalert";
import { useSelector } from "react-redux";

const Form = () => {
  const user = useSelector((state) => state.auth.user);

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const storeState = useSelector((state) => state);
  useEffect(() => {
    console.log(storeState.auth.user._id);
  }, []);

  const handleFormSubmit = (values, formik) => {
    const { firstName, lastName, username, email, password } = values;
    const adminId = storeState.auth.user._id;
    const formData = {
      firstName,
      lastName,
      username,
      email,
      password,
      adminId,
    };
    console.log(formData);
    if (
      values.firstName &&
      values.lastName &&
      values.email &&
      values.username &&
      values.password
    ) {
      setLoading(true);
      // Perform your form submission logic here
      formik.setSubmitting(false); // Set submitting to false after successful submission
      fetch("/admin/CreateUsers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          const statusCode = response.status;
          console.log(statusCode);
          if (statusCode == 201) {
            // Show success SweetAlert
            swal(
              "User Account Created",
              "The new user account has been created successfully.",
              "success"
            );
            console.log("Created Successfully");
          } else if (statusCode == 409) {
            swal(
              "Username exists",
              "The new user account has not been created successfully.",
              "Fail"
            );
          }
          return response.json();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  const handleFirstNameChange = (event, handleChange) => {
    handleChange(event);
    const { value } = event.target;
    setFirstName(value);
  };

  const handleLastNameChange = (event, handleChange) => {
    handleChange(event);
    const { value } = event.target;
    setLastName(value);
  };
  const handleUsernameChange = (event, handleChange) => {
    handleChange(event);
    const { value } = event.target;
    setUsername(value);
  };

  const handleEmailChange = (event, handleChange) => {
    handleChange(event);
    const { value } = event.target;
    setEmail(value);
  };

  const handlePasswordChange = (event, handleChange) => {
    handleChange(event);
    const { value } = event.target;
    setPassword(value);
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={(event) => handleFirstNameChange(event, handleChange)}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={(event) => handleLastNameChange(event, handleChange)}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={(event) => handleEmailChange(event, handleChange)}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Username"
                onBlur={handleBlur}
                onChange={(event) => handleUsernameChange(event, handleChange)}
                value={username}
                name="username"
                error={!!touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(event) => handlePasswordChange(event, handleChange)}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User Account
              </Button>
            </Box>
            {loading && (
              <Box display="flex" justifyContent="center" my={3}>
                <CircularProgress />
              </Box>
            )}
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  username: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/^(?=.*[0-9])/, "Password must contain at least one number")
    .required(" required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
};

export default Form;
