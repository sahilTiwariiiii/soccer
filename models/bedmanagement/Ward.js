import mongoose from 'mongoose';

const wardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    capacity: {
        type: Number,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Ward', wardSchema);
