// coingecko.js

/**
 * CoinGecko API Module
 * Provides a centralized interface for interacting with the CoinGecko API
 * to fetch token prices, market data, and other cryptocurrency-related information.
 */

import APIHandler from '../core/apiHandler';

class CoinGeckoAPI {
    constructor() {
        this.baseUrl = 'https://api.coingecko.com/api/v3';
    }

    /**
     * Fetch the current price of a cryptocurrency.
     * @param {string} id - The CoinGecko ID of the cryptocurrency (e.g., 'bitcoin').
     * @param {string} currency - The target currency for price conversion (e.g., 'usd').
     * @returns {Promise<number>} The current price in the target currency.
     */
    async getCurrentPrice(id, currency = 'usd') {
        try {
            const response = await APIHandler.request({
                baseUrl: this.baseUrl,
                endpoint: `/simple/price`,
                method: 'GET',
                params: {
                    ids: id,
                    vs_currencies: currency,
                },
            });

            return response[id]?.[currency] || 0;
        } catch (error) {
            console.error(`[CoinGeckoAPI] Failed to fetch price for ${id} in ${currency}:`, error.message);
            throw error;
        }
    }

    /**
     * Fetch market data for a cryptocurrency.
     * @param {string} id - The CoinGecko ID of the cryptocurrency (e.g., 'bitcoin').
     * @returns {Promise<object>} Market data including volume, market cap, etc.
     */
    async getMarketData(id) {
        try {
            const response = await APIHandler.request({
                baseUrl: this.baseUrl,
                endpoint: `/coins/markets`,
                method: 'GET',
                params: {
                    vs_currency: 'usd',
                    ids: id,
                },
            });

            return response[0] || {};
        } catch (error) {
            console.error(`[CoinGeckoAPI] Failed to fetch market data for ${id}:`, error.message);
            throw error;
        }
    }

    /**
     * Fetch historical price data for a cryptocurrency.
     * @param {string} id - The CoinGecko ID of the cryptocurrency (e.g., 'bitcoin').
     * @param {string} date - The date for historical data in 'dd-mm-yyyy' format.
     * @returns {Promise<object>} Historical price data.
     */
    async getHistoricalData(id, date) {
        try {
            const response = await APIHandler.request({
                baseUrl: this.baseUrl,
                endpoint: `/coins/${id}/history`,
                method: 'GET',
                params: {
                    date,
                    localization: false,
                },
            });

            return response?.market_data || {};
        } catch (error) {
            console.error(`[CoinGeckoAPI] Failed to fetch historical data for ${id} on ${date}:`, error.message);
            throw error;
        }
    }

    /**
     * Fetch a list of all supported coins on CoinGecko.
     * @returns {Promise<object[]>} Array of supported coins with their IDs and symbols.
     */
    async getSupportedCoins() {
        try {
            const response = await APIHandler.request({
                baseUrl: this.baseUrl,
                endpoint: `/coins/list`,
                method: 'GET',
            });

            return response || [];
        } catch (error) {
            console.error('[CoinGeckoAPI] Failed to fetch supported coins:', error.message);
            throw error;
        }
    }
}

export default new CoinGeckoAPI();
