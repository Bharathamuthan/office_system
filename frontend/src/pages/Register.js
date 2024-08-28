import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import '../styles/Register.css';
import registerImage from '../assets/images/favicon.png';

function Register() {
  const navigate = useNavigate();

  // State management
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
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
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
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
      navigate('/');
    }
  };

  const redirectToLogin = () => {
    navigate('/');
  };

  return (
    <MDBContainer fluid className='my-5'>
      <MDBRow className='g-0 align-items-center'>
        <MDBCol col='6'>
          <MDBCard className='my-5 cascading-right' style={{background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(30px)'}}>
            <MDBCardBody className='p-5 shadow-5 text-center'>
              <h2 className="fw-bold mb-5">Sign up now</h2>

              <form onSubmit={handleSubmit}>
                <MDBRow>
                  <MDBCol col='6'>
                    <MDBInput
                      wrapperClass='mb-4'
                      label='First name'
                      id='firstName'
                      type='text'
                      value={formData.firstName}
                      onChange={handleChange}
                      invalid={!!errors.firstName}
                      feedback={errors.firstName}
                    />
                  </MDBCol>

                  <MDBCol col='6'>
                    <MDBInput
                      wrapperClass='mb-4'
                      label='Last name'
                      id='lastName'
                      type='text'
                      value={formData.lastName}
                      onChange={handleChange}
                      invalid={!!errors.lastName}
                      feedback={errors.lastName}
                    />
                  </MDBCol>
                </MDBRow>

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

                <div className='mb-4'>
                  <select
                    className="form-select"
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    aria-label="Gender"
                  >
                    <option value="" disabled>Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && <div className="text-danger">{errors.gender}</div>}
                </div>

                {/* <div className='d-flex justify-content-center mb-4'>
                  <MDBCheckbox
                    name='flexCheck'
                    value=''
                    id='flexCheckDefault'
                    label='Subscribe to our newsletter'
                  />
                </div> */}

                <MDBBtn className='w-100 mb-4' size='md' type='submit'>Sign up</MDBBtn>

                <p>
                  Already have an account?{' '}
                  <MDBBtn color='link' size='sm' onClick={redirectToLogin}>Login</MDBBtn>
                </p>
              </form>

            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol col='6' className='image'>
          <img src={registerImage} className="w-100 rounded-4 shadow-4 img-fluid" alt=""/>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Register;
