import voteRouter from './votes';

import {Express} from 'express';

const RouterRegister = (app:Express) =>{
  app.use('/votes', voteRouter);
}

export default RouterRegister;