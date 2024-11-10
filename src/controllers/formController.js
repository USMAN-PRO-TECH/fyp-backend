const Form = require('../models/Form');

// Controller to handle form submission
const submitForm = async (req, res) => {
  const { firstName, lastName, email, phone, location, message } = req.body;

  // Basic validation
  if (!firstName || !lastName || !email || !phone || !location || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newForm = await Form.create({
      firstName,
      lastName,
      email,
      phone,
      location,
      message,
    });

    res.status(201).json({ message: 'Form submitted successfully', form: newForm });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ error: 'Failed to submit form' });
  }
};

module.exports = { submitForm };
