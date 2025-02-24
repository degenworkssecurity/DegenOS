/**
 * Utility module for formatting data for display or processing.
 * Includes helpers for date formatting, currency, and text transformations.
 */

class Formatter {
    /**
     * Format a number as a currency string.
     * @param {number} value - The numeric value to format.
     * @param {string} currency - The currency symbol (e.g., 'USD', 'EUR').
     * @param {number} decimals - Number of decimal places.
     * @returns {string} The formatted currency string.
     */
    static formatCurrency(value, currency = 'USD', decimals = 2) {
        try {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency,
                minimumFractionDigits: decimals,
            }).format(value);
        } catch (error) {
            console.error(`[Formatter] Failed to format currency: ${error.message}`);
            return `${currency} ${value}`;
        }
    }

    /**
     * Format a timestamp into a readable date string.
     * @param {number} timestamp - The UNIX timestamp to format.
     * @param {string} locale - The locale for formatting (default: 'en-US').
     * @returns {string} The formatted date string.
     */
    static formatDate(timestamp, locale = 'en-US') {
        try {
            const date = new Date(timestamp * 1000); // Convert to milliseconds
            return date.toLocaleString(locale, {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
        } catch (error) {
            console.error(`[Formatter] Failed to format date: ${error.message}`);
            return String(timestamp);
        }
    }

    /**
     * Capitalize the first letter of a string.
     * @param {string} text - The string to capitalize.
     * @returns {string} The capitalized string.
     */
    static capitalize(text) {
        if (typeof text !== 'string') {
            console.error('[Formatter] Invalid text provided for capitalization.');
            return '';
        }
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
}

export default Formatter;
