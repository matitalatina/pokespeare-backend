FROM node:12-alpine AS build
WORKDIR /usr/src/app
COPY *.json .eslintrc.js package-lock.json ./
# COPY ./node_modules ./node_modules 
RUN npm install
COPY ./src ./src
RUN npm run build

FROM node:12-alpine
WORKDIR /usr/src/app
COPY *.json ./
# COPY ./node_modules ./node_modules 
RUN npm install --production
COPY --from=build /usr/src/app/dist ./dist
EXPOSE 3000
CMD npm run start:prod
