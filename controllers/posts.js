import User from "../models/user.js";
import Post from '../models/post.js';
import {s3} from '../config/s3-config.js'

// import uuid to help generate random names
import { v4 as uuidv4 } from "uuid";
// since we are sharing code, when you pull you don't want to have to edit the
// the bucket name, thats why we're using an environment variable
const BUCKET_NAME = process.env.BUCKET_NAME;

export default {
  create,
  index,
};

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
    // this populates the user when you find the posts
    // so you'll have access to the users information
    // when you fetch the posts
    const posts = await Post.find({}).populate("user").exec(); // populating on the model
    res.status(200).json({ data: posts });
  } catch (err) {
    res.status(400).json({ err });
  }
}
