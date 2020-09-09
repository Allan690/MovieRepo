FROM node:14-alpine

# Create the usr/app directory incase it doesn't exist
# and set it as the working directory
RUN mkdir -p /app

WORKDIR /app

COPY src/  /app/src

COPY package.json tsconfig.build.json package-lock.json tsconfig.json ormconfig.ts /app/

COPY entrypoint.sh /app

# install the requirements
RUN npm install

EXPOSE 5000
# start the app
CMD npm run start
