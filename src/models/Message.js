import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    role: String,  // 'user' or 'bot'
    text: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.Message ||
    mongoose.model("Message", MessageSchema);
