import express from 'express';
import * as myTypes from '../models/interfase';
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
});

router.get('/', (req, res, next)=>{
  const controller = new VotesController();
  controller.getAllVote()
  .then(data=>{
    res.json(data).end();
  })
  .catch(error=>res.json(error).end())
});

router.post('/', (req, res, next)=>{
  const body:myTypes.Campaign = req.body;

  const controller = new VotesController();
  controller.createCampaign(body)
  .then( result=>{
    res.status(201);
    res.json(result);
  })
  .catch(error=>res.json(error).end())
});

router.post('/:campaignId', (req, res, next)=>{
  const body:myTypes.Vote = req.body;
  const campaignId = req.params.campaignId;
  const controller = new VotesController();
  controller.createVoting(campaignId, body)
  .then( result=>{
    res.status(201);
    res.json(result);
  })
  .catch(error=>res.json(error).end())
});

export default router;