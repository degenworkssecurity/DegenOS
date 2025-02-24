/**
 * Binance API Module
 * Provides a centralized interface for interacting with Binance's public API.
 */

import APIHandler from '../core/apiHandler';

class BinanceAPI {
    constructor() {
        this.baseUrl = 'https://api.binance.com/api/v3';
    }

    /**
     * Fetch the current price of a trading pair.
     * @param {string} symbol - The trading pair symbol (e.g., 'BTCUSDT').
     * @returns {Promise<number>} The current price of the trading pair.
     */
    async getCurrentPrice(symbol) {
        try {
            const response = await APIHandler.request({
                baseUrl: this.baseUrl,
                endpoint: `/ticker/price`,
                method: 'GET',
                params: { symbol },
            });

            return parseFloat(response?.price) || 0;
        } catch (error) {
            console.error(`[BinanceAPI] Failed to fetch price for ${symbol}:`, error.message);
            throw error;
        }
    }

    /**
     * Fetch 24-hour statistics for a trading pair.
     * @param {string} symbol - The trading pair symbol (e.g., 'BTCUSDT').
     * @returns {Promise<object>} Statistics including volume, price change, etc.
     */
    async get24hrStats(symbol) {
        try {
            const response = await APIHandler.request({
                baseUrl: this.baseUrl,
                endpoint: `/ticker/24hr`,
                method: 'GET',
                params: { symbol },
            });

            return response || {};
        } catch (error) {
            console.error(`[BinanceAPI] Failed to fetch 24hr stats for ${symbol}:`, error.message);
            throw error;
        }
    }

    /**
     * Fetch order book data for a trading pair.
     * @param {string} symbol - The trading pair symbol (e.g., 'BTCUSDT').
     * @param {number} limit - The number of order book entries to fetch.
     * @returns {Promise<object>} Order book data including bids and asks.
     */
    async getOrderBook(symbol, limit = 100) {
        try {
            const response = await APIHandler.request({
                baseUrl: this.baseUrl,
                endpoint: `/depth`,
                method: 'GET',
                params: { symbol, limit },
            });

            return response || {};
        } catch (error) {
            console.error(`[BinanceAPI] Failed to fetch order book for ${symbol}:`, error.message);
            throw error;
        }
    }

    /**
     * Fetch historical trades for a trading pair.
     * @param {string} symbol - The trading pair symbol (e.g., 'BTCUSDT').
     * @param {number} limit - The number of historical trades to fetch.
     * @returns {Promise<object[]>} Array of historical trades.
     */
    async getHistoricalTrades(symbol, limit = 500) {
        try {
            const response = await APIHandler.request({
                baseUrl: this.baseUrl,
                endpoint: `/trades`,
                method: 'GET',
                params: { symbol, limit },
            });

            return response || [];
        } catch (error) {
            console.error(`[BinanceAPI] Failed to fetch historical trades for ${symbol}:`, error.message);
            throw error;
        }
    }
}

export default new BinanceAPI();
