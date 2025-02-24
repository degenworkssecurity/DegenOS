/**
 * Binance Smart Chain API Module
 * Provides a centralized interface for interacting with the Binance Smart Chain (BSC).
 */

import config from '../config';
import APIHandler from '../core/apiHandler';

class BinanceSmartChainAPI {
    constructor() {
        this.rpcUrl = config.blockchains.bsc.rpcUrl;
    }

    /**
     * Fetch the balance of a wallet.
     * @param {string} walletAddress - The Binance Smart Chain wallet address.
     * @returns {Promise<number>} Balance in BNB.
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
            return wei / 1e18; // Convert Wei to BNB
        } catch (error) {
            console.error(`[BinanceSmartChainAPI] Failed to fetch balance for wallet ${walletAddress}:`, error.message);
            throw error;
        }
    }

    /**
     * Fetch transaction details by hash.
     * @param {string} hash - The transaction hash.
     * @returns {Promise<object>} Transaction details.
     */
    async getTransaction(hash) {
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
            console.error(`[BinanceSmartChainAPI] Failed to fetch transaction ${hash}:`, error.message);
            throw error;
        }
    }

    /**
     * Fetch transaction count for a wallet.
     * @param {string} walletAddress - The Binance Smart Chain wallet address.
     * @returns {Promise<number>} Transaction count.
     */
    async getTransactionCount(walletAddress) {
        const payload = {
            jsonrpc: '2.0',
            id: 1,
            method: 'eth_getTransactionCount',
            params: [walletAddress, 'latest'],
        };

        try {
            const response = await APIHandler.request({
                baseUrl: this.rpcUrl,
                endpoint: '',
                method: 'POST',
                body: payload,
            });

            return parseInt(response.result, 16) || 0;
        } catch (error) {
            console.error(`[BinanceSmartChainAPI] Failed to fetch transaction count for wallet ${walletAddress}:`, error.message);
            throw error;
        }
    }

    /**
     * Fetch gas price from the Binance Smart Chain network.
     * @returns {Promise<number>} Gas price in Wei.
     */
    async getGasPrice() {
        const payload = {
            jsonrpc: '2.0',
            id: 1,
            method: 'eth_gasPrice',
            params: [],
        };

        try {
            const response = await APIHandler.request({
                baseUrl: this.rpcUrl,
                endpoint: '',
                method: 'POST',
                body: payload,
            });

            return parseInt(response.result, 16) || 0;
        } catch (error) {
            console.error('[BinanceSmartChainAPI] Failed to fetch gas price:', error.message);
            throw error;
        }
    }
}

export default new BinanceSmartChainAPI();
