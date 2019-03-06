import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema({
  hkId: String,
  campaignId: String,
  campaignOptionId: Number,
  createDate: {
    type: Date,
    default: new Date()
  }
});

const Vote = mongoose.model('Votes', voteSchema, "votes");

export default Vote;
