import express from 'express';
import mongoose from 'mongoose';
import userArrivalRoutes from './routes/userArrivalRoutes.js';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors'; // ✅ Import cors

dotenv.config(); // Load environment variables from .env

const app = express();
// ✅ Allow CORS for all requests
const allowedOrigins = [
  'http://localhost:3000', // local dev
  'http://localhost:5173', // vite dev
  'https://traksy-fiwh.vercel.app', // prod
  /\.vercel\.app$/, // ✅ any Vercel preview domain
];
app.use(
  cors({
    origin: function (origin, callback) {
      // ✅ Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) {
        console.log('✅ Allowing mobile app request (no origin)');
        return callback(null, true);
      }

      // ✅ Allow requests from file:// protocol (bundled apps)
      if (origin === 'file://') {
        return callback(null, true);
      }

      if (
        allowedOrigins.some((o) => {
          if (o instanceof RegExp) return o.test(origin);
          return o === origin;
        })
      ) {
        callback(null, true);
      } else {
        console.error('❌ Blocked by CORS:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

// 🔑 Use environment variable for MongoDB URI
const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error(
    '❌ Error: MONGODB_URI is not defined in environment variables'
  );
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Use Routes
app.use('/api/locationData', userArrivalRoutes);
app.use('/api/user', userRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
