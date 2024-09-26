// src/pages/Login.tsx

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Container, Grid, Card, CardContent, TextField, Button, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoginImage from '../assets/images/signin.png';
import '../styles/Login.css';
import { loginUser } from '../services/api';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  form?: string; // Add this line to include form error
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await loginUser(formData);
        console.log('Login successful:', response);
        navigate('/Dashboard');
      } catch (error) {
        console.error('Login error:', error);
        setErrors({ ...errors, form: 'Login failed. Please check your credentials.' });
      } finally {
        setLoading(false);
      }
    } else {
      // Scroll to the first field with an error
      const firstErrorField = document.querySelector('.Mui-error');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  

  const redirectToRegister = () => {
    navigate('/Register');
  };

  return (
    <Container maxWidth='lg' sx={{ my: 5 }}>
      <Grid container spacing={2} alignItems='center'>
        <Grid item md={6}>
          <Card
            sx={{
              my: 5,
              background: 'hsla(0, 0%, 100%, 0.55)',
              backdropFilter: 'blur(30px)',
            }}
          >
            <CardContent sx={{ p: 5, textAlign: 'center' }}>
              <Typography variant='h4' fontWeight='bold' mb={5}>
                Login now
              </Typography>

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  margin='normal'
                  label='Email'
                  id='email'
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  variant='outlined'
                />
                <TextField
                  fullWidth
                  margin='normal'
                  label='Password'
                  id='password'
                  type='password'
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  variant='outlined'
                />

                <Button fullWidth variant='contained' color='primary' type='submit' sx={{ mt: 3, mb: 2 }} disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit'}
                </Button>

                {errors.form && <Typography color="error">{errors.form}</Typography>}

                <Typography>
                  Create New Account?{' '}
                  <Link component="button" variant="body2" onClick={redirectToRegister}>
                    Sign_up
                  </Link>
                </Typography>
              </form>
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={6}>
          <img src={LoginImage} className="login-image" alt="Login visual" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
