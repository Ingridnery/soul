const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const path = require('path');

const middlewares = jsonServer.defaults({
    static: path.join(__dirname, '..', 'public'),
});

server.use(middlewares);
server.use(router);

const port = 3000; 
server.listen(port, () => {
  console.log(`JSON Server is running at http://localhost:${port}`);
});


