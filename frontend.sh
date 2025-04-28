#!/bin/bash
# Helper script to run the client-only version of the site

if [ "$1" == "build" ]; then
  echo "Building client-only static site..."
  cd client && npx vite build
elif [ "$1" == "preview" ]; then
  echo "Previewing built client-only site..."
  cd client && npx vite preview --port 5001 --host 0.0.0.0
else
  echo "Starting client-only development server..."
  node client-dev.js
fi