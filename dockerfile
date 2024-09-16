from node:18-alpine
# Create app directory
WORKDIR /src

# Install app dependencies
COPY ["package.json", ".env", "./"]
# RUN npm install

# Bundle app source
COPY . .

# Expose port
EXPOSE 5000

# Start the app
CMD [ "npm", "run", "dev" ]