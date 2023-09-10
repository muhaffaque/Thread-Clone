import User from '../models/userModel.js'
import bcrypt from "bcryptjs"
import generateTokenAndCookies from '../utils/generateTokenAndCookies.js';

const signupUser = async(req,res)=>{
    try {
        const {name, email, username, password} = req.body;

        //check user exist or not
        const user = await User.findOne({$or :[{email}, {username}]});

        if(user){
            return res.status(400).json({error:"User already exists"})
        }

        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        //creating a new user
        const newUser = new User({
            name,
            email,
            username,
            password:hashedPassword,
        });
        await newUser.save();

        if(newUser){
            generateTokenAndCookies(newUser._id,res);
            res.status(201).json({
                _id : newUser._id,
                name: newUser.name,
                email: newUser.email,
                username: newUser.username,
                password: newUser.password,
            })
        }else{
            res.status(400).json({message:"Invalid user data"})
        }

    } catch (err) {
        res.status(500).json({error: err.message})
        console.log("Error in Signup User: ", err.message)
    }
}

const loginUser = async(req,res)=>{
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username})
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: "Invalid Username or password"})
        }
        generateTokenAndCookies(user._id, res);

        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
        })
    } catch (err) {
        res.status(500).json({error: err.message})
        console.log("Error in Login User: ", err.message)
    }
}

export {signupUser, loginUser};