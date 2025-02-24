/**
 * Authentication Middleware
 * Provides methods for validating API keys and user authorization tokens.
 * Ensures secure access to protected API routes.
 */

import jwt from 'jsonwebtoken'; // Import JSON Web Token library for token verification

class AuthMiddleware {
    /**
     * Validate API Key
     * Ensures that a valid API key is provided in the request headers.
     * Rejects requests with missing or invalid API keys.
     *
     * @param {object} req - The incoming HTTP request object.
     * @param {object} res - The HTTP response object.
     * @param {Function} next - Callback to pass control to the next middleware.
     */
    static validateApiKey(req, res, next) {
        // Extract API key from the request headers
        const apiKey = req.headers['x-api-key'];

        // Check if the API key is missing
        if (!apiKey) {
            console.warn('[AuthMiddleware] Missing API key');
            return res.status(401).json({ error: 'API key is missing' });
        }

        // Compare the provided API key with the expected value
        if (apiKey !== process.env.API_KEY) {
            console.warn('[AuthMiddleware] Invalid API key');
            return res.status(403).json({ error: 'Invalid API key' });
        }

        console.log('[AuthMiddleware] API key validated successfully');
        next(); // Proceed to the next middleware or route handler
    }

    /**
     * Validate User Token
     * Ensures that a valid JWT token is provided in the authorization header.
     * Decodes and verifies the token, then attaches the user payload to the request object.
     *
     * @param {object} req - The incoming HTTP request object.
     * @param {object} res - The HTTP response object.
     * @param {Function} next - Callback to pass control to the next middleware.
     */
    static validateUserToken(req, res, next) {
        // Extract the authorization token from headers
        const token = req.headers['authorization'];

        // Check if the token is missing
        if (!token) {
            console.warn('[AuthMiddleware] Missing authorization token');
            return res.status(401).json({ error: 'Authorization token is missing' });
        }

        try {
            // Verify the token and decode the payload
            const payload = AuthMiddleware.verifyToken(token);

            // Attach the decoded user information to the request object
            req.user = payload;

            console.log('[AuthMiddleware] User token validated successfully');
            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            console.error('[AuthMiddleware] Invalid or expired token:', error.message);
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
    }

    /**
     * Verify JWT Token
     * Decodes and validates a JSON Web Token using a secret key.
     *
     * @param {string} token - The JWT token to verify.
     * @returns {object} The decoded payload if the token is valid.
     * @throws {Error} If the token is invalid or expired.
     */
    static verifyToken(token) {
        console.log('[AuthMiddleware] Verifying token...');
        return jwt.verify(token, process.env.JWT_SECRET); // Use the secret key to verify the token
    }
}

export default AuthMiddleware;
