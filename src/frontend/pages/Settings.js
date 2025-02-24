/**
 * Settings Component
 * This component provides an interface for users to customize application settings,
 * such as API keys, thresholds, and display preferences.
 */

import React, { useState } from 'react';

const Settings = ({ onUpdateSettings }) => {
    const [settings, setSettings] = useState({
        apiKey: '',
        anomalyThreshold: 1000,
        displayTheme: 'light',
    });

    /**
     * Handle input changes for settings fields.
     * @param {Event} event - Input change event.
     */
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSettings((prevSettings) => ({
            ...prevSettings,
            [name]: name === 'anomalyThreshold' ? parseInt(value, 10) : value,
        }));
    };

    /**
     * Handle settings form submission.
     * @param {Event} event - Form submission event.
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdateSettings(settings);
    };

    return (
        <div className="settings">
            <h2>Application Settings</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="apiKey">API Key:</label>
                    <input
                        type="text"
                        id="apiKey"
                        name="apiKey"
                        value={settings.apiKey}
                        onChange={handleInputChange}
                        placeholder="Enter your API key"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="anomalyThreshold">Anomaly Threshold (SOL):</label>
                    <input
                        type="number"
                        id="anomalyThreshold"
                        name="anomalyThreshold"
                        value={settings.anomalyThreshold}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="displayTheme">Display Theme:</label>
                    <select
                        id="displayTheme"
                        name="displayTheme"
                        value={settings.displayTheme}
                        onChange={handleInputChange}
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>

                <button type="submit">Save Settings</button>
            </form>
        </div>
    );
};

export default Settings;
