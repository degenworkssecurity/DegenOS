/**
 * Unit Tests for APIHandler Module
 * This file contains tests for the APIHandler module to ensure
 * proper request handling and error management.
 */

import APIHandler from '../core/apiHandler';

// Mock Fetch Setup
global.fetch = jest.fn();

describe('APIHandler', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should make a GET request and return the response', async () => {
        const mockResponse = { success: true, data: 'Test Data' };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });

        const response = await APIHandler.request({
            baseUrl: 'https://api.example.com',
            endpoint: '/test',
            method: 'GET',
        });

        expect(fetch).toHaveBeenCalledWith('https://api.example.com/test', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        expect(response).toEqual(mockResponse);
    });

    it('should make a POST request with body and return the response', async () => {
        const mockResponse = { success: true, data: 'Posted Data' };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });

        const response = await APIHandler.request({
            baseUrl: 'https://api.example.com',
            endpoint: '/post',
            method: 'POST',
            body: { key: 'value' },
        });

        expect(fetch).toHaveBeenCalledWith('https://api.example.com/post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key: 'value' }),
        });

        expect(response).toEqual(mockResponse);
    });

    it('should throw an error if the response is not ok', async () => {
        fetch.mockResolvedValueOnce({ ok: false, status: 404, statusText: 'Not Found' });

        await expect(
            APIHandler.request({
                baseUrl: 'https://api.example.com',
                endpoint: '/not-found',
                method: 'GET',
            })
        ).rejects.toThrow('Request failed with status 404: Not Found');

        expect(fetch).toHaveBeenCalledWith('https://api.example.com/not-found', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
    });

    it('should handle network errors gracefully', async () => {
        fetch.mockRejectedValueOnce(new Error('Network Error'));

        await expect(
            APIHandler.request({
                baseUrl: 'https://api.example.com',
                endpoint: '/error',
                method: 'GET',
            })
        ).rejects.toThrow('Network Error');

        expect(fetch).toHaveBeenCalledWith('https://api.example.com/error', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
    });
});
