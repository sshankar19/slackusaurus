
import * as fs from 'fs';
import * as restify from 'restify';
import * as path from 'path';
import { config } from './config';

// path to route handlers
const pathToRoutes: string = path.join(config.root, '/app/routes');

// create Restify server 
const server: restify.Server = restify.createServer({
  name: config.name,
  version: config.version
});

// sanitize url
server.pre(restify.pre.sanitizePath());

// parse the body of the request into req.params
server.use(restify.plugins.bodyParser());

// parse the request url query string parameters into req.query
server.use(restify.plugins.queryParser());

// user-defined middleware
server.use((req: any, res: any, next: any) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  return next();
});

// route handlers
fs.readdir(pathToRoutes, (err: any, files: string[]) => {
  if (err) {
    throw new Error(err);
  } else {
    files
      .filter((file: string) => path.extname(file) === '.js')
      .forEach((file: string) => {
        const route = require(path.join(pathToRoutes, file));
        route.default(server);
      });
  }
});

export { server };