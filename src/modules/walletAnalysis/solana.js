/**
 * Module for interacting with the Solana blockchain.
 * Provides utilities for fetching wallet data, transaction history, and more.
 */

import config from '../config';
import APIHandler from '../core/apiHandler';

class Solana {
    constructor() {
        this.rpcUrl = config.blockchains.solana.rpcUrl;
        this.network = config.blockchains.solana.network;
    }

    /**
     * Fetch the balance of a wallet in SOL.
     * @param {string} walletAddress - The Solana wallet address.
     * @returns {Promise<number>} Balance in SOL.
     */
    async getBalance(walletAddress) {
        const payload = {
            jsonrpc: '2.0',
            id: 1,
            method: 'getBalance',
            params: [walletAddress],
        };

        try {
            const response = await APIHandler.request({
                baseUrl: this.rpcUrl,
                endpoint: '',
                method: 'POST',
                body: payload,
            });

            const lamports = response.result?.value || 0;
            return lamports / 1e9; // Convert lamports to SOL
        } catch (error) {
            console.error(`[Solana] Failed to fetch balance for wallet ${walletAddress}:`, error.message);
            throw error;
        }
    }

    /**
     * Fetch the recent transactions for a wallet.
     * @param {string} walletAddress - The Solana wallet address.
     * @param {number} limit - Number of transactions to fetch.
     * @returns {Promise<object[]>} Array of transaction details.
     */
    async getTransactions(walletAddress, limit = 10) {
        const payload = {
            jsonrpc: '2.0',
            id: 1,
            method: 'getSignaturesForAddress',
            params: [walletAddress, { limit }],
        };

        try {
            const response = await APIHandler.request({
                baseUrl: this.rpcUrl,
                endpoint: '',
                method: 'POST',
                body: payload,
            });

            return response.result || [];
        } catch (error) {
            console.error(`[Solana] Failed to fetch transactions for wallet ${walletAddress}:`, error.message);
            throw error;
        }
    }

    /**
     * Fetch the details of a specific transaction.
     * @param {string} signature - The transaction signature.
     * @returns {Promise<object>} Transaction details.
     */
    async getTransactionDetails(signature) {
        const payload = {
            jsonrpc: '2.0',
            id: 1,
            method: 'getTransaction',
            params: [signature, { encoding: 'json' }],
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
            console.error(`[Solana] Failed to fetch transaction details for signature ${signature}:`, error.message);
            throw error;
        }
    }
}

export default new Solana();
