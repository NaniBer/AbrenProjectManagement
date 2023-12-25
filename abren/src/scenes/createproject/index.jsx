import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import Header from '../../components/Header';
import Autocomplete from '@mui/material/Autocomplete';
import { mockDataTeam } from '../../data/mockData';
import Swal from  "sweetalert";


const Form = () => {
  const [selectedUser, setSelectedUser] = useState('');

  const handleFormSubmit = (values, formik) => {
    if (values.projectname && values.description && selectedUser) {
      Swal("Successful!", "You have created a new project!", "success", {
        button: "Yes!",
      });
        formik.setSubmitting(false); // Set submitting to false after successful submission
    }
  };
  


  const handleUserSelect = (event, value) => {
    setSelectedUser(value);
  };

  // const handleCreateProject = (event) => {
  //   event.preventDefault();

   
  // }
  const checkoutSchema = yup.object().shape({
    projectname: yup.string().required('Required'),
    description: yup.string().required('Required'),
  });

  const validate = (values) => {
    const errors = {};

    if (!selectedUser) {
      errors.projectmanager = 'Please select a project manager';
    }

    return errors;
  };

  // Extracting usernames from the mockDataTeam array
  const usernames = mockDataTeam.map((teamMember) => teamMember.username);

  return (
    <Box m="20px">
      <Header title="CREATE PROJECT" subtitle="Create a New Project" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validate={validate}
        validationSchema={checkoutSchema}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))">
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Project Name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.projectname}
                name="projectname"
                error={formik.touched.projectname && !!formik.errors.projectname}
                helperText={formik.touched.projectname && formik.errors.projectname}
                className="form-field"
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.description}
                name="description"
                error={formik.touched.description && !!formik.errors.description}
                helperText={formik.touched.description && formik.errors.description}
                className="form-field"
                sx={{ gridColumn: "span 4" }}
              />
              <Box gridColumn="span 4"> {/* Spanning 4 columns */}
              <Autocomplete
                options={usernames} // Set the dropdown options to the usernames array
                getOptionLabel={(option) => option} // Use the username as the label
                value={selectedUser}
                onChange={handleUserSelect}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Project Manager"
                    error={formik.touched.projectmanager && !!formik.errors.projectmanager}
                    helperText={formik.touched.projectmanager && formik.errors.projectmanager}
                    fullWidth
                    variant="filled"
                  />
                )}
                className="form-field"
                gridColumn="span 4" // Spanning 4 columns
              />
              </Box>
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button 
              type="submit" 
              color="secondary" 
              variant="contained"
              onClick={handleFormSubmit}
              >
              Create New Project
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      {/* {selectedUser && (
        <Box mt="40px">
          <Typography variant="h6">Chosen Project Manager:</Typography>
          <Typography>{selectedUser}</Typography>
        </Box>
      )} */}
    </Box>
  );
};

const initialValues = {
  projectname: '',
  description: '',
  projectmanager: ''
};

export default Form;