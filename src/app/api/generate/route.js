export async function POST(req) {
    try {
        const { message } = await req.json();
        const API_KEY = process.env.GEN_API_KEY;

        if (!API_KEY) {
            return new Response(
                JSON.stringify({ error: "Missing API key" }),
                { status: 500 }
            );
        }

        const endpoint = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

        const body = {
            contents: [
                {
                    parts: [{ text: message }]
                }
            ]
        };

        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        console.log("RAW RESPONSE:", data);

        const reply =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            data?.error?.message ||
            "No response received";

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
