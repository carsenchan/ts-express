import {Vote, Campaign} from '../models/interfase';
import Campaigns from '../models/campaigns';
import Votes from '../models/Votes';


const voteServices = {
  get : (id:string): Promise<Campaign> =>{
    return Campaigns.findOne({_id: id}).then((data:any)=>{
      return data
    });
  },
  getAll: (): Promise<Campaign[]> => {
    return Campaigns.find().then((data:any)=>{
      return data
    });
  },
  createCampaign: (campaign: Campaign): Promise<Campaign> =>{
    return Campaigns.create(campaign).then((data: any)=>{
      const result:Campaign = data
      return result;
    })
  },
  createVoting: (campaignId: string, vote: Vote): Promise<Vote> =>{
    const query = {hkId: vote.hkId, campaignId};
    return Votes.findOneAndUpdate(query, {$set: vote}, {upsert: true, new: true})
    .then( (data: any)=>{
      const result:Vote = data;
      return result;
    })
  }
}



export default voteServices;