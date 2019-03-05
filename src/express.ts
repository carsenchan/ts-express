import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

const FileStreamRotator = require('file-stream-rotator');

import RouterRegister from './routers';

// Read dotenv
dotenv.config();

const app = express();
// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Morgan Config 
const logDirectory = path.join( __dirname, '/../logs');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = FileStreamRotator.getStream({
  frequency: 'daily',
  verbose: false,
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log')
});
const logFormat = '[:date[iso]] :remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms';

app.use(morgan(logFormat, {stream: accessLogStream}));

// Routes
RouterRegister(app);

export default app;