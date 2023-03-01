FROM node:latest

ENV REACT_APP_BACKEND_URL=0.0.0.0:9000\
    REACT_APP_PIPE_IMAGE=jenkins

WORKDIR /app

COPY . .

RUN npm install -g serve &&\
    npm install &&\
    npm run build

CMD ["sh", "-c", "serve -s build -p 8080"]