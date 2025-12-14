import { Router } from "express";
import { createPost , getPosts } from "../controllers/post.controller.js";


const router = new Router();

router.route('/create').post(createPost);
router.route('/getPosts').get(getPosts);

export default router;
