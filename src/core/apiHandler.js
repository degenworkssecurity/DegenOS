/**
 * Centralized API handler for all external API requests.
 * Handles request execution, retries, and error handling.
 */

import config from './config';
import fetch from 'node-fetch';

class APIHandler {
    constructor() {
        this.timeout = config.general.requestTimeout;
    }

    async request({ baseUrl, endpoint, method = 'GET', headers = {}, body = null }) {
        const url = `${baseUrl}${endpoint}`;
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            timeout: this.timeout,
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} - ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Request to ${url} failed:`, error.message);
            throw error;
        }
    }

    async getPriceFromCoinGecko(ids, currency = 'usd') {
        const endpoint = `${config.apis.coingecko.endpoints.price}?ids=${ids}&vs_currencies=${currency}`;
        return await this.request({
            baseUrl: config.apis.coingecko.baseUrl,
            endpoint,
        });
    }

    async getDexScreenerData(pairAddress) {
        const endpoint = `/pair/${pairAddress}`;
        return await this.request({
            baseUrl: config.apis.dexscreener.baseUrl,
            endpoint,
        });
    }

    async getBinancePrice(symbol) {
        const endpoint = `${config.apis.binance.endpoints.ticker}?symbol=${symbol}`;
        return await this.request({
            baseUrl: config.apis.binance.baseUrl,
            endpoint,
        });
    }
}

export default new APIHandler();
