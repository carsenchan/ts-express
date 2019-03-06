export interface Vote{  
  hkId: string,
  campaignId: string,
  campaignOptionId: number,
  createDate?: Date
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