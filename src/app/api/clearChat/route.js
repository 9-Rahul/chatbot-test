import { connectDB } from "@/lib/db";
import Message from "@/models/Message";

export async function DELETE() {
    await connectDB();
    await Message.deleteMany({});
    return Response.json({ success: true });
}
