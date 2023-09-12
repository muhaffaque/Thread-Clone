import express from "express";
import { createPost, deletePost, getFeedPost, getPost, likeUnlikePost, replyToPost } from "../controllers/postControllers.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/feed", protectRoute, getFeedPost)
router.get("/:id", getPost)
router.post("/create",protectRoute , createPost)
router.delete("/:id", protectRoute, deletePost)
router.post("/likes/:id",protectRoute, likeUnlikePost)
router.post("/replies/:id",protectRoute, replyToPost)

export default router;