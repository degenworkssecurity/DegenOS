/**
 * UI Rendering Tests
 * Tests for rendering and interaction of UI components such as WalletInput, AlertMessage, and ResultDisplay.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WalletInput from '../components/WalletInput';
import AlertMessage from '../components/AlertMessage';
import ResultDisplay from '../components/ResultDisplay';

describe('UI Rendering Tests', () => {
    test('Renders WalletInput and handles user input', () => {
        const mockOnSubmit = jest.fn();

        render(<WalletInput onSubmit={mockOnSubmit} />);

        const inputElement = screen.getByPlaceholderText(/enter wallet address/i);
        const submitButton = screen.getByText(/scan wallet/i);

        // Ensure input and button are rendered
        expect(inputElement).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();

        // Simulate user input and submission
        fireEvent.change(inputElement, { target: { value: 'testWalletAddress' } });
        fireEvent.click(submitButton);

        expect(mockOnSubmit).toHaveBeenCalledWith('testWalletAddress');
    });

    test('Renders AlertMessage with different types', () => {
        const { rerender } = render(<AlertMessage type="info" message="This is an info message." />);
        expect(screen.getByText(/this is an info message/i)).toHaveClass('alert-info');

        rerender(<AlertMessage type="warning" message="This is a warning message." />);
        expect(screen.getByText(/this is a warning message/i)).toHaveClass('alert-warning');

        rerender(<AlertMessage type="error" message="This is an error message." />);
        expect(screen.getByText(/this is an error message/i)).toHaveClass('alert-error');

        rerender(<AlertMessage type="success" message="This is a success message." />);
        expect(screen.getByText(/this is a success message/i)).toHaveClass('alert-success');
    });

    test('Renders ResultDisplay with wallet details and transactions', () => {
        const mockData = {
            walletId: 'testWalletAddress',
            balance: '10.000000',
            usdValue: '250.00',
            transactions: [
                { index: 1, signature: 'tx1', slot: 123, blockTime: 1672525600 },
                { index: 2, signature: 'tx2', slot: 456, blockTime: 1672528600 },
            ],
        };

        render(<ResultDisplay data={mockData} />);

        // Ensure wallet details are displayed
        expect(screen.getByText(/wallet address/i)).toBeInTheDocument();
        expect(screen.getByText(/testWalletAddress/i)).toBeInTheDocument();
        expect(screen.getByText(/balance/i)).toBeInTheDocument();
        expect(screen.getByText(/10\.000000 sol/i)).toBeInTheDocument();
        expect(screen.getByText(/\$250\.00/i)).toBeInTheDocument();

        // Ensure transactions are displayed
        expect(screen.getByText(/transactions/i)).toBeInTheDocument();
        expect(screen.getByText(/tx1/i)).toBeInTheDocument();
        expect(screen.getByText(/slot: 123/i)).toBeInTheDocument();
        expect(screen.getByText(/tx2/i)).toBeInTheDocument();
        expect(screen.getByText(/slot: 456/i)).toBeInTheDocument();
    });

    test('Handles empty transaction list in ResultDisplay', () => {
        const mockData = {
            walletId: 'testWalletAddress',
            balance: '0.000000',
            usdValue: '0.00',
            transactions: [],
        };

        render(<ResultDisplay data={mockData} />);

        // Ensure wallet details are displayed
        expect(screen.getByText(/wallet address/i)).toBeInTheDocument();
        expect(screen.getByText(/testWalletAddress/i)).toBeInTheDocument();

        // Ensure empty transactions message is displayed
        expect(screen.getByText(/no recent transactions found/i)).toBeInTheDocument();
    });
});
