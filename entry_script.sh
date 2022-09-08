#!/bin/bash

echo ""
echo "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
echo "@   Demo Pipeline successfully executing!   @" 
echo "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
echo ""

npm install
    
if [[ -z "$LIFECYCLE" ]]; then
    echo "LIFECYCLE Environment Variable is required!"
    exit 1
elif [[ "$LIFECYCLE" = "dev" ]]; then    
    echo "Development Lifecycle Detected!"
    echo "  Doing something specific for Development"
    npm run coverage
elif [[ "$LIFECYCLE" = "qa" ]]; then    
    echo "QA Lifecycle Detected!"
    echo "  Doing something specific for QA"
    npm run coverage
elif [[ "$LIFECYCLE" = "prd" ]]; then    
    echo "Production Lifecycle Detected!"
    echo "  Doing something specific for Production"
    echo ""
    npm run coverage
fi

if [[ -z "$EXAMPLE" ]]; then
    echo "Unable to resolve EXAMPLE variable -- please check configuration and try again!"
    exit 1
else
    echo "Successfully pulled EXAMPLE variable from Parameter Store!"
fi

if [[ "$AWS_ACCESS_KEY_ID" = "REPLACE_ME_WITH_SECURE_STRING" ]]; then
    unset AWS_ACCESS_KEY_ID
    unset AWS_SECRET_ACCESS_KEY
    echo "Remote AWS environment is not set!  Deploying locally..."
    npm run deploy -- --stage "$LIFECYCLE"
    if [[ "$LIFECYCLE" = "prd" ]]; then    
        npm run deploy-web
    fi    
fi

