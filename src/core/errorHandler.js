/**
 * Centralized error handling module.
 * Provides utilities for logging and throwing structured errors.
 */

import config from './config';

class ErrorHandler {
    constructor() {
        this.logLevel = config.general.logLevel;
    }

    logError(error) {
        if (this.logLevel === 'debug' || this.logLevel === 'error') {
            console.error(`[ERROR] ${new Date().toISOString()}:`, error.message);
        }
    }

    logWarning(warning) {
        if (this.logLevel === 'debug' || this.logLevel === 'warn') {
            console.warn(`[WARNING] ${new Date().toISOString()}:`, warning);
        }
    }

    throwStructuredError(message, code = 500) {
        const error = new Error(message);
        error.code = code;
        this.logError(error);
        throw error;
    }

    handleAPIError(response, url) {
        const error = new Error(`API Error: ${response.status} - ${response.statusText} for URL: ${url}`);
        error.code = response.status;
        this.logError(error);
        throw error;
    }
}

export default new ErrorHandler();
