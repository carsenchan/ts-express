import app from './express';
import http from 'http';

import './controllers/votesController';

const server = http.createServer(app);
const PORT = process.env.PORT || 7001;

// Start API Services
server.listen(PORT)
server.on('listening', ()=>console.log(`Server is Listening PORT: ${PORT}`));