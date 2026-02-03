import User from "../models/User.js";

const generateUniqueEmployeeId=async()=>{
    // generate the new employeee Id
    let employee_id;
    employee_id= `EMP-${Math.floor(100000+Math.random()*900000)}`
    const exists=await User.exists({employee_id});
    if(exists){
        return generateUniqueEmployeeId();
    }
    return employee_id;
}

export default generateUniqueEmployeeId;