# Codebuild Runner Project

A simple docker project to encapsulate dependencies for execution of CLI deployment scripts via CodeBuild

Dependencies loaded:
- NodeJS v14.20
- Serverless CLI
- AWS CLI (interacting with AWS programatically)
- jq (command line JSON processor)


## Required Environment Variables (Optional)

TBD

## Sample Commands

Build Dockerfile 
```bash
docker build -t codebuild-runner:latest .
```

Run docker image locally with interactive shell
```bash
docker run --name codebuild-runner --rm -i -t codebuild-runner bash
```

ECR Commit Commands
```bash
# assumes local profile pointed at <AWS_ACCOUNT_ID>

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com

docker build -t codebuild-runner:latest .

docker tag codebuild-runner:latest <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/codebuild-runner:latest

docker push <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/codebuild-runner:latest
```


## Building with CodeBuild

Navigate to the codebuild job matching the deployed ECR repository and CodeCommit repository names and click Start Build.  This will seed the ECR repository with the appropriately tagged docker image for consumption by downstream pipelines.