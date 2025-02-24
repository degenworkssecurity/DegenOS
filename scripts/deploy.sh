#!/bin/bash

# deploy.sh
# This script automates the deployment process for the Blockchain Analyzer application.
# It includes steps to pull the latest code, install dependencies, build the application,
# set environment variables, and restart the service using PM2.

# Stop execution immediately if any command fails
set -e

# --------------------------
# Configuration Variables
# --------------------------

# Application-specific settings
APP_NAME="blockchain-analyzer"              # Name of the application
APP_DIR="/var/www/$APP_NAME"               # Directory where the application is deployed
REPO_URL="git@github.com:yourusername/yourrepository.git" # Git repository URL
BRANCH="main"                              # Branch to pull the latest code from
NODE_ENV="production"                      # Environment variable for the Node.js application
PM2_PROCESS_NAME="blockchain-analyzer"     # Name of the PM2 process for this application

# --------------------------
# Step 1: Fetch Latest Code
# --------------------------

echo ">>> Pulling the latest code from branch '$BRANCH'..."
if [ ! -d "$APP_DIR" ]; then
    echo ">>> Application directory does not exist. Cloning repository..."
    git clone $REPO_URL $APP_DIR
else
    echo ">>> Updating existing codebase..."
    cd $APP_DIR
    git fetch --all                       # Fetch all changes from the remote repository
    git reset --hard origin/$BRANCH       # Reset local branch to match the remote
    git pull origin $BRANCH               # Pull the latest changes
fi

# ------------------------------
# Step 2: Install Dependencies
# ------------------------------

echo ">>> Installing dependencies..."
cd $APP_DIR
npm install --production                  # Install production dependencies only

# ------------------------------
# Step 3: Build the Application
# ------------------------------

if [ -f "package.json" ] && grep -q '"build"' package.json; then
    echo ">>> Building the application (detected build script in package.json)..."
    npm run build                         # Run the build command if it exists
else
    echo ">>> No build script detected. Skipping build step."
fi

# --------------------------------------
# Step 4: Set Environment Variables
# --------------------------------------

echo ">>> Setting environment variables..."
export NODE_ENV=$NODE_ENV                # Set Node.js environment variable

# ---------------------------------------
# Step 5: Restart Application with PM2
# ---------------------------------------

echo ">>> Restarting the application with PM2..."
if pm2 list | grep -q $PM2_PROCESS_NAME; then
    echo ">>> Process found. Restarting..."
    pm2 restart $PM2_PROCESS_NAME        # Restart the existing PM2 process
else
    echo ">>> Process not found. Starting a new process..."
    pm2 start $APP_DIR/app.js --name $PM2_PROCESS_NAME # Start a new PM2 process
fi

# ------------------------------
# Step 6: Clean Up Old Logs
# ------------------------------

LOG_DIR="$APP_DIR/logs"                   # Directory containing log files
echo ">>> Cleaning up old logs (files older than 30 days)..."
if [ -d "$LOG_DIR" ]; then
    find $LOG_DIR -type f -mtime +30 -exec rm -f {} \; || echo "No logs to clean."
else
    echo ">>> Log directory not found. Skipping cleanup."
fi

# ------------------------------
# Step 7: Deployment Complete
# ------------------------------

echo ">>> Deployment complete! The application is live."
