/**
 * Global configuration file for the framework.
 * This file centralizes configuration settings for APIs, blockchain networks,
 * and other global constants used throughout the project.
 */

const config = {
    environment: process.env.NODE_ENV || 'development',

    // API configurations
    apis: {
        coingecko: {
            baseUrl: 'https://api.coingecko.com/api/v3',
            endpoints: {
                price: '/simple/price',
            },
        },
        dexscreener: {
            baseUrl: 'https://api.dexscreener.io/latest/dex',
        },
        binance: {
            baseUrl: 'https://api.binance.com/api/v3',
            endpoints: {
                ticker: '/ticker/price',
            },
        },
    },

    // Blockchain configurations
    blockchains: {
        solana: {
            rpcUrl: 'https://api.mainnet-beta.solana.com',
            network: 'mainnet-beta',
        },
        ethereum: {
            rpcUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
            network: 'mainnet',
        },
        bsc: {
            rpcUrl: 'https://bsc-dataseed.binance.org',
            network: 'mainnet',
        },
    },

    // General settings
    general: {
        requestTimeout: 10000, // 10 seconds
        logLevel: 'info', // Options: 'debug', 'info', 'warn', 'error'
    },

    // AI settings
    ai: {
        openai: {
            apiKey: process.env.OPENAI_API_KEY || 'your-default-api-key',
            baseUrl: 'https://api.openai.com/v1',
        },
    },
};

export default config;
