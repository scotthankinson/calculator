#!/bin/bash

if [ -z "$1" ]
    then 
        echo 'Usage:  ./initalize_new_repos.sh repo_name'
        exit 0
fi

# Collect the initial git hash and scaffold the other desired branches
echo "Creating standard branches"
export COMMIT_HASH=$(aws codecommit get-branch --repository-name $1 --branch master | jq -r ".branch.commitId")

aws codecommit create-branch --repository-name $1 --branch-name dev --commit $COMMIT_HASH
aws codecommit create-branch --repository-name $1 --branch-name qa --commit $COMMIT_HASH
# PRD will build off of master

# Create the approval rule template which requires Pull Requests to be approved for qa/prd
# echo "Creating approval rules"
# aws codecommit create-approval-rule-template --approval-rule-template-name $1-approval-template --approval-rule-template-description "Requires code review approval before merging into upper lifecycles" --approval-rule-template-content "{\"Version\": \"2018-11-08\",\"DestinationReferences\": [\"refs/heads/master\", \"refs/heads/qa\"],\"Statements\": [{\"Type\": \"Approvers\",\"NumberOfApprovalsNeeded\": 1}]}"
# aws codecommit associate-approval-rule-template-with-repository --repository-name $1 --approval-rule-template-name $1-approval-template

echo 'Success!'
