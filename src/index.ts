import app from './express';
import http from 'http';

import './controllers/votesController';

import mongoConnect from './mongoose';

const server = http.createServer(app);
const PORT = process.env.PORT || 7001;


mongoConnect()
.then(()=>{
  // Start API Services
  server.listen(PORT)
  server.on('listening', ()=>console.log(`Server is Listening PORT: ${PORT}`));
})
.catch((error:any)=>console.log("API Server Connot Connect to MongoDB...", error))


