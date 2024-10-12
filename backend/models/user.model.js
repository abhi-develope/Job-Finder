import mongoose, { trusted } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: Number,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['student', 'recruiter'],
        required: true
    },

    profile: {
        bio: {type: String},
        skills: [{type: String}],
        resume: {type: String}, // url to resume
        resumeOriginalName: {type: String},
        company: {type:mongoose.Schema.Types.ObjectId, ref:'company'},
        profilePhoto: {
            type: String,
            default: ""
        }
    },
}, {timestamps:trusted})

export const User = mongoose.model('User', userSchema);