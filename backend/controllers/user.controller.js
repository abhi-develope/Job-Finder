import { User } from "../models/user.model.js";
import { generateTokenAndCookie } from "../utils/jwtToken.js";
import bcrypt from "bcrypt"

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
        generateTokenAndCookie(res, user._id);
        res.status(200).json({message: "signup   successfully", success:true,
            user: {
                ...user._doc,
                password: undefined,
            },
        })


        
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
        generateTokenAndCookie(res, user._id);
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


export const logout = async  (req, res)=>{
    res.clearCookie("jobToken")
    res.status(200).json({message: "loggout successfully"});
}



export const profileUpdate = async (req, res) => {
   try {
    const {name, email, bio, skills, phone} = req.body;
   
    let skillsArray;
   
        if (typeof skills === "string") {
          // If skills is a string, split it by commas
          skillsArray = skills.split(", ");
        } else if (Array.isArray(skills)) {
          // If skills is already an array, use it as is
          skillsArray = skills;
        }
    const userId = req.id // middleware authentication
    const user = await User.findOne(userId);

    if(!user){
        res.status(400).json({message: "user not found", success: "false"})
    }

    //updating data
    if(name)  user.name = name;
    if(phone)  user.phone = phone;
    if(email)  user.email = email;
    if(bio)  user.profile.bio = bio;
    if(skills)  user.profile.skills = skillsArray;
   


    await user.save();
    res.status(200).json({message: "user information updated successfully", 
        user: {
            ...user._doc,
            password: undefined,
        },})
    
   } catch (error) {
    res.status(400).json({error: error.message})

}
   
}
