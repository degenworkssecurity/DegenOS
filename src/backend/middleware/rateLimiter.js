/**
 * Rate Limiter Middleware
 * Implements API request rate limiting to protect the application from abuse.
 * Limits the number of requests a client can make within a defined time window.
 */

import rateLimit from 'express-rate-limit'; // Import rate-limiting middleware

/**
 * Rate Limiter Configuration
 * Sets up the parameters for rate limiting, including time window, max requests,
 * and the response message for clients exceeding the limit.
 */
const RateLimiter = rateLimit({
    // Time window for rate limiting (15 minutes)
    windowMs: 15 * 60 * 1000,

    // Maximum number of requests allowed per IP within the time window
    max: 100,

    // Custom message to send when the rate limit is exceeded
    message: {
        error: 'Rate limit exceeded. Too many requests from this IP. Try again after 15 minutes.',
    },

    // Include rate limit information in response headers
    headers: true,
});

// Export the configured rate limiter middleware for use in the application
export default RateLimiter;
