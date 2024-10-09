const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

exports.register = async (req, res) => {
  const { name, email, phone, role, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, phone, role, password: hashedPassword });
    await user.save();
    res.status(201).json({
        message: 'User registered successfully'
     });
  } catch (error) {
    res.status(500).json({ 
    message: 'Error registering user',
    error:error.message
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ 
        message: 'Invalid email or password' 
    });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({
         message:'Invalid email or password'
         });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    user.status = 'online';
    await user.save();
    res.status(200).json({ 
        token
    
    });
  } catch (error) {
    res.status(500).json({ 
        message: 'Error logging ',
        error:error.message
    });
  }
};

exports.logout = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    user.status = 'offline';
    await user.save();
    res.status(200).json({ 
        message: 'Logged out successfully'
     });
  } catch (error) {
    res.status(500).json({ 
    message: 'Error logging out'
     });
  }
};
