from node:18-alpine
WORKDIR /app
COPY ["package.json", ".env", "./"]
RUN npm cache clean --force
RUN npm install
EXPOSE 5000
COPY . .
CMD [ "npm", "run", "dev" ]