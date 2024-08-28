import React, { useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBRow,
  MDBCol,
  //MDBCheckbox
} from 'mdb-react-ui-kit';
import LoginImage from '../assets/images/thanku.jpg';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const navigate = useNavigate();

  // State management
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle successful form submission here
      console.log('Form data:', formData);
      // Redirect or perform other actions
      navigate('/Dashboard');
    }
  };

  const redirectToRegister = () => {
    navigate('/Register');
  };

  return (
    <MDBContainer fluid className='my-5'>
      <MDBRow className='g-0 align-items-center'>
        <MDBCol col='6'>
          <MDBCard className='my-5 cascading-right' style={{background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(30px)'}}>
            <MDBCardBody className='p-5 shadow-5 text-center'>
              <h2 className="fw-bold mb-5">Login now</h2>

              <form onSubmit={handleSubmit}>
                <MDBInput
                  wrapperClass='mb-4'
                  label='Email'
                  id='email'
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                  invalid={!!errors.email}
                  feedback={errors.email}
                />
                <MDBInput
                  wrapperClass='mb-4'
                  label='Password'
                  id='password'
                  type='password'
                  value={formData.password}
                  onChange={handleChange}
                  invalid={!!errors.password}
                  feedback={errors.password}
                />

                {/* <div className='d-flex justify-content-center mb-4'>
                  <MDBCheckbox
                    name='flexCheck'
                    value=''
                    id='flexCheckDefault'
                    label='Subscribe to our newsletter'
                  />
                </div> */}

                <MDBBtn className='w-100 mb-4' size='md' onClick={handleSubmit} type='submit'>Submit</MDBBtn>

                <p>
                  Create New Account?{' '}
                  <MDBBtn color='link' size='sm' onClick={redirectToRegister}>Sign up</MDBBtn>
                </p>
              </form>

            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol col='6'>
          <img src={LoginImage} className="w-100 rounded-4 shadow-4 img-fluid" alt=""/>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
