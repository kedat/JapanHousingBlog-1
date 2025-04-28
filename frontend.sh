#!/bin/bash
# This script handles client-only operations for building and serving the static site

# Check if we want to build or serve
if [ "$1" == "build" ]; then
  echo "Building static site..."
  cd client && npx vite build
elif [ "$1" == "preview" ]; then
  echo "Previewing static site..."
  cd client && npx vite preview --host 0.0.0.0 --port 5000
else
  echo "Starting client-only development server..."
  cd client && npx vite --host 0.0.0.0 --port 5001
fi