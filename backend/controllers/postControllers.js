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

export {createPost};