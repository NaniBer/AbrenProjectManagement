import React, { useState } from "react";
import { Box, Button, TextField} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import swal from "sweetalert";
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const initialValues = {
  username: "",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleFormSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
    setUsername("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    swal("Success!", "You have successfully updated your account.", "success");
  };

  const handleUsernameChange = (event, handleChange) => {
    handleChange(event);
    const { value } = event.target;
    setUsername(value);
  };

  const handleCurrentPasswordChange = (event, handleChange) => {
    handleChange(event);
    const { value } = event.target;
    setCurrentPassword(value);
  };

  const handleNewPasswordChange = (event, handleChange) => {
    handleChange(event);
    const { value } = event.target;
    setNewPassword(value);
  };

  const handleConfirmPasswordChange = (event, handleChange) => {
    handleChange(event);
    const { value } = event.target;
    setConfirmPassword(value);
  };

  // const handleTogglePasswordVisibility = () => {
  //   setShowPassword((prevShowPassword) => !prevShowPassword);
  // };

  const handleReset = () => {
    swal({
      title: "Are you sure?",
      text: "This will reset the form fields to 'admin' for username and password",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((confirmed) => {
      if (confirmed) {
        setUsername("admin");
        setCurrentPassword("admin");
        setNewPassword("");
        setConfirmPassword("");
        swal("Reset!", "The form has been reset.", "success");
      }
    });
  };

  const passwordSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    currentPassword: yup.string().required("Current Password is required"),
    newPassword: yup
      .string()
      .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*]).*$/, "Password must contain at least one number and one special character")
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  return (
    <Box m="20px">
      <Header title="UPDATE ACCOUNT" subtitle="Update Your Account" />

      <Box display="flex" justifyContent="flex-end" marginBottom="20px">
        <Button color="warning" variant="contained" onClick={handleReset}>
          Reset
        </Button>
      </Box>

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={passwordSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 4",
                },
              }}
            >
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
                sx={{
                  gridColumn: "span 4",
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#868dfb',
                  },
                }}
                InputLabelProps={{
                  sx: {
                    '&.Mui-focused': {
                      color: '#868dfb',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Current Password"
                onBlur={handleBlur}
                onChange={(event) => handleCurrentPasswordChange(event, handleChange)}
                value={currentPassword}
                name="currentPassword"
                error={!!touched.currentPassword && !!errors.currentPassword}
                helperText={touched.currentPassword && errors.currentPassword}
                sx={{
                  gridColumn: "span 4",
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#868dfb',
                  },
                }}
                InputLabelProps={{
                  sx: {
                    '&.Mui-focused': {
                      color: '#868dfb',
                    },
                  },
                }}
              //   InputProps={{
              //     endAdornment: (
              //       <InputAdornment position="end">
              //         <IconButton
              //           onClick={handleTogglePasswordVisibility}
              //           edge="end"
              //           color="success" // Change color to green
              //         >
              //           {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              //         </IconButton>
              //       </InputAdornment>
              //     ),
              //   }}
               />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="New Password"
                onBlur={handleBlur}
                onChange={(event) => handleNewPasswordChange(event, handleChange)}
                value={newPassword}
                name="newPassword"
                error={!!touched.newPassword && !!errors.newPassword}
                helperText={touched.newPassword && errors.newPassword}
                sx={{
                  gridColumn: "span 4",
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#868dfb',
                  },
                }}
                InputLabelProps={{
                  sx: {
                    '&.Mui-focused': {
                      color: '#868dfb',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Confirm Password"
                onBlur={handleBlur}
                onChange={(event) => handleConfirmPasswordChange(event, handleChange)}
                value={confirmPassword}
                name="confirmPassword"
                error={!!touched.confirmPassword && !!errors.confirmPassword}
                helperText={touched.confirmPassword && errors.confirmPassword}
                sx={{
                  gridColumn: "span 4",
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#868dfb',
                  },
                }}
                InputLabelProps={{
                  sx: {
                    '&.Mui-focused': {
                      color: '#868dfb',
                    },
                  },
                }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Save Changes
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Form;
