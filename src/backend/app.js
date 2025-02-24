/**
 * Main Application File
 * Initializes and configures the Express application.
 * Includes setup for middleware, routes, error handling, and environment checks.
 */

import express from 'express'; // Express framework for server creation
import dotenv from 'dotenv'; // For loading environment variables
import corsConfig from './corsConfig'; // CORS configuration module
import RateLimiter from './rateLimiter'; // Rate limiting middleware
import AuthMiddleware from './authMiddleware'; // API key authentication middleware
import apiRoutes from './routes/apiRoutes'; // API route definitions

// Load environment variables from .env file
dotenv.config();

// Validate environment configuration
if (!process.env.PORT) {
    console.error('[Error] PORT environment variable is not set.');
    process.exit(1); // Exit if required configuration is missing
}

if (!process.env.API_KEY) {
    console.error('[Error] API_KEY environment variable is missing.');
    process.exit(1); // Exit if API key is not configured
}

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 5000; // Default to port 5000 if not specified

/**
 * Middleware Configuration
 * - Sets up JSON parsing, CORS policy, rate limiting, and authentication.
 */

// Parse incoming JSON requests
app.use(express.json());

// Apply Cross-Origin Resource Sharing (CORS) settings
app.use(corsConfig);

// Enforce rate limiting to protect against abuse
app.use(RateLimiter);

// Validate API key for incoming requests
app.use(AuthMiddleware.validateApiKey);

/**
 * Route Configuration
 * - Configures API endpoints under the /api prefix.
 */

// Mount all API routes
app.use('/api', apiRoutes);

/**
 * Error Handling Middleware
 * - Handles errors thrown during request processing.
 * - Logs error messages and responds with appropriate status codes.
 */
app.use((err, req, res, next) => {
    console.error(`[Error] ${err.message}`); // Log the error message for debugging
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error', // Respond with a generic error if no message is provided
    });
});

/**
 * Start the Server
 * - Starts the Express server on the specified port.
 * - Logs a confirmation message when the server is running.
 */
app.listen(PORT, () => {
    console.log(`[Server] Application running on port ${PORT}`);
});

// Export the app for testing and integration
export default app;
