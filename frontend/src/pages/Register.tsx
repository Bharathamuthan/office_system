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
import registerImage from '../assets/images/reg.png';
import { registerUser } from '../services/api'; 

interface FormData {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    gender: string;
    role: string;
}

interface FormErrors {
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    gender?: string;
    role?: string;
}

const Register: React.FC = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        gender: '',
        role: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        if (!formData.firstname) newErrors.firstname = 'First name is required';
        if (!formData.lastname) newErrors.lastname = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.role) newErrors.role = 'Role is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await registerUser(formData);
                navigate('/Dashboard'); // Redirect after successful registration
            } catch (error) {
                console.error('Registration error:', error);
                // Handle error (e.g., show a message to the user)
            }
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
                        className="register-card"
                        sx={{
                            my: 5,
                            background: 'hsla(0, 0%, 100%, 0.55)',
                            backdropFilter: 'blur(30px)',
                        }}
                    >
                        <CardContent sx={{ p: 4, textAlign: 'center' }}>
                            <Typography variant="h4" fontWeight="bold" mb={1}>
                                Sign up now
                            </Typography>

                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            label="First name"
                                            id="firstname"
                                            value={formData.firstname}
                                            onChange={handleTextFieldChange}
                                            error={!!errors.firstname}
                                            helperText={errors.firstname}
                                            variant="outlined"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            label="Last name"
                                            id="lastname"
                                            value={formData.lastname}
                                            onChange={handleTextFieldChange}
                                            error={!!errors.lastname}
                                            helperText={errors.lastname}
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            label="Email"
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleTextFieldChange}
                                            error={!!errors.email}
                                            helperText={errors.email}
                                            variant="outlined"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            label="Password"
                                            id="password"
                                            type="password"
                                            value={formData.password}
                                            onChange={handleTextFieldChange}
                                            error={!!errors.password}
                                            helperText={errors.password}
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth margin="normal" error={!!errors.gender}>
                                            <InputLabel id="gender-label">Gender</InputLabel>
                                            <Select
                                                labelId="gender-label"
                                                id="gender"
                                                name="gender"
                                                value={formData.gender}
                                                label="Gender"
                                                onChange={handleSelectChange}
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
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth margin="normal" error={!!errors.role}>
                                            <InputLabel id="role-label">Role</InputLabel>
                                            <Select
                                                labelId="role-label"
                                                id="role"
                                                name="role"
                                                value={formData.role}
                                                label="Role"
                                                onChange={handleSelectChange}
                                            >
                                                <MenuItem value="">
                                                    <em>Select role</em>
                                                </MenuItem>
                                                <MenuItem value="admin">Admin</MenuItem>
                                                <MenuItem value="employee">Employee</MenuItem>
                                                <MenuItem value="training">Training</MenuItem>
                                            </Select>
                                            <FormHelperText>{errors.role}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </Grid>

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
                    <img src={registerImage} className="register-image" alt="Register visual" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Register;
