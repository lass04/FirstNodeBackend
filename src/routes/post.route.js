import { Router } from "express";
import { createPost , getPosts , updatePost} from "../controllers/post.controller.js";


const router = new Router();

router.route('/create').post(createPost);
router.route('/getPosts').get(getPosts);
router.route('/updatePost/:id').patch(updatePost);

export default router;
