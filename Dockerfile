FROM node
LABEL name="qunqun-node"
LABEL version="1.0"
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 3001
CMD npm start