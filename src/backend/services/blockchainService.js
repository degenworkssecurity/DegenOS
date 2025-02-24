/**
 * Blockchain Service Module
 * This module provides high-level operations for interacting with blockchain networks,
 * including fetching data, managing nodes, and executing smart contracts.
 */

import BlockchainUtils from './blockchain';

class BlockchainService {
    constructor(apiHandler) {
        this.apiHandler = apiHandler;
    }

    /**
     * Get the current block height of the blockchain.
     * @param {Function} apiCall - The blockchain-specific API call for fetching block height.
     * @returns {Promise<number>} The current block height.
     */
    async getCurrentBlockHeight(apiCall) {
        try {
            const blockHeight = await BlockchainUtils.getBlockHeight(apiCall);
            return blockHeight;
        } catch (error) {
            console.error('[BlockchainService] Failed to fetch current block height:', error.message);
            throw error;
        }
    }

    /**
     * Fetch details of a specific block.
     * @param {string|number} blockIdentifier - The block hash or block number.
     * @param {Function} apiCall - The blockchain-specific API call for fetching block details.
     * @returns {Promise<object>} The block details.
     */
    async fetchBlockDetails(blockIdentifier, apiCall) {
        try {
            const blockDetails = await BlockchainUtils.getBlockDetails(apiCall, blockIdentifier);
            return blockDetails;
        } catch (error) {
            console.error('[BlockchainService] Failed to fetch block details:', error.message);
            throw error;
        }
    }

    /**
     * Estimate gas fees for a transaction on the blockchain.
     * @param {object} transaction - The transaction data.
     * @param {Function} apiCall - The blockchain-specific API call for gas estimation.
     * @returns {Promise<number>} The estimated gas fee.
     */
    async estimateTransactionGas(transaction, apiCall) {
        try {
            const gasFee = await BlockchainUtils.estimateGas(apiCall, transaction);
            return gasFee;
        } catch (error) {
            console.error('[BlockchainService] Failed to estimate transaction gas:', error.message);
            throw error;
        }
    }

    /**
     * Validate the format and content of a transaction hash.
     * @param {string} transactionHash - The transaction hash to validate.
     * @returns {boolean} True if the hash is valid, otherwise false.
     */
    validateTransactionHash(transactionHash) {
        return BlockchainUtils.validateTransactionHash(transactionHash);
    }

    /**
     * Broadcast a signed transaction to the blockchain network.
     * @param {object} transaction - The signed transaction data.
     * @param {Function} apiCall - The blockchain-specific API call for broadcasting transactions.
     * @returns {Promise<object>} The result of the broadcast.
     */
    async broadcastTransaction(transaction, apiCall) {
        try {
            const result = await BlockchainUtils.broadcastTransaction(apiCall, transaction);
            return result;
        } catch (error) {
            console.error('[BlockchainService] Failed to broadcast transaction:', error.message);
            throw error;
        }
    }

    /**
     * Execute a smart contract function on the blockchain.
     * @param {string} contractAddress - The address of the smart contract.
     * @param {string} functionName - The name of the function to execute.
     * @param {Array} parameters - The parameters to pass to the function.
     * @param {Function} apiCall - The blockchain-specific API call for executing smart contracts.
     * @returns {Promise<object>} The result of the smart contract execution.
     */
    async executeSmartContract(contractAddress, functionName, parameters, apiCall) {
        try {
            const result = await apiCall(contractAddress, functionName, parameters);
            return result;
        } catch (error) {
            console.error('[BlockchainService] Failed to execute smart contract:', error.message);
            throw error;
        }
    }
}

export default BlockchainService;
