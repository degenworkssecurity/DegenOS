/**
 * Transaction Service Module
 * This module provides high-level functionality for handling blockchain transactions,
 * including validation, submission, and monitoring.
 */

import BlockchainUtils from './blockchain';
import TransactionsUtils from './transactions';

class TransactionService {
    constructor(apiHandler) {
        this.apiHandler = apiHandler;
    }

    /**
     * Submit a transaction to the blockchain.
     * @param {object} transaction - The transaction data to be submitted.
     * @param {Function} apiCall - The blockchain-specific API call for submitting transactions.
     * @returns {Promise<object>} The result of the transaction submission.
     */
    async submitTransaction(transaction, apiCall) {
        if (!BlockchainUtils.validateTransactionHash(transaction.hash)) {
            throw new Error('Invalid transaction hash.');
        }

        try {
            const result = await BlockchainUtils.broadcastTransaction(apiCall, transaction);
            return result;
        } catch (error) {
            console.error('[TransactionService] Failed to submit transaction:', error.message);
            throw error;
        }
    }

    /**
     * Fetch transaction details by its hash.
     * @param {string} hash - The transaction hash.
     * @param {Function} apiCall - The blockchain-specific API call for fetching transaction details.
     * @returns {Promise<object>} The transaction details.
     */
    async fetchTransactionDetails(hash, apiCall) {
        if (!BlockchainUtils.validateTransactionHash(hash)) {
            throw new Error('Invalid transaction hash.');
        }

        try {
            const details = await apiCall(hash);
            return TransactionsUtils.parseTransaction(details);
        } catch (error) {
            console.error('[TransactionService] Failed to fetch transaction details:', error.message);
            throw error;
        }
    }

    /**
     * Monitor a transaction status until it is confirmed or failed.
     * @param {string} hash - The transaction hash.
     * @param {Function} apiCall - The blockchain-specific API call for checking transaction status.
     * @param {number} interval - The polling interval in milliseconds.
     * @returns {Promise<object>} The final status of the transaction.
     */
    async monitorTransactionStatus(hash, apiCall, interval = 5000) {
        if (!BlockchainUtils.validateTransactionHash(hash)) {
            throw new Error('Invalid transaction hash.');
        }

        return new Promise((resolve, reject) => {
            const checkStatus = async () => {
                try {
                    const status = await apiCall(hash);

                    if (status.confirmed || status.failed) {
                        clearInterval(poller);
                        resolve(status);
                    }
                } catch (error) {
                    clearInterval(poller);
                    console.error('[TransactionService] Error while monitoring transaction status:', error.message);
                    reject(error);
                }
            };

            const poller = setInterval(checkStatus, interval);
            checkStatus(); // Initial immediate check
        });
    }

    /**
     * Validate the structure and content of a transaction.
     * @param {object} transaction - The transaction to validate.
     * @returns {boolean} True if the transaction is valid, otherwise false.
     */
    validateTransaction(transaction) {
        if (!transaction.hash || !transaction.from || !transaction.to || !transaction.value) {
            return false;
        }

        return BlockchainUtils.validateTransactionHash(transaction.hash);
    }
}

export default TransactionService;
