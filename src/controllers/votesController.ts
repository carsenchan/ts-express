import {Get, Post, Route, Body, Query, Header, Path, SuccessResponse, Controller, Tags} from 'tsoa';
//import  from '../helper';

import services from '../helper';
import {Vote, Campaign, CompaignResult} from '../models/interfase';

@Route('Votes')
@Tags('Votes')
export class VotesController extends Controller {
  @Get('{campaignId}')
  public async getVote(campaignId: string): Promise<Campaign>{
    return await services.get(campaignId);
  }

  @Get()
  public async getAllVote(): Promise<Campaign[]>{
    return await services.getAll();
  }

  @SuccessResponse('201', 'Created')
  @Post()
  public async createCampaign(@Body() requestBody: Campaign): Promise<Campaign>{
    return await services.createCampaign(requestBody);
  }
  
  /**
   * User creates a vote
   */
  @SuccessResponse('201', 'Created')
  @Post('{campaignId}')
  public async createVoting(campaignId:string, @Body() requestBody: Vote): Promise<Vote>{
    return await services.createVoting(campaignId, requestBody);
  }

  /**
   * Get Specific Campaign Summary
   */
  @Get('/summary/{campaignId}')
  public async getSummary(campaignId: string): Promise<CompaignResult[]>{
    return await services.getSummary(campaignId);
  }
}