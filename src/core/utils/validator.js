/**
 * Utility module for validating inputs and data structures.
 * Includes helpers for validating strings, numbers, and objects.
 */

class Validator {
    /**
     * Check if a string is a valid JSON.
     * @param {string} str - The string to validate.
     * @returns {boolean} True if valid JSON, false otherwise.
     */
    static isValidJSON(str) {
        try {
            JSON.parse(str);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Check if a value is a valid number.
     * @param {*} value - The value to validate.
     * @returns {boolean} True if valid number, false otherwise.
     */
    static isValidNumber(value) {
        return typeof value === 'number' && !isNaN(value);
    }

    /**
     * Check if an object has required keys.
     * @param {object} obj - The object to validate.
     * @param {string[]} requiredKeys - The keys that must be present.
     * @returns {boolean} True if all keys are present, false otherwise.
     */
    static hasRequiredKeys(obj, requiredKeys) {
        if (typeof obj !== 'object' || obj === null) {
            return false;
        }

        return requiredKeys.every(key => key in obj);
    }

    /**
     * Validate if a string matches a specific pattern.
     * @param {string} str - The string to validate.
     * @param {RegExp} pattern - The regex pattern to match.
     * @returns {boolean} True if matches, false otherwise.
     */
    static matchesPattern(str, pattern) {
        return pattern.test(str);
    }
}

export default Validator;
