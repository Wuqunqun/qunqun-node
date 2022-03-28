FROM node
LABEL name="qunqun-node"
LABEL version="1.0"
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 3002
CMD npm start