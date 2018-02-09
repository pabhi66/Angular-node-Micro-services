# Create image based on the official and latest Node image from dockerhub
FROM node:latest

# Proxy settings
ENV http_proxy "http://proxy.tcs.com:8080"
ENV https_proxy "http://proxy.tcs.com:8080"

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/front-end

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/front-end

# Copy dependency definitions
COPY package.json /usr/src/front-end

# Install dependecies
RUN yarn add

# Get all the code needed to run the app
COPY . /usr/src/front-end

# Expose the port the app runs in
EXPOSE 4200

# Serve the app
CMD ["yarn", "start"]