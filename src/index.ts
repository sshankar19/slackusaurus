let config = require('./config.json');
import { server } from './restify';
server.listen(config.port, () => console.log('sup'));
export { server };