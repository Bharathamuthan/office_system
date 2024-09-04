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
import registerImage from '../assets/images/reg.png';  // Adjust this path as necessary

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  gender: string;
  role: string; // Added role field
}

interface FormErrors {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  gender?: string;
  role?: string; // Added role field
}

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    gender: '',
    role: '', // Added role field
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    if ('id' in e.target) {
      // Handle TextField inputs
      const { id, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
      setFormData({ ...formData, [id]: value });
    } else {
      // Handle Select input for gender and role
      const { name, value } = e.target; // Use 'name' instead of 'id'
      setFormData({ ...formData, [name]: value as string });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.firstname) newErrors.firstname = 'First Name is required';
    if (!formData.lastname) newErrors.lastname = 'Last Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.role) newErrors.role = 'Role is required'; // Validation for role
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form data:', formData);
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
                Sign up
              </Typography>

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="First Name"
                  id="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  error={!!errors.firstname}
                  helperText={errors.firstname}
                  variant="outlined"
                />

                <TextField
                  fullWidth
                  margin="normal"
                  label="Last Name"
                  id="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  error={!!errors.lastname}
                  helperText={errors.lastname}
                  variant="outlined"
                />

                <TextField
                  fullWidth
                  margin="normal"
                  label="Your Email"
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
                    name="gender"
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

                <FormControl fullWidth margin="normal" error={!!errors.role}>
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    name="role"
                    value={formData.role}
                    label="Role"
                    onChange={handleChange as (event: SelectChangeEvent<string>, child: React.ReactNode) => void}
                  >
                    <MenuItem value="">
                      <em>Select Role</em>
                    </MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="employee">Employee</MenuItem>
                    <MenuItem value="training">Training</MenuItem>
                  </Select>
                  <FormHelperText>{errors.role}</FormHelperText>
                </FormControl>

                <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 3, mb: 2 }}>
                  Register
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
          <img src={registerImage} className="image" alt="Register visual" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
