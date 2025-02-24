/**
 * Entry Point of the Application
 * This file renders the root React component into the DOM.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import ScanPage from './components/ScanPage';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <ScanPage />
    </React.StrictMode>
);
