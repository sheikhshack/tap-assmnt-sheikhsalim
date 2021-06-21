FROM node:14-alpine
COPY . /server-app

WORKDIR /server-app
RUN  npm install

ENV PORT 5000
ENV PG_IP localhost
ENV PG_USR postgres
ENV PG_PASS postgres
ENV PG_DB test
ENV HOSTNAME localhost

EXPOSE 5000

CMD ["npm", "start"]