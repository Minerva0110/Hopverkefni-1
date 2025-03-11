# NOTAÐ TIL AÐ RUNNA FORRITIÐ Í LOKUÐUM CONTAINER
FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
