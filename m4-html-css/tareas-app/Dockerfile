FROM node:12-alpine
RUN mkdir -p /home/node/tasks/node_modules && chown -R node:node /home/node/tasks
WORKDIR /home/node/tasks
COPY package*.json ./
USER node
RUN npm install
COPY --chown=node:node . .
RUN rm tareas.json
CMD [ "node", "app.js" ]
