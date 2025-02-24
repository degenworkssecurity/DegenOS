/**
 * Scan Page Component
 * This component serves as a dedicated page for conducting wallet scans and displaying results.
 */

import React from 'react';
import Dashboard from './Dashboard';

const ScanPage = () => {
    return (
        <div className="scan-page">
            <header className="header">
                <h1>0xBLOCK Wallet Scanner</h1>
                <p>Analyze blockchain wallets for anomalies, patterns, and potential risks.</p>
            </header>

            <main className="main-content">
                <Dashboard />
            </main>

            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} 0xBLOCK Framework. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default ScanPage;
