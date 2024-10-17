import jwt from "jsonwebtoken"

export const generateTokenAndCookie = (res, userId) =>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("jobToken", jobToken, {
        httpOnly:true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7*24*60*1000,
    })

    return token;
}