/**
 * Tests for Blockchain Flow
 * End-to-End tests to validate the interaction with blockchain modules,
 * including fetching balances, transactions, and general network data.
 */

import BlockchainService from '../services/blockchainService';
import { mockAPIHandler } from '../core/apiHandler';
import { jest } from '@jest/globals';

describe('Blockchain Flow Tests', () => {
    beforeAll(() => {
        // Mock API handler if necessary
        jest.spyOn(mockAPIHandler, 'request').mockImplementation(async (config) => {
            if (config.endpoint.includes('/balance')) {
                return { balance: '1000000000' }; // Mock 10 SOL in lamports
            }
            if (config.endpoint.includes('/transactions')) {
                return [
                    {
                        hash: 'sampleTxHash',
                        from: 'wallet1',
                        to: 'wallet2',
                        value: 1000,
                        timestamp: 1672525600,
                    },
                ]; // Mock transaction data
            }
            return {};
        });
    });

    afterAll(() => {
        jest.restoreAllMocks(); // Clean up mocks
    });

    test('Fetch wallet balance', async () => {
        const balance = await BlockchainService.getWalletBalance('testWalletAddress', 'solana');
        expect(balance).toBe(10); // Assert balance in SOL
    });

    test('Fetch transactions for a wallet', async () => {
        const transactions = await BlockchainService.getWalletTransactions('testWalletAddress', 'solana');
        expect(transactions).toHaveLength(1); // Assert single transaction
        expect(transactions[0]).toMatchObject({
            hash: 'sampleTxHash',
            from: 'wallet1',
            to: 'wallet2',
            value: 1000,
        });
    });

    test('Validate blockchain network details', async () => {
        const networkDetails = await BlockchainService.getNetworkDetails('solana');
        expect(networkDetails).toHaveProperty('latestBlock');
        expect(networkDetails.latestBlock).toBeGreaterThan(0);
    });

    test('Submit and monitor a transaction', async () => {
        const mockTransaction = { hash: 'sampleTxHash', from: 'wallet1', to: 'wallet2', value: 1000 };
        const status = await BlockchainService.submitAndMonitorTransaction(mockTransaction, 'solana');
        expect(status).toMatchObject({
            confirmed: true,
            hash: 'sampleTxHash',
        });
    });
});
