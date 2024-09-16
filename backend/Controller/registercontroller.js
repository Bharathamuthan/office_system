const User = require('../Model/registermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { UserSchema, loginSchema } = require('../Validation/registervalidation');

// Create a new user
const createUser = async (req, res) => {
    // Validate data before creating a user
    const { error } = UserSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { FirstName, LastName, Gender, Email, Password, Role } = req.body;

    if (!FirstName || !LastName || !Gender || !Email || !Password || !Role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        let user = await User.findOne({ Email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({
            FirstName,
            LastName,
            Gender,
            Email,
            Password,
            Role
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
// Get all users
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

// Get a single user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
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

// Update a user by ID
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
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

// Delete a user by ID
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// // Login user
const loginUser = async (req, res) => {
    // Validate user input
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { Email, Password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ Email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Create JWT payload
        const payload = {
            user: {
                id: user.id,
                role: user.Role // Include role or any other user info if needed
            }
        };

        // Sign the token
        const token = jwt.sign(
            payload,
            config.get('jwtSecret'),  // Ensure you have 'jwtSecret' in your config file
            { expiresIn: '3h' }  // Token expiration time
        );

        // Respond with the token
        res.status(200).json({ token });
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
