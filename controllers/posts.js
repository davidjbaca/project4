import User from "../models/user.js";
import Post from '../models/post.js';
import {s3} from '../config/s3-config.js'


import { v4 as uuidv4 } from "uuid";

const BUCKET_NAME = process.env.BUCKET_NAME;

export default {
  create,
  index,
  deletePost
};

async function deletePost(req, res){
  try {
      await Post.findByIdAndDelete(req.params.id);
      res.json({ data: 'JobApp deleted' })
  } catch (err) {
      res.status(400).json({ err });
  }
}


async function create(req, res) {
  console.log(req.user, " <- req.user", req.body)

    try {
      // adding our post information to the database
      const post = await Post.create({
        user: req.user._id,
        employer: req.body.employer,
        link: req.body.link,
        notes: req.body.notes,
      })

      await post.populate('user')// populating on a document "post"
      // respond to the client
      res.status(201).json({post})


    } catch(err){
      res.status(400).json({err})
    }
  } 


async function index(req, res) {
  try {
    const posts = await Post.find({}).populate("user").exec(); // populating on the model
    res.status(200).json({ data: posts });
  } catch (err) {
    res.status(400).json({ err });
  }
}
