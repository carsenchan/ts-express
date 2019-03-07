import {Vote, Campaign, CompaignResult} from '../models/interfase';
import Campaigns from '../models/Campaigns';
import Votes from '../models/Votes';


const services = {
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
  },
  getSummary: (campaignId: string): Promise<CompaignResult[]> =>{
    return Votes.aggregate([
            {$match: {campaignId: campaignId}},
            {$group: {_id: "$campaignOptionId", count: {$sum: 1}}},
            {$sort: {_id:1}}])
          .then((data:any)=>{
            return data;
    })
  },
  removeCampaign: (campaignId:string) =>{
    return Campaigns.findOneAndDelete({_id: campaignId})
    .then((data:any)=>{
      return data;
    })
  }
}



export default services;