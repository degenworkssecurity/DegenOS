/**
 * DexScreener API Module
 * Provides an interface for fetching data from DexScreener, including
 * token trading pairs, liquidity, and trade volumes.
 */

import APIHandler from '../core/apiHandler';

class DexScreenerAPI {
    constructor() {
        this.baseUrl = 'https://api.dexscreener.com';
    }

    /**
     * Fetch trading pair data for a given token address.
     * @param {string} tokenAddress - The address of the token.
     * @returns {Promise<object>} Trading pair data including liquidity and volume.
     */
    async getTradingPairs(tokenAddress) {
        try {
            const response = await APIHandler.request({
                baseUrl: this.baseUrl,
                endpoint: `/latest/dex/tokens/${tokenAddress}`,
                method: 'GET',
            });

            return response?.pairs || [];
        } catch (error) {
            console.error(`[DexScreenerAPI] Failed to fetch trading pairs for token ${tokenAddress}:`, error.message);
            throw error;
        }
    }

    /**
     * Fetch specific pair data by pair address.
     * @param {string} pairAddress - The address of the trading pair.
     * @returns {Promise<object>} Pair data including price, liquidity, and volume.
     */
    async getPairData(pairAddress) {
        try {
            const response = await APIHandler.request({
                baseUrl: this.baseUrl,
                endpoint: `/latest/dex/pairs/${pairAddress}`,
                method: 'GET',
            });

            return response || {};
        } catch (error) {
            console.error(`[DexScreenerAPI] Failed to fetch pair data for ${pairAddress}:`, error.message);
            throw error;
        }
    }

    /**
     * Fetch trending pairs on DexScreener.
     * @returns {Promise<object[]>} Array of trending pairs.
     */
    async getTrendingPairs() {
        try {
            const response = await APIHandler.request({
                baseUrl: this.baseUrl,
                endpoint: `/latest/dex/trending`,
                method: 'GET',
            });

            return response?.pairs || [];
        } catch (error) {
            console.error('[DexScreenerAPI] Failed to fetch trending pairs:', error.message);
            throw error;
        }
    }
}

export default new DexScreenerAPI();
