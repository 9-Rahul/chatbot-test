import { connectDB } from "@/lib/db";
import Message from "@/models/Message";

export async function GET() {
    await connectDB();
    const messages = await Message.find().sort({ createdAt: 1 });
    return Response.json(messages);
}
