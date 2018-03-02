
import * as fs from 'fs';
import * as restify from 'restify';
import * as path from 'path';
let config = require('./config.json');
import { Slackusaurus } from './Slackusaurus';

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

server.post('/', (req, res, next) => handleMessage(req, res, Slackusaurus.makeSmart, next));


async function handleMessage(req, res, handler: (req, res) => Promise<any>, next?) {
    try {
        let payload = await handler(req, res);
        return res.send(200, payload);
    }
    catch (error) {
        console.log(error);
        return res.send(500, error.message);
    }
}

export { server };