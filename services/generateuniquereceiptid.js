import Receipt from '../models/PatientReceipt.js';



export const generateUniqueReceiptNumber=async()=>{
    let unique_receipt_number;
    unique_receipt_number=`RCPT-${Math.floor(100000+Math.random()*900000)}`;
    const exists=await Receipt.findOne({unique_receipt_number});
    if(exists){
        return await generateUniqueReceiptNumber();''
    }
    return unique_receipt_number;
}