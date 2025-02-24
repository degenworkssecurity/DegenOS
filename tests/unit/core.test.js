/**
 * Unit Tests for Core Utility Modules
 * This file contains unit tests for core functionalities such as APIHandler and other utilities.
 */

import APIHandler from '../core/apiHandler';
import WalletUtils from '../core/wallet';

// Mock API setup
const mockApiResponse = { success: true, data: 'Test Data' };

jest.mock('../core/apiHandler', () => ({
    request: jest.fn(() => Promise.resolve(mockApiResponse)),
}));

describe('APIHandler', () => {
    it('should make an API request and return the response', async () => {
        const response = await APIHandler.request({
            baseUrl: 'https://api.example.com',
            endpoint: '/test',
            method: 'GET',
        });

        expect(response).toEqual(mockApiResponse);
        expect(APIHandler.request).toHaveBeenCalledWith({
            baseUrl: 'https://api.example.com',
            endpoint: '/test',
            method: 'GET',
        });
    });
});

describe('WalletUtils', () => {
    it('should validate a correct wallet address', () => {
        const validAddress = 'A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4';
        expect(WalletUtils.validateAddress(validAddress)).toBe(true);
    });

    it('should invalidate an incorrect wallet address', () => {
        const invalidAddress = 'INVALID_ADDRESS';
        expect(WalletUtils.validateAddress(invalidAddress)).toBe(false);
    });

    it('should format a long wallet address correctly', () => {
        const address = 'A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4';
        const formatted = WalletUtils.formatAddress(address);
        expect(formatted).toBe('A1B2C3...2W3X4');
    });
});
