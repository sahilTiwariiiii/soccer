import AuditLog from '../models/AuditLog.js';

export const getAuditLogs = async (req, res) => {
    try {
        const { hospitalId, branchId } = req.user;
        const { search, module, severity, page = 1, limit = 50 } = req.query;

        const filter = { hospitalId, branchId };

        if (module && module !== 'All') {
            filter.module = module;
        }

        if (severity && severity !== 'All') {
            filter.severity = severity;
        }

        if (search) {
            filter.$or = [
                { 'user.name': { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { action: { $regex: search, $options: 'i' } }
            ];
        }

        const logs = await AuditLog.find(filter)
            .sort({ timestamp: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await AuditLog.countDocuments(filter);

        res.status(200).json({
            success: true,
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
            logs
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createAuditLog = async (data) => {
    try {
        await AuditLog.create(data);
    } catch (error) {
        console.error('Failed to create audit log:', error);
    }
};
