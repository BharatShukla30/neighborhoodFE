import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Alert, AlertTitle, FormControl, FormHelperText, FormLabel, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select } from '@mui/material';
import { registerUser } from './actions';
import { useDispatch, useSelector } from 'react-redux';
import Copyright from '../UIUtils/Copyright';
import { getCurrentYYYYMMDD, getLocation } from '../../services/common';
import { AccountCircle } from '@mui/icons-material';

const theme = createTheme();

const signUpSelector = (state) => state.signUpReducer;

export default function SignUpPage() {

  const dispatch = useDispatch();

  const signUpReducerState = useSelector(signUpSelector);

  const [userCoordinates, setUserCoordinates] = useState();

  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    username: '',
    location: '',
    password: '',
    dateOfBirth: getCurrentYYYYMMDD()
  });

  useEffect(() => {
    getLocation(setUserCoordinates);
  }, [])

  console.log("Latitude is :", userCoordinates?.latitude);
  console.log("Longitude is :", userCoordinates?.longitude);

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestBody = {
      name: formData.fullName,
      email: formData.email,
      username: formData.username,
      dob: formData.dateOfBirth,
      location: formData.address,
      password: formData.password
    };

    console.log(requestBody);
    dispatch(registerUser(requestBody));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {
            signUpReducerState?.success && <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              Your registration has been completed successfully. <a className='custom-link-style' href='/signin'>Please Sign In to continue.</a>
            </Alert>
          }
          {
            signUpReducerState?.error && <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Your registration could not be completed. <strong>{signUpReducerState?.payload}</strong>
            </Alert>
          }
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="fullName"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  value={formData.fullName}
                  onChange={(event) => {
                    setFormData((formData) => {
                      return {
                        ...formData,
                        fullName: event.target.value
                      }
                    })
                  }}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type="email"
                  value={formData.email}
                  onChange={(event) => {
                    setFormData((formData) => {
                      return {
                        ...formData,
                        email: event.target.value
                      }
                    })
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={(event) => {
                    setFormData((formData) => {
                      return {
                        ...formData,
                        password: event.target.value
                      }
                    })
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="username"
                  label="Username"
                  id="username"
                  autoComplete="username"
                  value={formData.username}
                  onChange={(event) => {
                    setFormData((formData) => {
                      return {
                        ...formData,
                        username: event.target.value
                      }
                    })
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type='date'
                  required
                  fullWidth
                  name="dateOfBirth"
                  label="Date Of Birth"
                  id="dateOfBirth"
                  autoComplete="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={(event) => {
                    setFormData((formData) => {
                      return {
                        ...formData,
                        dateOfBirth: event.target.value
                      }
                    })
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I agree to the Terms & Conditions"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              disabled={!userCoordinates}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            {!userCoordinates && <Alert severity="warning">Geolocation must be enabled in browser to proceed</Alert>}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signin" className='custom-link-style' variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}