import UserArrival from "../models/UserArrival.js";

// Save or Update User Arrival Data
export const saveUserArrivalData = async (req, res) => {
  try {
    const newData = req.body;

    // Update if same name exists
    const updated = await UserArrival.findOneAndUpdate(
      { name: newData.name },
      newData,
      { new: true, upsert: true } // upsert = insert if not found
    );

    res.json({ message: "Data saved/updated!", data: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Users Arrival Data
export const getAllUsersArrivalData = async (req, res) => {
  try {
    const allData = await UserArrival.find();
    res.json(allData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
