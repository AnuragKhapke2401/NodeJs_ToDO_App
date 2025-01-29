FROM node:20.18.0-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --production

COPY . .

FROM node:20.18.0-alpine AS runtime

WORKDIR /app

RUN apk add --no-cache curl

COPY --from=build /app . 

EXPOSE 5000

CMD ["npm", "start"]