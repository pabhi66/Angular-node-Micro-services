FROm node:latest

ENV http_proxy="http://proxy.tcs.com:8080"
ENV https_proxy="http://proxy.tcs.com:8080"

# Create a directory where app will be placed
RUN mkdir -p /usr/src/app

# Change working directory
WORKDIR /usr/src/app

# Copy dependecny definitions
COPY package.json /usr/src/app

# Install dependencies
RUN npm install

# Get all the code needed to run the app
COPY . /usr/src/app

ENV http_proxy=""
ENV https_proxy=""

# Expose the port the app runs in
EXPOSE 6000

# Serve the app
CMD ["npm", "start"]
