import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
    const token = req.cookies.jobToken;
    if(!token) return res.status(401).json({error: "unauthorized - no token provided"})
        try {
           const decoded = jwt.verify(token, process.env.JWT_SECRET);     
           
           if(!decoded) return res.status(401).json({error: "unauthorized - invalid token"})

            req.id = decoded.userId
            next();
        } catch (error) {
            console.log("Error in verification", error);

            return res.status(500).json({error: error.message})
            
            
        }
}