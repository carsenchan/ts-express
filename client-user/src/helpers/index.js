import axios from 'axios';

const domain = 'http://localhost:6001/votes'

export const hkidCheck = (inputId:string): Boolean =>{

}

export interface Vote {
  hkId: string,
  campaignId: string,
  campaignOptionId: number
}

export interface Campaign {
  _id?: string,
  campaignDesc: string,
  campaignOptions: CampaignOption[],
  campaignStartDate:Date, 
  campaignEndDate: Date,
  createDate?: Date
}
interface CampaignOption {
  id: number,
  optionDesc: string
}

export const getAllCampaign = ()=>{
  return axios.get(domain)
  .then(data=>{
    return data;
  })
  .catch(error=>console.log(error))
}

export const getCampaignById = (campaignId:string)=>{
  const url = `${domain}/${campaignId}`
  return axios.get(url)
  .then(data=>{
    return data;
  })
  .catch(error=>console.log(error))
}

export const getCampaignSummary = (campaignId:string)=>{
  const url = `${domain}/summary/${campaignId}`
  return axios.get(url)
  .then(data=>{
    return data;
  })
  .catch(error=>console.log(error))
}

export const createVoting = (campaignId:string, vote:Vote)=>{
  const url = `${domain}/${campaignId}`
  return axios.post(url, vote)
  .then(data=>{
    return data;
  })
  .catch(error=>console.log(error))
}

// export const getCampaignSummary = (campaignId:string)=>{
//   const url = `${domain}/summary/${campaignId}`
//   return axios.get(url)
//   .then(data=>{
//     return data;
//   })
//   .catch(error=>console.log(error))
// }

export default {hkidCheck, getAllCampaign, getCampaignById, getCampaignSummary, createVoting};