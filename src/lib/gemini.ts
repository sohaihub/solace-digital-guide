// File: pages/api/chat.ts or app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// For Next.js App Router
export async function POST(request: NextRequest) {
  try {
    const { message, chatHistory } = await request.json();
    
    // API key directly in code (not recommended for production)
    const API_KEY = "AIzaSyBj1BzzNCg6FOUeic8DTtU3uYNVMaDErQw";
    
    // Create a structured prompt that includes all context and history
    const structuredPrompt = `
CONTEXT:
You are Solace, an AI therapy assistant. Be empathetic, supportive and always respond directly to what the user has shared. Keep responses concise (2-3 sentences) and focused on the user's specific emotions and concerns.

PREVIOUS CONVERSATION:
${chatHistory.map(msg => `${msg.role === 'user' ? 'User' : 'Solace'}: ${msg.content}`).join('\n')}

USER'S LATEST MESSAGE:
${message}

YOUR RESPONSE (be specific, relevant, and compassionate):
`;

    console.log("Sending structured prompt to Gemini");

    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent',
      {
        contents: [
          {
            parts: [{ text: structuredPrompt }]
          }
        ],
        generationConfig: {
          temperature: 0.4,
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
    
    // Clean up the response to remove any prefixes like "YOUR RESPONSE:" that might be echoed back
    const cleanedReply = reply.replace(/^(YOUR RESPONSE|Solace|AI|Assistant):\s*/i, '');
    
    return NextResponse.json({ reply: cleanedReply });
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
