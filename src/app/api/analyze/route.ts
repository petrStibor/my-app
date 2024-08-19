import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { text } = await request.json();

        // Conditionally set headers
        const headers: HeadersInit = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        const apiKey = process.env.NEXT_PUBLIC_API_KEY;

        if (apiKey) {
            headers['x-textrazor-key'] = apiKey;
        } else {
            throw new Error('API key is missing');
        }

        const apiResponse = await fetch('https://api.textrazor.com/', {
            method: 'POST',
            headers: headers,
            body: `text=${encodeURIComponent(text)}&extractors=entities`,
        });

        if (!apiResponse.ok) {
            throw new Error(`TextRazor API request failed with status ${apiResponse.status}`);
        }

        const data = await apiResponse.json();
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
