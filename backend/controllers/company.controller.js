import { Company } from "../models/company.model.js";

export const registerCompany = async(req, res)=>{
    try {
        const {companyName} = req.body;
        if(!companyName){
            return res.status(400).json({message: "company name required", success: false })
        }

        let isCompany = await Company.findOne({name: companyName});
        if(isCompany){
            return res.status(400).json({message: "This company name already exist"})
        }

        let company = new Company({
            name:companyName,
            userId: req.userId
        })

        await company.save();

        return res.status(200).json({message: "company registered successfully", success: true, company: {
            ...company._doc,
            
        },});


    } catch (error) {
        res.status(400).json({error: error.message})
        
    }
}

export const getCompany = async (req, res) => {
    try {
        const userId = req.userId;
        const companyList = await Company.find({userId});
        if(!companyList){
            return res.status(400).json({message: "no company found", success: false})
        }
        return res.status(200).json({companyList, success: true})
    } catch (error) {
        res.status(400).json({error: error.message})
        
        
    }
}

// get company by id

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const companyById = await Company({companyId})
        if(!companyById){
            return res.status(400).json({message: "companies not found", success: false})
        }
        return res.status(200).json({companyById, success: true})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// update company

export const updateCompany = async (req, res) => {
    try {
        const {name, description, website, location} = req.body;

        const updateData = {name, description, website, location};

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {new: true})
        if(!company){
            return res.status(400).json({message: "company not found", success: false})
        }

        return res.status(201).json({message: "company updated successfullyt", success: true})

    } catch (error) {
        res.status(400).json({error: error.message})
        
    }
}