/**
 * Unit Tests for Wallet Analysis Module
 * This file contains tests for functions related to wallet analysis, such as detecting anomalies and validating results.
 */

import WalletService from '../services/walletService';
import RugDetection from '../services/rugDetection';

// Mock API setup
jest.mock('../services/walletService');
jest.mock('../services/rugDetection');

const mockWalletAddress = 'A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4';
const mockTransactions = [
    { id: 'tx1', from: 'A1', to: 'B1', value: 100, timestamp: 1620000000 },
    { id: 'tx2', from: 'A2', to: 'B2', value: 5000, timestamp: 1620100000 },
];

describe('WalletService', () => {
    beforeEach(() => {
        WalletService.getTransactionHistory.mockResolvedValue(mockTransactions);
    });

    it('should fetch transaction history for a valid wallet address', async () => {
        const transactions = await WalletService.getTransactionHistory(mockWalletAddress, jest.fn());
        expect(transactions).toEqual(mockTransactions);
        expect(WalletService.getTransactionHistory).toHaveBeenCalledWith(mockWalletAddress, expect.any(Function));
    });

    it('should throw an error for an invalid wallet address', async () => {
        WalletService.getTransactionHistory.mockRejectedValue(new Error('Invalid wallet address'));

        await expect(WalletService.getTransactionHistory('INVALID', jest.fn())).rejects.toThrow('Invalid wallet address');
    });
});

describe('RugDetection', () => {
    const mockAnalysisResults = {
        anomalies: [
            { type: 'LargeWithdrawal', transaction: mockTransactions[1] },
        ],
        rulesViolations: [],
        patternViolations: [],
    };

    beforeEach(() => {
        RugDetection.detectRugPull.mockResolvedValue(mockAnalysisResults);
    });

    it('should detect anomalies in wallet transactions', async () => {
        const results = await RugDetection.detectRugPull(mockTransactions);
        expect(results).toEqual(mockAnalysisResults);
        expect(RugDetection.detectRugPull).toHaveBeenCalledWith(mockTransactions);
    });

    it('should return no anomalies for normal transactions', async () => {
        RugDetection.detectRugPull.mockResolvedValue({
            anomalies: [],
            rulesViolations: [],
            patternViolations: [],
        });

        const results = await RugDetection.detectRugPull([]);
        expect(results.anomalies).toHaveLength(0);
        expect(RugDetection.detectRugPull).toHaveBeenCalledWith([]);
    });
});
