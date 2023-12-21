import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { response } from "../../../../Backend/app";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const handleFirstNameChange = (event, handleChange, values) => {
    handleChange(event);
    const { value } = event.target;
    const { lastName } = values;
    setFirstName(value);
    const generatedUsername = `${value.toLowerCase()}${lastName.toLowerCase()}.kaizen`;
    setUsername(generatedUsername);
  };

  const handleLastNameChange = (event, handleChange, values) => {
    handleChange(event);
    const { value } = event.target;
    const { firstName } = values;
    setLastName(value);
    const generatedUsername = `${firstName.toLowerCase()}${value.toLowerCase()}.kaizen`;
    setUsername(generatedUsername);
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

  const handleCreateUser = (event) => {
    event.preventDefault();
    const formData = { firstName, lastName, username, email, password };
    // fetch("/admin/CreateUsers", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // })
    //   .then((response) => response.json())
    //   .then(console.log("Account created successfully"));
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
                onChange={(event) =>
                  handleFirstNameChange(event, handleChange, values)
                }
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
                onChange={(event) =>
                  handleLastNameChange(event, handleChange, values)
                }
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
                onChange={(event) => setUsername(event.target.value)}
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
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                onClick={handleCreateUser}
              >
                Create New User Account
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  CreatedBy: yup.string().required("required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  password: "",
  CreatedBy: "",
};

export default Form;
