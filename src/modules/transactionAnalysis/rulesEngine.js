// rulesEngine.js

/**
 * Rules Engine Module
 * Centralized engine for evaluating and enforcing custom business rules
 * on blockchain transactions and wallet activities.
 */

class RulesEngine {
    constructor() {
        this.rules = [];
    }

    /**
     * Add a new rule to the engine.
     * @param {string} name - The name of the rule.
     * @param {Function} condition - A function that takes a transaction and returns true if the rule is violated.
     * @param {string} severity - The severity of the rule violation ('low', 'medium', 'high').
     */
    addRule(name, condition, severity) {
        this.rules.push({ name, condition, severity });
    }

    /**
     * Evaluate all rules against a set of transactions.
     * @param {object[]} transactions - Array of transaction objects.
     * @returns {object[]} Array of rule violations.
     */
    evaluateRules(transactions) {
        const violations = [];

        transactions.forEach((transaction) => {
            this.rules.forEach((rule) => {
                if (rule.condition(transaction)) {
                    violations.push({
                        rule: rule.name,
                        severity: rule.severity,
                        transaction,
                    });
                }
            });
        });

        return violations;
    }
}

// Example usage of RulesEngine
const rulesEngine = new RulesEngine();

// Add a rule to detect high-value transactions
rulesEngine.addRule(
    'HighValueTransaction',
    (transaction) => transaction.value && transaction.value > 1000,
    'high'
);

// Add a rule to detect transactions to blacklisted addresses
rulesEngine.addRule(
    'BlacklistedAddress',
    (transaction) => ['0xBlacklist1', '0xBlacklist2'].includes(transaction.to),
    'medium'
);

export default rulesEngine;
