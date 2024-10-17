import { User } from "../models/user.model.js";
import { generateTokenAndCookie } from "../utils/jwtToken.js";

export const signup = async (req, res)=> {
    try {
        const {name, email, password, role, phone} = req.body;
        if(!name || !email || !password || !role || !phone){
           return res.status(400).json({message: "all fields are required", success: false})
        }

        const userAlreadyExist = await User.findOne({email});
        if(userAlreadyExist){
            return res.status(400).json({message: "user already exist", success:false})
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashPassword,
            phone,
            role
        })

        await user.save();
        res.status(200).json({message: "signup   successfully", success:true,
            user: {
                ...user._doc,
                password: undefined,
            },
        })
        generateTokenAndCookie(res, user._id);


        
    } catch (error) {
        res.status(400).json({error: error.message})
    
        
    }
}

export const login = async (req, res)=>{
    try {
        const {email, password, role} = req.body;
        const user = await User.findOne({email});
        const isPassword = bcrypt.compare(password, user.password);
        if(!user || !isPassword){
            return res.status(400).json({message: "invalid user credential", success:false});
        
        }
        if(role !== user.role){
            return res.status(400).json({message: "Account not exist with this role", success:false})
        }

        await user.save();
        res.status(200).json({message: "logged in  successfully", success:true,
            user: {
                ...user._doc,
                password: undefined,
            },
        })


    } catch (error) {
        res.status(400).json({error: error.message})
    
    }
}