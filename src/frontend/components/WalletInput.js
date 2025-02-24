/**
 * Wallet Input Component
 * A reusable component for accepting and handling user wallet addresses.
 * Provides validation and a standardized interface for wallet interactions.
 */

import React, { useState } from 'react';

const WalletInput = ({ onSubmit }) => {
    const [walletAddress, setWalletAddress] = useState('');
    const [error, setError] = useState(null);

    /**
     * Handle wallet address input changes.
     * @param {Event} event - Input change event.
     */
    const handleInputChange = (event) => {
        setWalletAddress(event.target.value);
        setError(null); // Clear errors on new input
    };

    /**
     * Validate the wallet address.
     * @returns {boolean} True if the address is valid, false otherwise.
     */
    const validateAddress = () => {
        const isValid = /^[a-zA-Z0-9]{32,44}$/.test(walletAddress);
        if (!isValid) {
            setError('Invalid wallet address. Please check and try again.');
        }
        return isValid;
    };

    /**
     * Handle form submission.
     * @param {Event} event - Form submission event.
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateAddress()) {
            onSubmit(walletAddress);
            setWalletAddress(''); // Clear input after submission
        }
    };

    return (
        <div className="wallet-input">
            <form onSubmit={handleSubmit}>
                <label htmlFor="walletAddress">Enter Wallet Address:</label>
                <input
                    type="text"
                    id="walletAddress"
                    value={walletAddress}
                    onChange={handleInputChange}
                    placeholder="e.g., 3M..."
                />
                {error && <p className="error-text">{error}</p>}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default WalletInput;
