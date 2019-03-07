import mongoose from 'mongoose';

//const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/voting';
const mongoURL = process.env.MONGO_URL || 'mongodb://mongo:27017/voting';
console.log(mongoURL)
const mongoConnet = ()=>mongoose.connect(mongoURL, {useNewUrlParser: true})

export default mongoConnet;