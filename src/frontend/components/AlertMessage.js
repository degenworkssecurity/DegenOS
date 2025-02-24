// AlertMessage.js
// Component for displaying alert messages dynamically in the UI.

import React from 'react';
import PropTypes from 'prop-types';
import './AlertMessage.css'; // Import CSS for styling

/**
 * AlertMessage Component
 * Displays an alert message with different severity levels.
 *
 * @param {string} type - Type of alert ('success', 'warning', 'error', 'info').
 * @param {string} message - The message to display.
 */
const AlertMessage = ({ type, message }) => {
    if (!message) return null; // Don't render anything if no message is provided

    // Define alert styles based on type
    const alertClasses = {
        success: 'alert-success',
        warning: 'alert-warning',
        error: 'alert-error',
        info: 'alert-info',
    };

    return (
        <div className={`alert-container ${alertClasses[type] || 'alert-info'}`}>
            <span className="alert-text">{message}</span>
        </div>
    );
};

// Define prop types for validation
AlertMessage.propTypes = {
    type: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
    message: PropTypes.string.isRequired,
};

export default AlertMessage;
