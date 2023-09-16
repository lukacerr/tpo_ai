FROM node

WORKDIR /app

COPY package*.json .
RUN npm install

COPY prisma/schema.prisma prisma/
COPY prisma/migrations prisma/migrations

RUN npm run db:gen
CMD ["npm", "run", "db:push"]