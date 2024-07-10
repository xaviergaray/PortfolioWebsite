'use server'
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    return NextResponse.json({message: "GET Request Successful"});
}

export async function POST(req: Request) {
    const data = await req.json();

    try {
        const response = await fetch('http://aiden:8000/gpt-api/suggestions/framework', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: data.user,
                message: data.message,
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonResponse = await response.json();
        return NextResponse.json(jsonResponse);
    } catch (error) {
        console.error('Fetch Error:', error);
        return NextResponse.json({ error: 'Fetch failed' });
    }
}
