#!/bin/bash

# start.sh
# This script initializes and starts the Blockchain Analyzer application.
# It ensures all dependencies are installed, environment variables are set,
# and the application is started using PM2.

# ----------------------------
# Step 0: Error Handling
# ----------------------------
# Exit the script immediately if a command exits with a non-zero status
set -e

# ----------------------------
# Configuration Variables
# ----------------------------
APP_NAME="blockchain-analyzer"           # Name of the application
APP_DIR="/var/www/$APP_NAME"            # Directory where the application is deployed
NODE_ENV="production"                   # Environment in which the application is running
PM2_PROCESS_NAME="blockchain-analyzer"  # Name of the PM2 process for the application

# ----------------------------
# Step 1: Navigate to the Application Directory
# ----------------------------
echo ">>> Navigating to the application directory: $APP_DIR"
if [ -d "$APP_DIR" ]; then
    cd $APP_DIR
else
    echo ">>> ERROR: Application directory not found. Exiting."
    exit 1
fi

# ----------------------------
# Step 2: Check and Install Dependencies
# ----------------------------
echo ">>> Ensuring dependencies are installed..."
if [ -f "package.json" ]; then
    npm install --production  # Install only production dependencies
else
    echo ">>> ERROR: package.json not found in $APP_DIR. Exiting."
    exit 1
fi

# ----------------------------
# Step 3: Set Environment Variables
# ----------------------------
echo ">>> Setting environment variables..."
export NODE_ENV=$NODE_ENV
echo ">>> NODE_ENV is set to $NODE_ENV"

# ----------------------------
# Step 4: Start the Application Using PM2
# ----------------------------
echo ">>> Starting the application with PM2..."
if pm2 list | grep -q $PM2_PROCESS_NAME; then
    echo ">>> Application is already running. Restarting the process..."
    pm2 restart $PM2_PROCESS_NAME  # Restart the application if already running
else
    echo ">>> Starting the application for the first time..."
    pm2 start $APP_DIR/app.js --name $PM2_PROCESS_NAME  # Start the application
fi

# ----------------------------
# Step 5: Display PM2 Process List
# ----------------------------
echo ">>> Displaying the PM2 process list for verification..."
pm2 list

# ----------------------------
# Step 6: Success Message
# ----------------------------
echo ">>> Application started successfully! Access logs using 'pm2 logs $PM2_PROCESS_NAME'."
