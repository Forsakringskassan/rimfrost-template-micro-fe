#!/bin/sh

# Runtime environment variable injection script
# This script creates a runtime-config.js file with environment variables that can be accessed at runtime

# Configuration
ASSET_DIR=${ASSET_DIR:-/usr/local/apache2/htdocs}
APP_PREFIX=${APP_PREFIX:-RUNTIME_}

echo "Starting runtime environment variable injection..."
echo "   Asset directory: $ASSET_DIR"
echo "   Prefix: $APP_PREFIX"

# Get all environment variables that start with the specified prefix
env_vars=$(env | grep "^${APP_PREFIX}" || true)

REQUIRED_VARS="
RUNTIME_BFF_URL
"

for VAR in $REQUIRED_VARS; do
  if [ -z "$(printenv "$VAR")" ]; then
    echo "WARNING: $VAR is not set. App will use placeholder value."
  fi
done

if [ -z "$env_vars" ]; then
    echo "No environment variables found with prefix '$APP_PREFIX'"
    echo "   Skipping injection..."
    exit 0
fi

echo ""
echo "Found environment variables:"
echo "$env_vars" | while IFS= read -r line; do
    echo "   - $line"
done

# Create runtime-config.js file
CONFIG_FILE="$ASSET_DIR/runtime-config.js"
echo "window._env_ = {" > "$CONFIG_FILE"

echo "$env_vars" | while IFS='=' read -r key value; do
    [ -z "$key" ] && continue
    escaped_value=$(echo "$value" | sed 's/"/\\"/g')
    echo "  \"$key\": \"$escaped_value\"," >> "$CONFIG_FILE"
done

echo "};" >> "$CONFIG_FILE"

echo ""
echo "Created runtime configuration file: $CONFIG_FILE"
cat "$CONFIG_FILE"

# Inject the script tag into index.html
INDEX_FILE="$ASSET_DIR/index.html"
if [ -f "$INDEX_FILE" ]; then
    echo ""
    echo "Injecting runtime-config.js into index.html..."

    if grep -q "runtime-config.js" "$INDEX_FILE"; then
        echo "   Already injected, skipping..."
    else
        sed -i 's|</head>|  <script src="/runtime-config.js"></script>\n  </head>|' "$INDEX_FILE"
        echo "   Injected script tag into index.html"
    fi
fi

echo ""
echo "Environment variable injection complete"
echo ""
