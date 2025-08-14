#!/bin/bash

# Script to push changes to GitHub
# Usage: ./push-to-github.sh [commit message]

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    print_error "Not a git repository!"
    exit 1
fi

# Get commit message from argument or prompt user
if [ -z "$1" ]; then
    echo "Enter commit message:"
    read -r COMMIT_MESSAGE
    if [ -z "$COMMIT_MESSAGE" ]; then
        print_error "Commit message cannot be empty!"
        exit 1
    fi
else
    COMMIT_MESSAGE="$1"
fi

print_status "Starting git operations..."

# Check if there are any changes to commit
if git diff --quiet && git diff --staged --quiet; then
    print_warning "No changes to commit!"
    exit 0
fi

# Add all changes
print_status "Adding all changes..."
git add .

if [ $? -ne 0 ]; then
    print_error "Failed to add changes!"
    exit 1
fi

# Show what will be committed
print_status "Changes to be committed:"
git status --short

# Commit changes
print_status "Committing changes with message: '$COMMIT_MESSAGE'"
git commit -m "$COMMIT_MESSAGE"

if [ $? -ne 0 ]; then
    print_error "Failed to commit changes!"
    exit 1
fi

# Get current branch name
BRANCH=$(git rev-parse --abbrev-ref HEAD)
print_status "Current branch: $BRANCH"

# Push to GitHub
print_status "Pushing to GitHub..."
git push origin "$BRANCH"

if [ $? -eq 0 ]; then
    print_status "Successfully pushed to GitHub! 🚀"
else
    print_error "Failed to push to GitHub!"
    print_warning "You may need to pull changes first if there are conflicts."
    print_warning "Try: git pull origin $BRANCH"
    exit 1
fi

print_status "Done! ✨"
