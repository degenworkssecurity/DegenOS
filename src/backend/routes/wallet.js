/**
 * Wallet Utility Module
 * Contains utility functions for validating, formatting, and analyzing wallet addresses.
 * These functions ensure wallet addresses are processed consistently across the application.
 */

class WalletUtils {
    /**
     * Validate Wallet Address
     * Checks whether a given wallet address is valid based on its length and allowed characters.
     *
     * @param {string} address - The wallet address to validate.
     * @returns {boolean} Returns true if the address is valid, otherwise false.
     */
    static validateAddress(address) {
        // Regex pattern: Allows alphanumeric strings between 32 and 44 characters long
        const addressPattern = /^[a-zA-Z0-9]{32,44}$/;

        // Test the address against the pattern
        const isValid = addressPattern.test(address);

        console.log(`[WalletUtils] Validating address: ${address} -> ${isValid ? 'Valid' : 'Invalid'}`);
        return isValid;
    }

    /**
     * Format Wallet Address
     * Shortens wallet addresses for display purposes by truncating the middle portion.
     *
     * @param {string} address - The wallet address to format.
     * @returns {string} The formatted wallet address (e.g., "abcd...xyz").
     */
    static formatAddress(address) {
        // If the address is long, truncate the middle portion
        if (address.length > 10) {
            const formatted = `${address.slice(0, 6)}...${address.slice(-4)}`;
            console.log(`[WalletUtils] Formatting address: ${address} -> ${formatted}`);
            return formatted;
        }

        // Return the original address if it's short enough
        console.log(`[WalletUtils] Address is short, no formatting applied: ${address}`);
        return address;
    }

    /**
     * Analyze Wallet Address
     * Provides a detailed analysis of the wallet address structure, including length and character composition.
     *
     * @param {string} address - The wallet address to analyze.
     * @returns {object} An object containing analysis results:
     *                   - length: The length of the address.
     *                   - containsUppercase: Boolean indicating if it contains uppercase letters.
     *                   - containsLowercase: Boolean indicating if it contains lowercase letters.
     *                   - containsNumbers: Boolean indicating if it contains numbers.
     */
    static analyzeAddress(address) {
        // Perform the analysis by testing for character types
        const analysis = {
            length: address.length,
            containsUppercase: /[A-Z]/.test(address), // Checks for uppercase letters
            containsLowercase: /[a-z]/.test(address), // Checks for lowercase letters
            containsNumbers: /[0-9]/.test(address),   // Checks for numeric digits
        };

        console.log(`[WalletUtils] Analysis results for address: ${address}`, analysis);
        return analysis;
    }
}

export default WalletUtils;
