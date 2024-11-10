const { ErrorResponse } = require('../utils/errorHandler');

const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new ErrorResponse('User already exists', 400));
    }

    const user = await User.create({ username, email, password });
    res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
};
