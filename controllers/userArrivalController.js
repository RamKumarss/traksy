import fetch from 'node-fetch';
import UserArrival from '../models/UserArrival.js';

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

    res.json({ message: 'Data saved/updated!', data: updated });
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
//Get User Distance Data
export const getDistance = async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res
      .status(400)
      .json({ error: 'Latitude and longitude are required' });
  }

  try {
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
    const destination = '28.1472,77.3342'; // Fixed destination

    const googleUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${lat},${lng}&destinations=${destination}&mode=driving&departure_time=now&traffic_model=best_guess&key=${GOOGLE_API_KEY}`;

    const googleRes = await fetch(googleUrl);
    const data = await googleRes.json();

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch distance data' });
  }
};
