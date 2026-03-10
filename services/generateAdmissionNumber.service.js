import IPDAdmission from "../models/ipdmanagement/IPDAdmission.js";

export const generateAdmissionNumber = async () => {
    try {
        const date = new Date();
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const prefix = `IPN${year}${month}`;

        // Find the last admission number with this prefix
        const lastAdmission = await IPDAdmission.findOne({
            admissionNumber: new RegExp(`^${prefix}`)
        }).sort({ admissionNumber: -1 });

        let sequence = 1;
        if (lastAdmission) {
            const lastSeq = parseInt(lastAdmission.admissionNumber.slice(prefix.length));
            sequence = lastSeq + 1;
        }

        const admissionNumber = `${prefix}${sequence.toString().padStart(4, '0')}`;
        return admissionNumber;
    } catch (error) {
        throw new Error("Error generating admission number: " + error.message);
    }
};
