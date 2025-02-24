/**
 * Centralized logging module.
 * Handles logging for different log levels and provides utilities for structured logging.
 */

import config from './config';

class Logger {
    constructor() {
        this.logLevel = config.general.logLevel;
    }

    log(message, level = 'info') {
        const timestamp = new Date().toISOString();

        switch (level) {
            case 'debug':
                if (this.logLevel === 'debug') {
                    console.debug(`[DEBUG] ${timestamp}:`, message);
                }
                break;
            case 'info':
                if (['debug', 'info'].includes(this.logLevel)) {
                    console.info(`[INFO] ${timestamp}:`, message);
                }
                break;
            case 'warn':
                if (['debug', 'info', 'warn'].includes(this.logLevel)) {
                    console.warn(`[WARN] ${timestamp}:`, message);
                }
                break;
            case 'error':
                console.error(`[ERROR] ${timestamp}:`, message);
                break;
            default:
                console.log(`[LOG] ${timestamp}:`, message);
        }
    }

    debug(message) {
        this.log(message, 'debug');
    }

    info(message) {
        this.log(message, 'info');
    }

    warn(message) {
        this.log(message, 'warn');
    }

    error(message) {
        this.log(message, 'error');
    }
}

export default new Logger();
