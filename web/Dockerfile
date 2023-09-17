FROM tpoai-data_commons

WORKDIR /app/web

COPY package*.json .
RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
