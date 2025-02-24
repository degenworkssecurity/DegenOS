/**
 * Anomaly Detector Module
 * Uses predefined rules and thresholds to identify suspicious activities
 * in wallet transactions.
 */

class AnomalyDetector {
    constructor() {
        this.rules = {
            highValueTransaction: 1000, // Threshold for high-value transactions in native currency
            repeatedAddresses: 5, // Threshold for repeated interactions with the same address
        };
    }

    /**
     * Analyze transactions for anomalies.
     * @param {object[]} transactions - Array of transaction objects.
     * @returns {object} Analysis results including detected anomalies.
     */
    analyzeTransactions(transactions) {
        const anomalies = [];
        const addressCounts = {};

        transactions.forEach((tx) => {
            const value = tx.value || 0;
            const address = tx.to || 'unknown';

            // Check for high-value transactions
            if (value >= this.rules.highValueTransaction) {
                anomalies.push({
                    type: 'HighValueTransaction',
                    transaction: tx,
                });
            }

            // Track repeated interactions
            addressCounts[address] = (addressCounts[address] || 0) + 1;
            if (addressCounts[address] === this.rules.repeatedAddresses) {
                anomalies.push({
                    type: 'RepeatedInteraction',
                    address,
                    count: addressCounts[address],
                });
            }
        });

        return {
            anomalies,
            totalTransactions: transactions.length,
        };
    }
}

export default new AnomalyDetector();
