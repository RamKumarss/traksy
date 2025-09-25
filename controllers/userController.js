import User from '../models/User.js';

// Save or Update User
export const saveUser = async (req, res) => {
  try {
    let newData = req.body;

    // Always save name in lowercase
    if (newData.name) {
      newData.name = newData.name.toLowerCase();
    }

    // Check if user with same lowercase name already exists
    const existingUser = await User.findOne({ name: newData.name });

    if (existingUser) {
      // Don't override, just return existing data
      return res.json({
        message: 'User already exists!',
        data: existingUser
      });
    }

    // Otherwise create new user
    const user = new User(newData);
    const savedUser = await user.save();

    res.json({ message: 'New user created!', data: savedUser });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get getUserByName
export const getUserByName = async (req, res) => {
  const { id } = req.params; // Get name from URL

  try {
    const userData = await User.findOne({ _id: id }); // Find user by name
    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(userData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
