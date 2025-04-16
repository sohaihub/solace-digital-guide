// File: pages/api/chat.ts or app/api/chat/route.ts
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

    // Format the chat history properly for Gemini
    const formattedHistory = chatHistory.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Create a system prompt to guide Gemini's responses
    const systemPrompt = {
      role: 'system',
      parts: [{ text: `You are a helpful, empathetic AI assistant. Respond to the user's message in a supportive and relevant way. If the user shares feelings or concerns, acknowledge them specifically and provide thoughtful responses.` }]
    };

    // Add the current message
    const currentMessage = {
      role: 'user',
      parts: [{ text: message }]
    };

    // Combine all messages
    const contents = [
      systemPrompt,
      ...formattedHistory,
      currentMessage
    ];

    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent',
      {
        contents,
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
    
    // Return more specific error messages
    const errorMessage = error.response?.data?.error?.message || 'Failed to process message';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
