
import { Job } from "../models/job.model.js";

export const jobApplication = async (req, res)=> {
    try {
        const {title, description, requirenments, salary, location, jobType, experience, position, companyId} = req.body;
        const userId = req.userId;
        
        

        if(!title || !description || !requirenments || !salary || !location || !jobType || !experience || !position || !companyId ){
            return res.status(400).json({message: "all feilds are required", success: false})
        }

        const job = await Job.create({ 
            title,
            description,
            requirenments: requirenments.split(","),
            salary: Number(salary),
            location,
            jobType,
            experience,
            position,
            company: companyId,
            created_by: userId,

        })
        return res.status(201).json({message: "new job created successfully", job, success: true});
    } catch (error) {
        res.status(400).json({error: error.message})
        console.log(error);
        
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or:[
                {title:{$regex:keyword, $options:"i"}},
                {description:{$regex:keyword, $options:"i"}},
            ]
        }
        const jobs = await Job.find(query).populate({
            path:"company"
        }).sort({createdAt: -1});
        if(!jobs){
            return res.status(400).json({message: "job not foun", success: false})
        }
        return res.status(200).json({jobs, success: true})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export const jobsById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(400).json({message: "job not foun", success: false})
        }
        return res.status(200).json({job, success: true})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export const adminJobs = async (req, res) => {
    try {
       
        const adminId = req.userId;
        
        const jobs = await Job.find({ created_by:adminId });
        if(!jobs){
            return res.status(400).json({message: "job not found", success: false})
        }
        return res.status(200).json({jobs, success: true})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}