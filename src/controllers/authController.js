const User = require('../models/User');
const generateToken = require('../utils/jwtUtils');

// Register user
const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ username, email, password });
    res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

// Login user
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser };
