'use server'
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({message: "GET Request Successful"});
}

export async function POST(req: Request) {
    const data = await req.json();
    const apiModelsToEndpoint = ["gpt-3.5-turbo-0125", "RAG-mistral"];

    if (data.apiModel >= apiModelsToEndpoint.length) {
        return NextResponse.json({error: 'Invalid model number'})
    }

    try {
        const response = await fetch(`http://aiden:8000/gpt-api/suggestions/${data.apiEndpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: data.user,
                message: data.message,
                model: apiModelsToEndpoint[data.apiModel],
            })
        });

        if (!response.ok) {
            console.error(`HTTP fetch error! status: ${response.status}`);
            return NextResponse.json({ error: 'Fetch failed' });
        }

        const jsonResponse = await response.json();
        return NextResponse.json(jsonResponse);
    } catch (error) {
        return NextResponse.json({error: error });
    }
}
