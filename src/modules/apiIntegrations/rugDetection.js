/**
 * Rug Detection Module
 * This module provides functionality to analyze wallet transactions
 * and detect potential rug-pull activities based on predefined patterns.
 */

import AnomalyDetector from './anomalyDetector';
import RulesEngine from './rulesEngine';

class RugDetection {
    constructor() {
        this.suspiciousPatterns = {
            largeWithdrawals: 100000, // Threshold for large withdrawals in native currency
            singleAddressDrain: 90, // Percentage of funds sent to a single address
        };
    }

    /**
     * Analyze wallet transactions for rug-pull indicators.
     * @param {object[]} transactions - Array of transaction objects.
     * @returns {Promise<object>} Analysis results including detected anomalies.
     */
    async detectRugPull(transactions) {
        try {
            const anomalies = AnomalyDetector.analyzeTransactions(transactions);
            const rulesViolations = RulesEngine.evaluateRules(transactions);

            const patternViolations = this.detectSuspiciousPatterns(transactions);

            return {
                anomalies: anomalies.anomalies,
                rulesViolations,
                patternViolations,
                totalTransactions: transactions.length,
            };
        } catch (error) {
            console.error('[RugDetection] Error during rug-pull analysis:', error.message);
            throw error;
        }
    }

    /**
     * Detect suspicious patterns in transactions.
     * @param {object[]} transactions - Array of transaction objects.
     * @returns {object[]} Detected suspicious patterns.
     */
    detectSuspiciousPatterns(transactions) {
        const violations = [];

        transactions.forEach((tx) => {
            // Check for large withdrawals
            if (tx.value >= this.suspiciousPatterns.largeWithdrawals) {
                violations.push({
                    type: 'LargeWithdrawal',
                    transaction: tx,
                });
            }
        });

        // Check for single address draining funds
        const addressTotals = transactions.reduce((acc, tx) => {
            const address = tx.to || 'unknown';
            acc[address] = (acc[address] || 0) + (tx.value || 0);
            return acc;
        }, {});

        const totalFunds = transactions.reduce((sum, tx) => sum + (tx.value || 0), 0);

        Object.entries(addressTotals).forEach(([address, amount]) => {
            if ((amount / totalFunds) * 100 >= this.suspiciousPatterns.singleAddressDrain) {
                violations.push({
                    type: 'SingleAddressDrain',
                    address,
                    percentage: ((amount / totalFunds) * 100).toFixed(2),
                });
            }
        });

        return violations;
    }
}

export default new RugDetection();
