FROM node:8.0.0

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

# expose our port
EXPOSE 3000

# starting command
CMD [ "npm", "start" ]
