const User = require('../Model/registermodel'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');  
const {UserSchema,loginSchema} = require('../Validation/registervalidation')

// Create a new employee
const createUser = async (req, res) => {

     // Validate data before creating a user
     const { error } = UserSchema(req.body);
     if (error) return res.status(400).json({ message: error.details[0].message });

    const { FirstName, LastName, Gender, Email, Password } = req.body;

    if (!FirstName || !LastName || !Gender || !Email || !Password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        let user = await User.findOne({ Email });
        if (user) {
            return res.status(400).json({ message: 'Employee already exists' });
        }

       user = new User({
            FirstName,
            LastName,
            Gender,
            Email,
            Password
        });

        const salt = await bcrypt.genSalt(10);
       user.Password = await bcrypt.hash(Password, salt);

        await user.save(); 
        res.status(201).json({ success: true, data: user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all employees
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get a single employee by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,  
                message: 'Employee not found'
            });
        }
         res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Update an employee by ID
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Delete an employee by ID
const deleteUser = async (req, res) => {
    try {
        const user = await Employe.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Employee deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Login employee
const loginUser = async (req, res) => {

     // Validate data before logging in a user
     const { error } = loginSchema(req.body);
     if (error) return res.status(400).json({ message: error.details[0].message });

    const { Email, Password } = req.body;

    if (!Email || !Password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = await User.findOne({ Email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            config.get('jwtSecret'),  
            { expiresIn: '3h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser
};
