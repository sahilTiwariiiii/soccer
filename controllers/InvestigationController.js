import InvestigationMaster from "../models/Investigation.js";

// Create
// Create Investigation
export const CreateInvestigationMaster = async (req, res) => {
    const userId = req.user.id;
    const { name, category, price, isActive } = req.body;

    // Validation
    if (!name) {
        return res.status(400).json({ message: "Test Name is required" });
    }
    if (!category) {
        return res.status(400).json({ message: "Category is required" });
    }
    if (price === undefined || price === null) {
        return res.status(400).json({ message: "Price is required" });
    }
    if (isActive === undefined) {
        return res.status(400).json({ message: "Status is required" });
    }

    try {
        // Check user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Role check (FIXED)
        if (user.role !== "doctor" && user.role !== "admin") {
            return res.status(401).json({
                message: "Only Doctor and Admin can create Investigations"
            });
        }

        // ✅ Check if same test already exists (case insensitive)
        const isTestExists = await InvestigationMaster.findOne({
            name: { $regex: new RegExp(`^${name}$`, "i") }
        });

        if (isTestExists) {
            return res.status(400).json({
                message: "Investigation Test already exists"
            });
        }

        // ✅ Create new test
        const newInvestigation = await InvestigationMaster.create({
            name,
            category,
            price,
            isActive,
            createdBy: userId
        });

        return res.status(201).json({
            message: "Investigation created successfully",
            data: newInvestigation
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
// Update
// Update Investigation
export const UpdateInvestigationMaster = async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;
    const { name, category, price, isActive } = req.body;

    try {
        // Check user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== "doctor" && user.role !== "admin") {
            return res.status(401).json({
                message: "Only Doctor and Admin can update Investigations"
            });
        }

        // Check investigation exists
        const investigation = await InvestigationMaster.findById(id);
        if (!investigation) {
            return res.status(404).json({
                message: "Investigation not found"
            });
        }

        // heck duplicate name
        if (name) {
            const isTestExists = await InvestigationMaster.findOne({
                _id: { $ne: id },
                name: { $regex: new RegExp(`^${name}$`, "i") }
            });

            if (isTestExists) {
                return res.status(400).json({
                    message: "Investigation Test already exists"
                });
            }

            investigation.name = name;
        }

        if (category) investigation.category = category;
        if (price !== undefined) investigation.price = price;
        if (isActive !== undefined) investigation.isActive = isActive;

        await investigation.save();

        return res.status(200).json({
            message: "Investigation updated successfully",
            data: investigation
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
// Get All For Doctor or Nurse
export const GetAllInvestigationMaster = async (req, res) => {
    const user=req.user.id;
    const { name, category, minPrice,maxPrice, isActive } = req.query;
    const filter = {};
    try {
        if (user.role !== "doctor" && user.role !== "admin") {
            return res.status(401).json({
                message: "Only Doctor and Admin can Get Investigations"
            });
        }
        // Category Filetr
        if(name){
            filter.name={$regex:name,$options:"i"};
        }
        if (category) filter.category = category;
        if (price) filter.price = price;
        if (isActive) filter.isActive = isActive;
        // Price Filter
        if(minPrice || maxPrice){
            filter.price={};
             if(minPrice) filter.price.$gte=Number(minPrice)
            if(maxPrice) filter.price.$lte=Number(maxPrice)
        }

// find 
const find_investigation=await InvestigationMaster.find(filter);
return res.status(200).json({
    sucess:true,
    count:find_investigation.length,
    data:find_investigation
})
    } catch (error) {
        return res.status(500).json({sucess:False, message: error.message });
    }
}
// Delete Investigation
export const DeleteInvestigationMaster = async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;

    try {
        // Check user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== "doctor" && user.role !== "admin") {
            return res.status(401).json({
                message: "Only Doctor and Admin can delete Investigations"
            });
        }

        const investigation = await InvestigationMaster.findByIdAndDelete(id);

        if (!investigation) {
            return res.status(404).json({
                message: "Investigation not found"
            });
        }

        return res.status(200).json({
            message: "Investigation deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export default {CreateInvestigationMaster,
    UpdateInvestigationMaster,
    GetAllInvestigationMaster,
    DeleteInvestigationMaster};