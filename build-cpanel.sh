#!/bin/bash

# Exit on error
set -e

echo "🚀 Building Next.js app..."
npm run build

echo "📦 Preparing files for cPanel..."
# Next.js standalone mode doesn't copy the public or static folders by default,
# so we need to copy them manually.
cp -r .next/static .next/standalone/.next/
if [ -d "public" ]; then
  cp -r public .next/standalone/
fi

echo "🧹 Removing node_modules to comply with CloudLinux NodeJS Selector..."
# CloudLinux manages its own node_modules symlink, so we must remove the bundled one
rm -rf .next/standalone/node_modules

echo "🗜️ Creating cpanel-deploy.zip..."
# Remove existing zip if it exists
rm -f cpanel-deploy.zip

# Zip the contents of the standalone folder
cd .next/standalone
zip -rq ../../cpanel-deploy.zip .
cd ../../

echo "✅ Build ready for cPanel!"
echo ""
echo "Deployment Instructions for cPanel:"
echo "1. Upload 'cpanel-deploy.zip' to your desired folder on cPanel (e.g., a folder outside public_html)."
echo "2. Extract the zip file."
echo "3. Go to 'Setup Node.js App' in cPanel."
echo "4. Create a new application."
echo "5. Set 'Application root' to the folder where you extracted the files."
echo "6. Set 'Application startup file' to 'server.js'."
echo "7. Click 'Run NPM Install' in the cPanel interface to generate the node_modules symlink and install dependencies."
echo "8. Add your environment variables (like RESEND_API_KEY) in the cPanel interface if you have any."
echo "9. Start the application!"
