/**
 * Universal Wallet Scanner Module
 * Provides an interface to scan wallets across multiple blockchains
 * for balances and transaction details.
 */

import Solana from './solana';
import Ethereum from './ethereum';
import Logger from '../core/logger';

class WalletScanner {
    constructor() {
        this.supportedChains = {
            solana: Solana,
            ethereum: Ethereum,
        };
    }

    /**
     * Scan a wallet and fetch balances and transactions.
     * @param {string} walletAddress - The wallet address to scan.
     * @param {string} chain - The blockchain to scan (e.g., 'solana', 'ethereum').
     * @param {number} transactionLimit - Number of transactions to fetch.
     * @returns {Promise<object>} Wallet details including balance and transactions.
     */
    async scanWallet(walletAddress, chain, transactionLimit = 10) {
        const blockchain = this.supportedChains[chain];

        if (!blockchain) {
            throw new Error(`Unsupported blockchain: ${chain}`);
        }

        try {
            Logger.info(`Scanning wallet: ${walletAddress} on chain: ${chain}`);

            const [balance, transactions] = await Promise.all([
                blockchain.getBalance(walletAddress),
                blockchain.getTransactions(walletAddress, transactionLimit),
            ]);

            return {
                chain,
                walletAddress,
                balance,
                transactions,
            };
        } catch (error) {
            Logger.error(`Failed to scan wallet ${walletAddress} on ${chain}: ${error.message}`);
            throw error;
        }
    }
}

export default new WalletScanner();
