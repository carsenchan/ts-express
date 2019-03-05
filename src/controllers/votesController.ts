import {Get, Post, Route, Body, Query, Header, Path, SuccessResponse, Controller, Tags} from 'tsoa';
//import  from '../helper';

import voteServeice, { Vote } from '../helper';


@Route('Votes')
@Tags('Votes')
export class VotesController extends Controller {
  @Get('{id}')
  public async getVote(id: number): Promise<Vote>{
    console.log(id);
    return await voteServeice.get(id);
  }

  @Get()
  public async getAllVote(): Promise<Vote[]>{
    return await voteServeice.getAll();
  }
}