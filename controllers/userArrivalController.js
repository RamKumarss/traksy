import fetch from 'node-fetch';
import UserArrival from '../models/UserArrival.js';

// Function to save or update user arrival data
const updateUserArrivalData = async (data) => {
  try {
    const updated = await UserArrival.findOneAndUpdate(
      { name: data.name }, // filter
      data,                // update
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
export const getDistanceFromGoogle = async (originLat, originLng, destination = '28.4196,77.0386') => {
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


const activeTasks = {};
export const updateArrivalTimeWithScheduler = async (req, res) => {
  const { time1, time2, taskId } = req.body;
  // time1 and time2 are UTC timestamps in ISO format, e.g., "2025-09-22T10:00:00Z"

  const startTime = new Date(time1).getTime();
  const endTime = new Date(time2).getTime();
  const now = Date.now();

  if (startTime <= now) {
    return res.status(400).json({ error: 'time1 must be in the future' });
  }

  // Schedule first API call at time1
  const delayToStart = startTime - now;
  const startTimeout = setTimeout(async () => {
    console.log(`Task ${taskId} starting at ${new Date().toISOString()}`);
    await callApi(taskId);

    // Schedule repeated API calls every 10 minutes until time2
    const interval = setInterval(async () => {
      const currentTime = Date.now();
      if (currentTime >= endTime) {
        console.log(`Task ${taskId} reached time2, stopping`);
        clearInterval(interval);
        delete activeTasks[taskId];
      } else {
        await callApi(taskId);
      }
    }, 10 * 60 * 1000); // 10 minutes

    activeTasks[taskId] = interval;
  }, delayToStart);

  activeTasks[taskId] = startTimeout;

  res.json({ message: `Task ${taskId} scheduled from ${time1} to ${time2}` });
};
