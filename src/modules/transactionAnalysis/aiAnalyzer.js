/**
 * AI Analyzer Module
 * Uses AI to analyze transaction data for patterns, anomalies, and potential risks.
 */

import config from '../config';
import APIHandler from '../core/apiHandler';

class AIAnalyzer {
    constructor() {
        this.apiKey = config.ai.openai.apiKey;
        this.apiUrl = config.ai.openai.baseUrl;
    }

    /**
     * Analyze transactions using AI for patterns and anomalies.
     * @param {object[]} transactions - Array of transaction objects.
     * @returns {Promise<object>} AI analysis results.
     */
    async analyzeTransactions(transactions) {
        const payload = {
            model: 'gpt-4',
            prompt: this.generatePrompt(transactions),
            max_tokens: 500,
        };

        try {
            const response = await APIHandler.request({
                baseUrl: this.apiUrl,
                endpoint: '/completions',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                },
                body: payload,
            });

            return {
                success: true,
                analysis: response.choices[0]?.text || 'No analysis available.',
            };
        } catch (error) {
            console.error('[AIAnalyzer] Failed to analyze transactions:', error.message);
            return {
                success: false,
                error: error.message,
            };
        }
    }

    /**
     * Generate a prompt for the AI model based on transactions.
     * @param {object[]} transactions - Array of transaction objects.
     * @returns {string} Generated prompt for AI analysis.
     */
    generatePrompt(transactions) {
        const summary = transactions
            .map((tx, index) => `Transaction ${index + 1}: Value - ${tx.value || 0}, To - ${tx.to || 'unknown'}, Type - ${tx.type || 'N/A'}`)
            .join('\n');

        return `Analyze the following transactions for anomalies, risks, and patterns:
${summary}`;
    }
}

export default new AIAnalyzer();
