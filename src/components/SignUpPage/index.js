import * as React from 'react';
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
import { Alert, AlertTitle, FormControl, FormHelperText, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from '@mui/material';
import { registerUser } from './actions';
import { GlobalContext } from '../../App';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// Type of User - Individual/Organization
// Blood Group
// Address

const theme = createTheme();

export default function SignUpPage() {
  const { globalState, setGlobalState } = React.useContext(GlobalContext);

  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    blood_group: '',
    user_type: 'individual',
    address: '',
    password: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestBody = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      blood_group: formData.blood_group,
      user_type: formData.user_type,
      location: formData.address,
      password: formData.password
    };

    console.log(requestBody);
    registerUser(requestBody, setGlobalState);
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
            globalState?.registrationResult?.success && <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              Your registration has been completed successfully. <a className='custom-link-style' href='/signin'>Please Sign In to continue.</a>
            </Alert>
          }
          {
            globalState?.registrationResult?.error && <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Your registration could not be completed. <strong>{globalState?.registrationResult?.message}</strong>
            </Alert>
          }
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={formData.firstName}
                  onChange={(event) => {
                    setFormData((formData) => {
                      return {
                        ...formData,
                        firstName: event.target.value
                      }
                    })
                  }}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={(event) => {
                    setFormData((formData) => {
                      return {
                        ...formData,
                        lastName: event.target.value
                      }
                    })
                  }}
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
                  name="address"
                  label="Address"
                  id="address"
                  autoComplete="address"
                  value={formData.address}
                  onChange={(event) => {
                    setFormData((formData) => {
                      return {
                        ...formData,
                        address: event.target.value
                      }
                    })
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl required>
                  <FormLabel id="demo-row-radio-buttons-group-label">Type</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={formData.user_type}
                    onChange={(event) => {
                      setFormData((formData) => {
                        return {
                          ...formData,
                          user_type: event.target.value
                        }
                      })
                    }}
                  >
                    <FormControlLabel value="individual" control={<Radio />} label="Individual" />
                    <FormControlLabel value="organization" control={<Radio />} label="Organization" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <InputLabel>Blood Group *</InputLabel>
                <FormControl fullWidth>
                  <Select
                    value={formData.blood_group}
                    onChange={(event) => {
                      setFormData((formData) => {
                        return {
                          ...formData,
                          blood_group: event.target.value
                        }
                      })
                    }}
                    placeholder='blood'
                    displayEmpty
                    required
                  >
                    <MenuItem value='A+'>A+</MenuItem>
                    <MenuItem value='A-'>A-</MenuItem>
                    <MenuItem value='B+'>B+</MenuItem>
                    <MenuItem value='B-'>B-</MenuItem>
                    <MenuItem value='O+'>O+</MenuItem>
                    <MenuItem value='O-'>O-</MenuItem>
                    <MenuItem value='AB+'>AB+</MenuItem>
                    <MenuItem value='AB-'>AB-</MenuItem>
                    <MenuItem value='All'>All</MenuItem>
                  </Select>
                  <FormHelperText>All - Only for Organizations</FormHelperText>
                </FormControl>
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
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