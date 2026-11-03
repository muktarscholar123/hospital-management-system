/**
 * Express Application Configuration
 * Sets up middleware, API routes, and standard response handling.
 */
const express = require('express');
const cors = require('cors');
const prisma = require('./config/prisma');

const app = express();

// 1. Cross-Origin Resource Sharing (CORS)
// Allows our React frontend (running on a different port like 5173) to communicate with this backend.
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

// 2. Request body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. API Health Check Endpoint
// Returns the status of the server and verifies the MySQL database connection via Prisma.
app.get('/api/v1/health', async (req, res) => {
  try {
    // Perform a lightweight query to test the MySQL connection
    await prisma.$queryRaw`SELECT 1`;

    return res.status(200).json({
      success: true,
      data: {
        server: 'HMS Express Server is online',
        database: 'Connected to MySQL via Prisma',
        timestamp: new Date().toISOString(),
      },
      message: 'System is healthy',
    });
  } catch (error) {
    return res.status(503).json({
      success: false,
      error: {
        code: 'DATABASE_DISCONNECTED',
        message: 'Could not connect to the database',
        details: error.message,
      },
    });
  }
});

// 4. Fallback for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `The requested path ${req.originalUrl} does not exist.`,
    },
  });
});

// 5. Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Application Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: err.message || 'An unexpected error occurred on the server.',
    },
  });
});

module.exports = app;

