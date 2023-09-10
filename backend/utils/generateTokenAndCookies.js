import jwt from "jsonwebtoken";

const generateTokenAndCookies = (userId,res)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: '10d',
    })

    res.cookie("jwt", token,{
        httpOnly : true, //more secure
        maxAge: 10*24*60*60*1000, 
        sameSite: "strict",
    })

    return token
}

export default generateTokenAndCookies;