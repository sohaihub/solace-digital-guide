// File: pages/api/chat.ts or app/api/chat/route.ts (depending on your Next.js version)

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// For Next.js App Router
export async function POST(request: NextRequest) {
  try {
    const { message, chatHistory } = await request.json();
    
    // Get API key from environment variable
    const API_KEY = process.env.GEMINI_API_KEY;
    
    if (!API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Format messages for the Gemini API
    // This format may vary depending on the specific Gemini API version you're using
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent',
      {
        contents: [
          ...chatHistory.map((msg: any) => ({
            role: msg.role,
            parts: [{ text: msg.content }]
          })),
          {
            role: 'user',
            parts: [{ text: message }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': API_KEY
        }
      }
    );

    // Extract the response text
    const reply = response.data.candidates[0].content.parts[0].text;

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Error calling Gemini API:', error.response?.data || error);
    
    // Check if this is a content filtering error
    if (error.response?.data?.error?.message?.includes('blocked')) {
      return NextResponse.json(
        { error: 'This content was blocked by Gemini\'s content filtering system.' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}

// For Next.js Pages Router
/*
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, chatHistory } = req.body;
    
    // Get API key from environment variable
    const API_KEY = process.env.GEMINI_API_KEY;
    
    if (!API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    // ... same implementation as above ...

    return res.status(200).json({ reply });
  } catch (error) {
    // ... same error handling as above ...
    return res.status(500).json({ error: 'Failed to process message' });
  }
}
*/
