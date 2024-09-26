// src/services/api.js

import axios from 'axios';

// Define the API URL for login
const LOGIN_API_URL = 'http://localhost:3000/officesystem/login';

// Function to handle user login
export const loginUser = async (formData : any) => {
    try {
        const response = await axios.post(LOGIN_API_URL, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Define the API URL for registration
const REGISTER_API_URL = 'http://localhost:3000/officesystem/register';

// Function to handle user registration
export const registerUser = async (formData : any) => {
    try {
        // Make a POST request to the API with the form data
        const response = await axios.post(REGISTER_API_URL, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // Return the response data
        return response.data;
    } catch (error) {
        // Throw error if the request fails
        throw error;
    }
};
