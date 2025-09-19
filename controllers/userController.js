import User from '../models/User.js';

// Save or Update User
export const saveUser = async (req, res) => {
  try {
    const newData = req.body;

    // Update if same name exists
    const updated = await User.findOneAndUpdate(
      { name: newData.name },
      newData,
      { new: true, upsert: true } // upsert = insert if not found
    );

    res.json({ message: 'Data saved/updated!', data: updated });
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
