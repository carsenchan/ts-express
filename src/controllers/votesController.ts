import {Get, Post, Route, Body, Query, Header, Path, SuccessResponse, Controller, Tags} from 'tsoa';
//import  from '../helper';

import voteServeice from '../helper';
import {Vote, Campaign} from '../models/interfase';

@Route('Votes')
@Tags('Votes')
export class VotesController extends Controller {
  @Get('{campaignId}')
  public async getVote(campaignId: string): Promise<Campaign>{
    return await voteServeice.get(campaignId);
  }

  @Get()
  public async getAllVote(): Promise<Campaign[]>{
    return await voteServeice.getAll();
  }

  @SuccessResponse('201', 'Created')
  @Post()
  public async createCampaign(@Body() requestBody: Campaign): Promise<Campaign>{
    return await voteServeice.createCampaign(requestBody);
  }
  
  /**
   * User creates a vote
   */
  @SuccessResponse('201', 'Created')
  @Post('{campaignId}')
  public async createVoting(campaignId:string, @Body() requestBody: Vote): Promise<Vote>{
    return await voteServeice.createVoting(campaignId, requestBody);
  }
}