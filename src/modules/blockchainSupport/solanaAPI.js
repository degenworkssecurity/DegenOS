/**
 * Solana API Module
 * Provides a centralized interface for interacting with the Solana blockchain.
 */

import config from '../config';
import APIHandler from '../core/apiHandler';

class SolanaAPI {
    constructor() {
        this.rpcUrl = config.blockchains.solana.rpcUrl;
    }

    /**
     * Fetch account information from the Solana blockchain.
     * @param {string} walletAddress - The Solana wallet address.
     * @returns {Promise<object>} Account information.
     */
    async getAccountInfo(walletAddress) {
        const payload = {
            jsonrpc: '2.0',
            id: 1,
            method: 'getAccountInfo',
            params: [walletAddress, { encoding: 'jsonParsed' }],
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
            console.error(`[SolanaAPI] Failed to fetch account info for wallet ${walletAddress}:`, error.message);
            throw error;
        }
    }

    /**
     * Fetch token balances for a wallet.
     * @param {string} walletAddress - The Solana wallet address.
     * @returns {Promise<object[]>} Array of token balances.
     */
    async getTokenBalances(walletAddress) {
        const payload = {
            jsonrpc: '2.0',
            id: 1,
            method: 'getTokenAccountsByOwner',
            params: [
                walletAddress,
                { programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' },
                { encoding: 'jsonParsed' },
            ],
        };

        try {
            const response = await APIHandler.request({
                baseUrl: this.rpcUrl,
                endpoint: '',
                method: 'POST',
                body: payload,
            });

            return response.result?.value || [];
        } catch (error) {
            console.error(`[SolanaAPI] Failed to fetch token balances for wallet ${walletAddress}:`, error.message);
            throw error;
        }
    }

    /**
     * Fetch recent blockhash for transaction purposes.
     * @returns {Promise<string>} Recent blockhash.
     */
    async getRecentBlockhash() {
        const payload = {
            jsonrpc: '2.0',
            id: 1,
            method: 'getRecentBlockhash',
            params: [],
        };

        try {
            const response = await APIHandler.request({
                baseUrl: this.rpcUrl,
                endpoint: '',
                method: 'POST',
                body: payload,
            });

            return response.result?.value?.blockhash || '';
        } catch (error) {
            console.error('[SolanaAPI] Failed to fetch recent blockhash:', error.message);
            throw error;
        }
    }
}

export default new SolanaAPI();
