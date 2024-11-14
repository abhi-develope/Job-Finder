import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";


export const applyJobs = async (req, res) => {
    try {
        const userId = req.userId;
        const jobId = req.params.id;
        if(!jobId){
            return res.status(400).json({message: "jobId is required", success: false})
        }

        // check if the user already apply to the jo or not
        const alreadyApplied = await Application.findOne({job:jobId, applicant:userId });
        if(alreadyApplied){
            return res.status(400).json({message: "you already applied to this job", success: false})
        }

        // check job exist or not 
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(400).json({message: "job not found", success: false})
        }

        // create new application
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId,
        })
        job.applications.push(newApplication._id);
        await job.save();
        return res.status(200).json({message: "job applied successfully", newApplication, success: true});
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export const getAppliedJobs = async (req, res) => {
    try {
       const userId = req.userId;
       const application = await Application.find({applicant: userId}).populate({
        path:'job',
        options: {sort:{createdAt: -1}},
        populate:{
            path:"company",
            options:{sort:{createdAt: -1}}
        }
       })
       if(!application){
        return res.status(400).json({message: "no application", success: false});
       }
       return res.status(200).json({application, success: true})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// fetch applicant

export const getApplicant = async (req, res)=> {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications",
            options:{sort:{createdAt: -1}},
            populate:{
                path: "applicant",
                option:{sort:{createdAt: -1}},
            }
        })
        if(!job){
            return res.status(404).json({message: "applicant not found ", success: false})
        }
        return res.status(200).json({job, success:true})
    } catch (error) {
        res.status(400).json({error: error.message}) 
    }
}

export const updateStatus = async (req, res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({message: "status is required", success:false})
        }

        // find the application by application id
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(400).json({message: "application not found", success:false})
        }

        // update the status
        application.status = status.toLowerCase();
        await application.save();
        return res.status(200).json({message: "status updated successfully", success:true})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
                         