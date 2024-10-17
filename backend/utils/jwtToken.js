import jwt from "jsonwebtoken"

export const generateTokenAndCookie = (res, userId) =>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("jobToken", token, {
        httpOnly: true, // xxs
        secure: true,
        sameSite: "strict" //csrf
    })

    return token;
}