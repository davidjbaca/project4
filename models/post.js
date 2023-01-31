import mongoose from 'mongoose';

// const likesSchema = mongoose.Schema({
//   username: String,
//   userId: { type: mongoose.Schema.Types.ObjectId }
// })

// A post has many likes, a like belongs to a POST
const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, // referencing a model
    contact: String,
    email: String,
    notes: String
    
  })
 

export default mongoose.model('Post', postSchema);