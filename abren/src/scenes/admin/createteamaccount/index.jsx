import React, { useEffect, useState } from "react";
import { Box, Button, TextField, CircularProgress } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [loading, setLoading] = useState(false);
  const [, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleFormSubmit = async (values, formik) => {
    const { firstName, lastName, username, email, password } = values;
    console.log(firstName, lastName, username, email, password);
    const adminId = user._id;
    const formData = {
      firstName,
      lastName,
      username,
      email,
      password,
      adminId,
    };

    if (
      values.firstName &&
      values.lastName &&
      values.email &&
      values.username &&
      values.password
    ) {
      swal({
        title: "Loading...",
        text: "User is being created",
        buttons: false,
        closeOnClickOutside: false,
        closeOnEsc: false,
        icon: "info",
      });

      formik.resetForm();

      try {
        const response = await fetch("/admin/CreateUsers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const statusCode = response.status;
        console.log(statusCode);

        if (statusCode === 201) {
          // Show success SweetAlert
          swal(
            "User Account Created",
            "The new user account has been created successfully.",
            "success"
          );
          console.log("Created Successfully");
          navigate("/admin/viewuser");
        } else if (statusCode === 409) {
          // Show error SweetAlert
          swal(
            "Username exists",
            "The new user account has not been created successfully.",
            "error"
          );
        }

        // Close loading SweetAlert
        swal.close();
      } catch (error) {
        console.error("Error:", error);
        // Close loading SweetAlert on error
        swal.close();
      }
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
                sx={{
                  gridColumn: "span 2",
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#868dfb",
                    },
                }}
                InputLabelProps={{
                  sx: {
                    "&.Mui-focused": {
                      color: "#868dfb",
                    },
                  },
                }}
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
                sx={{
                  gridColumn: "span 2",
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#868dfb",
                    },
                }}
                InputLabelProps={{
                  sx: {
                    "&.Mui-focused": {
                      color: "#868dfb",
                    },
                  },
                }}
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
                sx={{
                  gridColumn: "span 4",
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#868dfb",
                    },
                }}
                InputLabelProps={{
                  sx: {
                    "&.Mui-focused": {
                      color: "#868dfb",
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Username"
                onBlur={handleBlur}
                onChange={(event) => handleUsernameChange(event, handleChange)}
                value={values.username}
                name="username"
                error={!!touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                sx={{
                  gridColumn: "span 4",
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#868dfb",
                    },
                }}
                InputLabelProps={{
                  sx: {
                    "&.Mui-focused": {
                      color: "#868dfb",
                    },
                  },
                }}
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
                sx={{
                  gridColumn: "span 4",
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: validationErrors.taskList
                        ? "red"
                        : "#868dfb",
                    },
                }}
                InputLabelProps={{
                  sx: {
                    "&.Mui-focused": {
                      color: validationErrors.taskList ? "red" : "#868dfb",
                    },
                  },
                }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                onClick={handleFormSubmit}
              >
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
  email: yup
    .string()
    .email("Invalid email")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email must be in a valid format"
    )
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Password must contain at least one number and one special character"
    )
    .required("Password is required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
};

export default Form;
