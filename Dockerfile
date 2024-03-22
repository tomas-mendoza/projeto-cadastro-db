FROM node:20
WORKDIR /home/app/
COPY package*.json ./
COPY .env ./
RUN npm i
COPY . .
EXPOSE 8000
CMD ["npm", "run", "dev"]
