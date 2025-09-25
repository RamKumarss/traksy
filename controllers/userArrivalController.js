import fetch from 'node-fetch';
import UserArrival from '../models/UserArrival.js';

// Function to save or update user arrival data
const updateUserArrivalData = async (data) => {
  try {
    const updated = await UserArrival.findOneAndUpdate(
      { name: data.name }, // filter
      data, // update
      { new: true, upsert: true } // return new doc, insert if not found
    );
    return updated;
  } catch (err) {
    throw new Error(`Failed to update arrival data: ${err.message}`);
  }
};

// saveUserArrivalDataApi API endpoint
export const saveUserArrivalDataApi = async (req, res) => {
  try {
    const newData = req.body;
    const updated = await updateUserArrivalData(newData);

    res.json({ message: 'Data saved/updated!', data: updated });
  } catch (err) {
    console.error(err); // optional logging
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

// Helper function: get distance from Google Maps API
export const getDistanceFromGoogle = async (
  originLat,
  originLng,
  destination = '28.4657,77.0503'
) => {
  console.log('google api hit', originLat, originLng);
  if (!originLat || !originLng) {
    throw new Error('Origin latitude and longitude are required');
  }

  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originLat},${originLng}&destinations=${destination}&mode=driving&departure_time=now&traffic_model=best_guess&key=${GOOGLE_API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch from Google API');
  }

  const data = await res.json();
  return data;
};

// Distance API endpoint
export const getDistance = async (req, res) => {
  const { lat, lng } = req.query;

  try {
    const data = await getDistanceFromGoogle(lat, lng);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
