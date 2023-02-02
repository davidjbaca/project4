import express from 'express';
const router = express.Router();
import postsCtrl  from '../../controllers/posts.js';
import multer from 'multer'
const upload = multer()
// /*---------- Public Routes ----------*/

// single('photo') matches formData.append('photo', photo) in addPuppyForm

// this the route that processes a request from "React"/browser
// to create a post
router.post('/', postsCtrl.create);
router.get('/', postsCtrl.index);
router.delete('/:id', postsCtrl.deletePost)

export default router;