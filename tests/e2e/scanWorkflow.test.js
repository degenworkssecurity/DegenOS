/**
 * Scan Workflow Tests
 * Tests for the end-to-end scanning workflow, including wallet validation,
 * fetching balances, transaction analysis, and anomaly detection.
 */

import WalletService from '../services/walletService';
import TransactionService from '../services/transactionService';
import AnomalyDetector from '../core/anomalyDetector';
import { jest } from '@jest/globals';

describe('Scan Workflow Tests', () => {
    beforeAll(() => {
        // Mock WalletService and TransactionService responses
        jest.spyOn(WalletService, 'getWalletDetails').mockResolvedValue({
            walletAddress: 'testWalletAddress',
            balance: 10, // Mock 10 SOL
            usdValue: 250, // Mock USD equivalent
        });

        jest.spyOn(TransactionService, 'fetchWalletTransactions').mockResolvedValue([
            {
                hash: 'txHash1',
                from: 'wallet1',
                to: 'wallet2',
                value: 5,
                timestamp: 1672525600,
            },
            {
                hash: 'txHash2',
                from: 'wallet2',
                to: 'wallet3',
                value: 1,
                timestamp: 1672528600,
            },
        ]);

        jest.spyOn(AnomalyDetector, 'detect').mockReturnValue([
            { type: 'high-value', transaction: 'txHash1', details: 'Transaction exceeds threshold.' },
        ]);
    });

    afterAll(() => {
        jest.restoreAllMocks(); // Clean up all mocks after tests
    });

    test('Fetch wallet details and balance', async () => {
        const walletDetails = await WalletService.getWalletDetails('testWalletAddress');
        expect(walletDetails).toMatchObject({
            walletAddress: 'testWalletAddress',
            balance: 10,
            usdValue: 250,
        });
    });

    test('Fetch and analyze transactions', async () => {
        const transactions = await TransactionService.fetchWalletTransactions('testWalletAddress');
        expect(transactions).toHaveLength(2);
        expect(transactions[0]).toMatchObject({
            hash: 'txHash1',
            from: 'wallet1',
            to: 'wallet2',
            value: 5,
        });
    });

    test('Detect anomalies in transactions', async () => {
        const transactions = await TransactionService.fetchWalletTransactions('testWalletAddress');
        const anomalies = AnomalyDetector.detect(transactions);
        expect(anomalies).toHaveLength(1);
        expect(anomalies[0]).toMatchObject({
            type: 'high-value',
            transaction: 'txHash1',
        });
    });

    test('Full scan workflow', async () => {
        const walletDetails = await WalletService.getWalletDetails('testWalletAddress');
        const transactions = await TransactionService.fetchWalletTransactions(walletDetails.walletAddress);
        const anomalies = AnomalyDetector.detect(transactions);

        expect(walletDetails).toMatchObject({
            walletAddress: 'testWalletAddress',
            balance: 10,
            usdValue: 250,
        });

        expect(transactions).toHaveLength(2);
        expect(anomalies).toHaveLength(1);
        expect(anomalies[0].type).toBe('high-value');
    });
});
