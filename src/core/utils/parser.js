/**
 * Utility module for parsing and transforming data structures.
 * Includes helpers for parsing JSON, formatting data, and handling edge cases.
 */

class Parser {
    /**
     * Safely parse a JSON string into an object.
     * @param {string} jsonString - The JSON string to parse.
     * @returns {object|null} Parsed object or null if parsing fails.
     */
    static safeJSONParse(jsonString) {
        try {
            return JSON.parse(jsonString);
        } catch (error) {
            console.error(`[Parser] Failed to parse JSON: ${error.message}`);
            return null;
        }
    }

    /**
     * Convert an object to a JSON string with formatting.
     * @param {object} obj - The object to stringify.
     * @param {number} [space=2] - Number of spaces for indentation.
     * @returns {string} The formatted JSON string.
     */
    static toJSONString(obj, space = 2) {
        try {
            return JSON.stringify(obj, null, space);
        } catch (error) {
            console.error(`[Parser] Failed to stringify object: ${error.message}`);
            return '';
        }
    }

    /**
     * Normalize keys in an object to lowercase.
     * @param {object} obj - The object to normalize.
     * @returns {object} A new object with lowercase keys.
     */
    static normalizeKeys(obj) {
        if (typeof obj !== 'object' || obj === null) {
            console.error('[Parser] Invalid object provided for normalization.');
            return {};
        }

        return Object.keys(obj).reduce((acc, key) => {
            acc[key.toLowerCase()] = obj[key];
            return acc;
        }, {});
    }
}

export default Parser;
