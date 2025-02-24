#!/bin/bash

# test.sh
# This script runs all tests for the Blockchain Analyzer application.
# It ensures dependencies are installed and then executes the test suite.

# ----------------------------
# Step 0: Error Handling
# ----------------------------
# Exit the script immediately if any command fails
set -e

# ----------------------------
# Configuration Variables
# ----------------------------
APP_DIR=$(pwd)               # The current working directory where the script is executed
TEST_COMMAND="npm test"      # Command to execute the test suite

# ----------------------------
# Step 1: Confirm Application Directory
# ----------------------------
echo ">>> Verifying the application directory..."
if [ -d "$APP_DIR" ]; then
    echo ">>> Application directory confirmed: $APP_DIR"
else
    echo ">>> ERROR: Application directory not found. Exiting."
    exit 1
fi

# ----------------------------
# Step 2: Install Dependencies
# ----------------------------
echo ">>> Checking and installing missing dependencies..."
if [ -f "package.json" ]; then
    npm install --no-audit     # Install dependencies without auditing for vulnerabilities
else
    echo ">>> ERROR: No package.json found in $APP_DIR. Exiting."
    exit 1
fi

# ----------------------------
# Step 3: Execute Test Suite
# ----------------------------
echo ">>> Running the test suite..."
if $TEST_COMMAND; then
    echo ">>> ✅ All tests passed successfully!"
else
    echo ">>> ❌ Tests failed. Please review the logs above for errors."
    exit 1                      # Exit with an error code if any test fails
fi

# ----------------------------
# Step 4: Completion Message
# ----------------------------
echo ">>> Test script execution completed. 🎉"
