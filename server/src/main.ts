import * as express from 'express';
import {createServer} from 'http';
import {createBidServer} from './ws-auction';
import {router} from './rest-auction';
import * as path from 'path';

const app = express();

app.use('/api', router);
app.use('/data', express.static(path.join(__dirname, '..', 'data')));

const server = createServer(app);
createBidServer(server);

server.listen(9090, 'localhost', () => {
    console.log(`listening on localhost port 9090`);
});
