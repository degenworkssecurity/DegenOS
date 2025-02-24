/**
 * Unit Tests for Transaction Flow
 * This file contains tests to verify the end-to-end flow of submitting and processing transactions.
 */

import TransactionService from '../services/transactionService';
import WalletService from '../services/walletService';
import BlockchainUtils from '../core/blockchain';

jest.mock('../services/transactionService');
jest.mock('../services/walletService');
jest.mock('../core/blockchain');

describe('Transaction Flow', () => {
    const mockTransaction = {
        hash: 'A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4',
        from: 'WalletA',
        to: 'WalletB',
        value: 100,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should submit a valid transaction and return a success response', async () => {
        const mockApiCall = jest.fn().mockResolvedValue({ success: true });
        TransactionService.submitTransaction.mockResolvedValue({ success: true });

        const response = await TransactionService.submitTransaction(mockTransaction, mockApiCall);

        expect(response).toEqual({ success: true });
        expect(TransactionService.submitTransaction).toHaveBeenCalledWith(mockTransaction, mockApiCall);
    });

    it('should throw an error when submitting an invalid transaction', async () => {
        const invalidTransaction = { ...mockTransaction, hash: 'INVALID' };
        const mockApiCall = jest.fn();

        TransactionService.submitTransaction.mockImplementation(() => {
            throw new Error('Invalid transaction hash.');
        });

        await expect(TransactionService.submitTransaction(invalidTransaction, mockApiCall)).rejects.toThrow(
            'Invalid transaction hash.'
        );
    });

    it('should fetch transaction details successfully', async () => {
        const mockApiCall = jest.fn().mockResolvedValue(mockTransaction);
        TransactionService.fetchTransactionDetails.mockResolvedValue(mockTransaction);

        const transactionDetails = await TransactionService.fetchTransactionDetails(mockTransaction.hash, mockApiCall);

        expect(transactionDetails).toEqual(mockTransaction);
        expect(TransactionService.fetchTransactionDetails).toHaveBeenCalledWith(mockTransaction.hash, mockApiCall);
    });

    it('should monitor transaction status until confirmed', async () => {
        const mockApiCall = jest
            .fn()
            .mockResolvedValueOnce({ confirmed: false, failed: false })
            .mockResolvedValueOnce({ confirmed: true, failed: false });

        const result = await TransactionService.monitorTransactionStatus(
            mockTransaction.hash,
            mockApiCall,
            1000 // Short polling interval for testing
        );

        expect(result).toEqual({ confirmed: true, failed: false });
        expect(mockApiCall).toHaveBeenCalledTimes(2);
    });

    it('should calculate the total value of transactions', () => {
        const transactions = [
            { id: 'tx1', value: 50 },
            { id: 'tx2', value: 150 },
        ];

        const totalValue = WalletService.calculateTotalValue(transactions);
        expect(totalValue).toEqual(200);
    });
});
