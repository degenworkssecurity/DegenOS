/**
 * Result Display Component
 * This component renders the results of wallet analysis, including balance,
 * detected anomalies, and other relevant information.
 */

import React from 'react';

const ResultDisplay = ({ analysisResults }) => {
    if (!analysisResults) {
        return <p>No results to display. Please submit a wallet address.</p>;
    }

    const { balance, anomalies, rulesViolations, patternViolations, totalTransactions } = analysisResults;

    return (
        <div className="result-display">
            <h2>Analysis Results</h2>
            <div className="section">
                <h3>Balance:</h3>
                <p>{balance} SOL</p>
            </div>

            <div className="section">
                <h3>Total Transactions:</h3>
                <p>{totalTransactions}</p>
            </div>

            {anomalies.length > 0 && (
                <div className="section">
                    <h3>Anomalies Detected:</h3>
                    <ul>
                        {anomalies.map((anomaly, index) => (
                            <li key={index}>{anomaly.type}</li>
                        ))}
                    </ul>
                </div>
            )}

            {rulesViolations.length > 0 && (
                <div className="section">
                    <h3>Rules Violations:</h3>
                    <ul>
                        {rulesViolations.map((violation, index) => (
                            <li key={index}>{`${violation.rule} - Severity: ${violation.severity}`}</li>
                        ))}
                    </ul>
                </div>
            )}

            {patternViolations.length > 0 && (
                <div className="section">
                    <h3>Suspicious Patterns:</h3>
                    <ul>
                        {patternViolations.map((pattern, index) => (
                            <li key={index}>
                                {pattern.type} - {pattern.address || 'N/A'} ({pattern.percentage || 'N/A'}%)
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ResultDisplay;
