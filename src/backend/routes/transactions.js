/**
 * Transactions Utility Module
 * Provides helper methods for parsing, filtering, analyzing, and detecting duplicates in blockchain transactions.
 */

class TransactionsUtils {
    /**
     * Parse Transaction Data
     * Converts raw blockchain transaction data into a standardized format for easier readability and analysis.
     *
     * @param {object} rawTransaction - Raw transaction data received from the blockchain.
     * @returns {object} Parsed transaction details, including ID, sender, receiver, value, timestamp, and status.
     */
    static parseTransaction(rawTransaction) {
        const parsedTransaction = {
            id: rawTransaction.txId || 'Unknown', // Transaction ID
            from: rawTransaction.sender || 'Unknown', // Sender address
            to: rawTransaction.receiver || 'Unknown', // Receiver address
            value: rawTransaction.amount || 0, // Transaction amount
            timestamp: rawTransaction.timestamp
                ? new Date(rawTransaction.timestamp * 1000).toLocaleString()
                : 'Unknown', // Human-readable timestamp
            status: rawTransaction.status || 'Unknown', // Transaction status
        };

        console.log('[TransactionsUtils] Parsed transaction:', parsedTransaction);
        return parsedTransaction;
    }

    /**
     * Filter Transactions
     * Filters a list of transactions by a specific field and value.
     *
     * @param {object[]} transactions - Array of transaction objects to filter.
     * @param {string} field - Field to filter by (e.g., 'status', 'from').
     * @param {any} value - Value to filter for (e.g., 'completed', a specific address).
     * @returns {object[]} Transactions matching the specified field and value.
     */
    static filterTransactions(transactions, field, value) {
        const filteredTransactions = transactions.filter((tx) => tx[field] === value);
        console.log(
            `[TransactionsUtils] Filtered transactions by ${field}=${value}:`,
            filteredTransactions
        );
        return filteredTransactions;
    }

    /**
     * Calculate Total Transaction Value
     * Computes the total value of all transactions in a given set.
     *
     * @param {object[]} transactions - Array of transaction objects.
     * @returns {number} Sum of the `value` field from all transactions in the array.
     */
    static calculateTotalValue(transactions) {
        const totalValue = transactions.reduce(
            (total, tx) => total + (tx.value || 0),
            0 // Start with a total of 0
        );

        console.log(`[TransactionsUtils] Calculated total transaction value: ${totalValue}`);
        return totalValue;
    }

    /**
     * Find Duplicate Transactions
     * Identifies duplicate transactions in a dataset based on transaction IDs.
     *
     * @param {object[]} transactions - Array of transaction objects to analyze.
     * @returns {object[]} Array of duplicate transactions found in the dataset.
     */
    static findDuplicateTransactions(transactions) {
        const seenIds = new Set(); // Keeps track of unique transaction IDs
        const duplicates = []; // Stores duplicate transactions

        transactions.forEach((tx) => {
            if (seenIds.has(tx.id)) {
                duplicates.push(tx); // Add to duplicates if already seen
            } else {
                seenIds.add(tx.id); // Otherwise, mark as seen
            }
        });

        console.log('[TransactionsUtils] Found duplicate transactions:', duplicates);
        return duplicates;
    }
}

export default TransactionsUtils;
