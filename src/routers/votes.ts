import express from 'express';
import {VotesController} from '../controllers/votesController';

let router = express.Router();

router.get('/:id', (req, res, next)=>{
  const id  = req.params.id;
  const controller = new VotesController();
  controller.getVote(id)
  .then(data=>{
    res.json(data).end();
  })
  .catch(error=>res.json(error).end())
})

router.get('/', (req, res, next)=>{
  const id  = req.params.id;
  const controller = new VotesController();
  controller.getAllVote()
  .then(data=>{
    res.json(data).end();
  })
  .catch(error=>res.json(error).end())
})


export default router;