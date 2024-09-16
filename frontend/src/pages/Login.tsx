import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Container, Grid, Card, CardContent, TextField, Button, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoginImage from '../assets/images/signin.png';
import '../styles/Login.css';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.email) newErrors.email = 'email is required';
    if (!formData.password) newErrors.password = 'password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form data:', formData);
      navigate('/Dashboard');
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
                  label='email'
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
                  label='password'
                  id='password'
                  type='password'
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  variant='outlined'
                />

                <Button fullWidth variant='contained' color='primary' type='submit' sx={{ mt: 3, mb: 2 }}>
                  Submit
                </Button>

                <Typography>
                  Create New Account?{' '}
                  <Link component="button" variant="body2" onClick={redirectToRegister}>
                    Sign up
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
