/**
 * Module for interacting with the Ethereum blockchain.
 * Provides utilities for fetching wallet data, transaction history, and more.
 */

import config from '../config';
import APIHandler from '../core/apiHandler';

class Ethereum {
    constructor() {
        this.rpcUrl = config.blockchains.ethereum.rpcUrl;
        this.network = config.blockchains.ethereum.network;
    }

    /**
     * Fetch the balance of a wallet in ETH.
     * @param {string} walletAddress - The Ethereum wallet address.
     * @returns {Promise<number>} Balance in ETH.
     */
    async getBalance(walletAddress) {
        const payload = {
            jsonrpc: '2.0',
            id: 1,
            method: 'eth_getBalance',
            params: [walletAddress, 'latest'],
        };

        try {
            const response = await APIHandler.request({
                baseUrl: this.rpcUrl,
                endpoint: '',
                method: 'POST',
                body: payload,
            });

            const wei = parseInt(response.result, 16) || 0;
            return wei / 1e18; // Convert wei to ETH
        } catch (error) {
            console.error(`[Ethereum] Failed to fetch balance for wallet ${walletAddress}:`, error.message);
            throw error;
        }
    }

    /**
     * Fetch the recent transactions for a wallet.
     * Note: Requires integration with an Ethereum transaction indexing API.
     * @param {string} walletAddress - The Ethereum wallet address.
     * @param {number} limit - Number of transactions to fetch.
     * @returns {Promise<object[]>} Array of transaction details.
     */
    async getTransactions(walletAddress, limit = 10) {
        console.warn('[Ethereum] Direct transaction fetching is not supported via JSON-RPC. Use a third-party API.');
        return [];
    }

    /**
     * Fetch the details of a specific transaction.
     * @param {string} hash - The transaction hash.
     * @returns {Promise<object>} Transaction details.
     */
    async getTransactionDetails(hash) {
        const payload = {
            jsonrpc: '2.0',
            id: 1,
            method: 'eth_getTransactionByHash',
            params: [hash],
        };

        try {
            const response = await APIHandler.request({
                baseUrl: this.rpcUrl,
                endpoint: '',
                method: 'POST',
                body: payload,
            });

            return response.result || {};
        } catch (error) {
            console.error(`[Ethereum] Failed to fetch transaction details for hash ${hash}:`, error.message);
            throw error;
        }
    }
}

export default new Ethereum();
