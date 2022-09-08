# Use a libc-based linux distro
FROM public.ecr.aws/lts/ubuntu:18.04_stable

WORKDIR /app

ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8
ENV PATH="/app:${PATH}"

# Update apt and get curl
RUN apt update && apt upgrade 
RUN apt-get update && apt-get install -y curl gpg unzip jq software-properties-common 

# Set up Node 14 for SLS/Lambda
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g serverless@2.72.3

# Get AWS CLI
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip
RUN  ./aws/install

# Check the plumbing
RUN aws --version
RUN node -v
RUN serverless -v

# Add your own stuff here...
