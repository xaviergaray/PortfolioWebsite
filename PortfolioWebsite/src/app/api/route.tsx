'use server'
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({message: "GET Request Successful"});
}

export async function POST(req: Request) {
    const data = await req.json();

    try {
        const response = await fetch(`http://aiden:8000/gpt-api/suggestions/${data.apiEndpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: data.user,
                message: data.message,
                model: data.apiModel,
            })
        });

        if (!response.ok) {
            console.error(`HTTP fetch error! status: ${response.status}`);
            return NextResponse.json({ error: 'Fetch failed' });
        }

        const jsonResponse = await response.json();
        return NextResponse.json(jsonResponse);
    } catch (error) {
        console.error(error.message);
        return NextResponse.json({error: error.message });
    }
}
