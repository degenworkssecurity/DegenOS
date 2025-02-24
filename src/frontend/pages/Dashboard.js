/**
 * Dashboard Component
 * The main component that combines WalletInput, AlertMessage, and ResultDisplay
 * to create a cohesive interface for wallet analysis.
 */

import React, { useState } from 'react';
import WalletInput from './WalletInput';
import ResultDisplay from './ResultDisplay';
import AlertMessage from './AlertMessage';

const Dashboard = () => {
    const [analysisResults, setAnalysisResults] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);

    /**
     * Handle wallet submission and trigger analysis.
     * @param {string} walletAddress - The wallet address submitted by the user.
     */
    const handleWalletSubmit = async (walletAddress) => {
        setAlertMessage({ message: 'Analyzing wallet, please wait...', severity: 'info' });

        try {
            const response = await fetch('/api/analyze-wallet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ walletAddress }),
            });

            if (!response.ok) {
                throw new Error('Failed to analyze wallet.');
            }

            const results = await response.json();
            setAnalysisResults(results);

            if (results.anomalies.length > 0 || results.rulesViolations.length > 0 || results.patternViolations.length > 0) {
                setAlertMessage({ message: 'Anomalies detected in wallet analysis.', severity: 'warning' });
            } else {
                setAlertMessage({ message: 'Wallet analysis completed successfully. No issues detected.', severity: 'success' });
            }
        } catch (error) {
            setAlertMessage({ message: error.message, severity: 'error' });
            setAnalysisResults(null);
        }
    };

    return (
        <div className="dashboard">
            <h1>Blockchain Wallet Analysis</h1>
            <WalletInput onSubmit={handleWalletSubmit} />

            {alertMessage && <AlertMessage message={alertMessage.message} severity={alertMessage.severity} />}

            {analysisResults && <ResultDisplay analysisResults={analysisResults} />}
        </div>
    );
};

export default Dashboard;
