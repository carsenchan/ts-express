import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  campaignDesc: String,
  campaignOptions: [{
    id: Number,
    optionDesc: String
  }],
  campaignStartDate:{
    required: true,
    type: Date
  },
  campaignEndDate:{
    required: true,
    type: Date
  },
  createDate: {
    type: Date,
    default: new Date()
  }
});

const Compaign = mongoose.model('campaign', campaignSchema, "Campaigns");

export default Compaign;
