import User from "../models/userModel.js";
import Post from "../models/postModel.js"

const createPost = async(req,res)=>{
    try {
        const {postedBy, text, img} = req.body;

        if(!postedBy || !text) return res.status(400).json({message: "Posted By and text fields are required "})
        //check user exist or not
        const user = await User.findById(postedBy)
        if(!user) return res.status(404).json({message: "User not exist"})

       if(user._id.toString() !== req.user._id.toString()){
        return res.status(401).json({message: "unauthorized to create post"})
       }

       const maxLength = 500;
       if(text.length > maxLength){
        return res.status(400).json({message: `Text must be less than ${maxLength} characters`})
       }

       const newPost = new Post({postedBy,text,img})
       await newPost.save();
       res.status(201).json({message: "Post created successfully"})
    } catch (err) {
        res.status(500).json({message: err.message})
        console.log("Error in Createpost: " , err.message)
    }
}

const getPost = async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)

        if(!post){
            return res.status(404).json({message: "Post is not found"})
        }
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json({message: err.message})
        console.log("Error in Createpost: " , err.message)
    }
}

const deletePost = async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)

        if(!post){
            return res.status(404).json({message: "Post is not found"})
        }

        if(post.postedBy.toString()!== req.user._id.toString()){
            return res.status(401).json({message: "Unauthorized to delete post"})
        }

        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "Post deleted successfully"})
    } catch (err) {
        res.status(500).json({message: err.message})
        console.log("Error in deletepost: " , err.message)
    }
}

const likeUnlikePost = async (req,res)=>{
    try {
        const {id: postId} = req.params;
        const userId = req.user._id

        const post = await Post.findById(postId)
        if(!post){
            return res.status(404).json({message: "Post is not found"})
        }

        const userLikedPost = post.likes.includes(userId)
        if(userLikedPost){
            //unlike the post
            await Post.updateOne({_id: postId}, {$pull: {likes: userId}})
            res.status(200).json({message : "Post unliked successfully"})
        }else{
            //like post
            post.likes.push(userId)
            await post.save();
            res.status(200).json({message : "Post liked successfully"})
        }
    } catch (err) {
        res.status(500).json({message: err.message})
        console.log("Error in like or unlike post: " , err.message)
    }
}

const replyToPost = async(req,res)=>{
    try {
        const {text} = req.body;
        //const {id: postId} = req.params
        const postId = req.params.id;
        const userId = req.user._id;
        const userProfilePic = req.user.profilePic;
        const username = req.user.username

        if(!text){
          return res.status(400).json({messgae: "The fiels is required"}) 
        }

        const post = await Post.findById(postId)
        if(!post){
            return res.status(404).json({messgae: "The post is not found"})
        }

        const reply = {userId, text, userProfilePic, username}
        post.replies.push(reply)
        await post.save()

        res.status(200).json({message : "Replied successfully", post})
    } catch (err) {
        res.status(500).json({message: err.message})
        console.log("Error in replying post: " , err.message)
    }
}

const getFeedPost = async(req,res)=>{
    try {          
        const userId = req.user._id;
        const user = await User.findById(userId) 
        if(!user){
            return res.status(404).json({message: " The user is not found"})
        }

        const following = user.following;
        const feedPosts = await Post.find({postedBy:{$in: following}}).sort({createdAt: -1});
        res.status(200).json({feedPosts})
    } catch (err) {
        res.status(500).json({message: err.message})
        console.log("Error in replying post: " , err.message) 
    }
}

export {createPost, getPost, deletePost, likeUnlikePost,replyToPost, getFeedPost};