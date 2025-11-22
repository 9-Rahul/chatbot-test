import { connectDB } from "@/lib/db";
import Message from "@/models/Message";
export async function POST(req) {
    try {
        const { message } = await req.json();
        const API_KEY = process.env.GEN_API_KEY;

        // 1. Connect to MongoDB
        await connectDB();

        // 2. Save user message
        await Message.create({
            role: "user",
            text: message
        });

        const endpoint = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

        const body = {
            contents: [
                {
                    parts: [{ text: message }]
                }
            ]
        };

        // 3. Send to Gemini
        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        const reply =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            data?.error?.message ||
            "No response received";

        // 4. Save bot reply
        await Message.create({
            role: "bot",
            text: reply
        });

        // 5. Return bot reply to frontend
        return new Response(JSON.stringify({ reply }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (err) {
        return new Response(
            JSON.stringify({ error: err.message }),
            { status: 500 }
        );
    }
}
