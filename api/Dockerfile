FROM tpoai-data_commons

WORKDIR /app/api

COPY package*.json .
RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]
