import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Link,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import '../styles/Register.css';
import registerImage from '../assets/images/favicon.png';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  gender?: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();

  // State management
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Handle input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent<string>
  ) => {
    const { id, value } = e.target as HTMLInputElement;
    if (id) {
      setFormData({ ...formData, [id]: value });
    } else {
      setFormData({ ...formData, gender: (e as SelectChangeEvent<string>).target.value });
    }
  };

  // Validate form fields
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle successful form submission here
      console.log('Form data:', formData);
      // Redirect or perform other actions
      navigate('/');
    }
  };

  const redirectToLogin = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="lg" sx={{ my: 5 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item md={6}>
          <Card
            sx={{
              my: 5,
              background: 'hsla(0, 0%, 100%, 0.55)',
              backdropFilter: 'blur(30px)',
            }}
          >
            <CardContent sx={{ p: 5, textAlign: 'center' }}>
              <Typography variant="h4" fontWeight="bold" mb={5}>
                Sign up now
              </Typography>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="First name"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      error={!!errors.firstName}
                      helperText={errors.firstName}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Last name"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      error={!!errors.lastName}
                      helperText={errors.lastName}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>

                <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Password"
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  variant="outlined"
                />

                <FormControl fullWidth margin="normal" error={!!errors.gender}>
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender"
                    value={formData.gender}
                    label="Gender"
                    onChange={handleChange as (event: SelectChangeEvent<string>, child: React.ReactNode) => void}
                  >
                    <MenuItem value="">
                      <em>Select gender</em>
                    </MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                  <FormHelperText>{errors.gender}</FormHelperText>
                </FormControl>

                <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 3, mb: 2 }}>
                  Sign up
                </Button>

                <Typography>
                  Already have an account?{' '}
                  <Link component="button" variant="body2" onClick={redirectToLogin}>
                    Login
                  </Link>
                </Typography>
              </form>
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={6}>
          <img src={registerImage} className="w-100 rounded-4 shadow-4 img-fluid" alt="Register visual" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
