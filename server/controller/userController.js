const User = require('../model/user');
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
        users
    });
  } catch (error) {
        res.status(500).json({ 
        message: 'Error fetching users',
        error:error.message
        
    });
  }
};
exports.getUserById = async (req, res) => {
  try {
    const userId =req.user
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ 
    message: 'Error fetching user',
    error:error.message
});
  }
};
exports.updateUser = async (req, res) => {
  const { name, phone, role } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { name, phone, role }, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
    message: 'Error updating user',
    error:error.message    
});
  }
};


exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ 
    message: 'Error deleting user', 
    error:error.message
    });
  }
};
