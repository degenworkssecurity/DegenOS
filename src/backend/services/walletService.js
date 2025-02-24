/**
 * Wallet Service Module
 * This module provides high-level functionality for managing wallet operations,
 * such as fetching balances, transaction history, and managing blockchain interactions.
 */

import BlockchainUtils from './blockchain';
import TransactionsUtils from './transactions';
import WalletUtils from './wallet';

class WalletService {
    constructor(apiHandler) {
        this.apiHandler = apiHandler;
    }

    /**
     * Fetch wallet balance for a given blockchain.
     * @param {string} walletAddress - The wallet address to query.
     * @param {Function} apiCall - The blockchain-specific API call for fetching balance.
     * @returns {Promise<number>} The wallet balance.
     */
    async getWalletBalance(walletAddress, apiCall) {
        if (!WalletUtils.validateAddress(walletAddress)) {
            throw new Error('Invalid wallet address.');
        }

        try {
            const balance = await apiCall(walletAddress);
            return balance || 0;
        } catch (error) {
            console.error('[WalletService] Failed to fetch wallet balance:', error.message);
            throw error;
        }
    }

    /**
     * Fetch transaction history for a wallet.
     * @param {string} walletAddress - The wallet address to query.
     * @param {Function} apiCall - The blockchain-specific API call for fetching transactions.
     * @returns {Promise<object[]>} An array of transaction objects.
     */
    async getTransactionHistory(walletAddress, apiCall) {
        if (!WalletUtils.validateAddress(walletAddress)) {
            throw new Error('Invalid wallet address.');
        }

        try {
            const transactions = await apiCall(walletAddress);
            return transactions.map((tx) => TransactionsUtils.parseTransaction(tx));
        } catch (error) {
            console.error('[WalletService] Failed to fetch transaction history:', error.message);
            throw error;
        }
    }

    /**
     * Check if a wallet is active based on its transaction history.
     * @param {string} walletAddress - The wallet address to check.
     * @param {Function} apiCall - The blockchain-specific API call for fetching transactions.
     * @returns {Promise<boolean>} True if the wallet has recent activity, false otherwise.
     */
    async isWalletActive(walletAddress, apiCall) {
        const transactions = await this.getTransactionHistory(walletAddress, apiCall);
        return transactions.length > 0;
    }

    /**
     * Broadcast a transaction from the wallet.
     * @param {object} transaction - The transaction data to broadcast.
     * @param {Function} apiCall - The blockchain-specific API call for broadcasting.
     * @returns {Promise<object>} The result of the transaction broadcast.
     */
    async broadcastTransaction(transaction, apiCall) {
        if (!BlockchainUtils.validateTransactionHash(transaction.hash)) {
            throw new Error('Invalid transaction hash.');
        }

        try {
            return await BlockchainUtils.broadcastTransaction(apiCall, transaction);
        } catch (error) {
            console.error('[WalletService] Failed to broadcast transaction:', error.message);
            throw error;
        }
    }

    /**
     * Estimate gas fees for a transaction.
     * @param {object} transaction - The transaction data.
     * @param {Function} apiCall - The blockchain-specific API call for estimating gas.
     * @returns {Promise<number>} The estimated gas fee.
     */
    async estimateTransactionFees(transaction, apiCall) {
        try {
            return await BlockchainUtils.estimateGas(apiCall, transaction);
        } catch (error) {
            console.error('[WalletService] Failed to estimate transaction fees:', error.message);
            throw error;
        }
    }
}

export default WalletService;