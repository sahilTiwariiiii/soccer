import mongoose from "mongoose";

const DepartmentSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    description:{
        type: String,
        trim: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    updatedAt:{
        type: Date,
        default: Date.now,
    }
})

const Department=mongoose.model("Department",DepartmentSchema);
export default Department;