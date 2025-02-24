/**
 * Blockchain Utility Module
 * Provides reusable functions for interacting with blockchain networks.
 * Supports common operations such as fetching block details, broadcasting transactions, 
 * and validating transaction data.
 */

class BlockchainUtils {
    /**
     * Get Current Block Height
     * Retrieves the latest block height from the blockchain network.
     *
     * @param {Function} apiCall - Function to execute the API call to fetch block height.
     * @returns {Promise<number>} Resolves to the current block height or 0 if unavailable.
     * @throws {Error} If the API call fails.
     */
    static async getBlockHeight(apiCall) {
        try {
            const response = await apiCall();
            const blockHeight = response?.height || 0;
            console.log(`[BlockchainUtils] Current block height: ${blockHeight}`);
            return blockHeight;
        } catch (error) {
            console.error('[BlockchainUtils] Error fetching block height:', error.message);
            throw error;
        }
    }

    /**
     * Broadcast Transaction
     * Sends a transaction to the blockchain network.
     *
     * @param {Function} apiCall - Function to execute the API call for broadcasting transactions.
     * @param {object} transaction - Transaction data to be broadcasted.
     * @returns {Promise<object>} Resolves to the response from the blockchain network.
     * @throws {Error} If the API call fails.
     */
    static async broadcastTransaction(apiCall, transaction) {
        try {
            console.log('[BlockchainUtils] Broadcasting transaction:', transaction);
            const response = await apiCall(transaction);
            console.log('[BlockchainUtils] Transaction broadcast successful:', response);
            return response || {};
        } catch (error) {
            console.error('[BlockchainUtils] Error broadcasting transaction:', error.message);
            throw error;
        }
    }

    /**
     * Get Block Details
     * Fetches details of a specific block by its number or hash.
     *
     * @param {Function} apiCall - Function to execute the API call for block details.
     * @param {string|number} identifier - The block number or hash to fetch details for.
     * @returns {Promise<object>} Resolves to the block details or an empty object if unavailable.
     * @throws {Error} If the API call fails.
     */
    static async getBlockDetails(apiCall, identifier) {
        try {
            console.log(`[BlockchainUtils] Fetching details for block: ${identifier}`);
            const response = await apiCall(identifier);
            console.log('[BlockchainUtils] Block details retrieved:', response);
            return response || {};
        } catch (error) {
            console.error('[BlockchainUtils] Error fetching block details:', error.message);
            throw error;
        }
    }

    /**
     * Validate Transaction Hash
     * Validates the format of a given transaction hash using a regex pattern.
     *
     * @param {string} hash - The transaction hash to validate.
     * @returns {boolean} True if the hash is valid, false otherwise.
     */
    static validateTransactionHash(hash) {
        const hashPattern = /^[A-Fa-f0-9]{64}$/;
        const isValid = hashPattern.test(hash);
        console.log(`[BlockchainUtils] Validating transaction hash: ${hash} -> ${isValid ? 'Valid' : 'Invalid'}`);
        return isValid;
    }

    /**
     * Estimate Gas Fees
     * Estimates the gas fees required for executing a transaction.
     *
     * @param {Function} apiCall - Function to execute the API call for gas fee estimation.
     * @param {object} transaction - The transaction data for which to estimate gas fees.
     * @returns {Promise<number>} Resolves to the estimated gas fee or 0 if unavailable.
     * @throws {Error} If the API call fails.
     */
    static async estimateGas(apiCall, transaction) {
        try {
            console.log('[BlockchainUtils] Estimating gas for transaction:', transaction);
            const response = await apiCall(transaction);
            const gasFee = response?.gasFee || 0;
            console.log(`[BlockchainUtils] Estimated gas fee: ${gasFee}`);
            return gasFee;
        } catch (error) {
            console.error('[BlockchainUtils] Error estimating gas:', error.message);
            throw error;
        }
    }
}

export default BlockchainUtils;
