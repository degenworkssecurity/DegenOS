/**
 * CORS Middleware Configuration
 * Configures Cross-Origin Resource Sharing (CORS) policies for the API.
 * Specifies which origins, HTTP methods, and headers are allowed.
 */

import cors from 'cors'; // Import the CORS middleware

// Define the allowed origins for the API
const allowedOrigins = [
    'http://localhost:3000', // Local development
    'https://your-production-site.com', // Production environment
];

/**
 * Custom function to validate the request's origin against allowed origins.
 * Calls the callback with an error if the origin is not allowed.
 */
const validateOrigin = (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
        // Allow requests with no origin (e.g., mobile apps or Postman)
        callback(null, true);
    } else {
        // Block requests from disallowed origins
        callback(new Error('CORS policy violation: Origin not allowed.'));
    }
};

// CORS options object
const corsOptions = {
    origin: validateOrigin, // Use the custom origin validation function
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // HTTP methods allowed by the API
    allowedHeaders: ['Content-Type', 'Authorization'], // HTTP headers allowed in requests
    credentials: true, // Allow cookies and credentials in requests
};

// Export the configured CORS middleware
export default cors(corsOptions);
