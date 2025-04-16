import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// For Next.js App Router
export async function POST(request: NextRequest) {
  try {
    const { message, chatHistory } = await request.json();
    
    // Get API key from environment variable
    const API_KEY = "AIzaSyBj1BzzNCg6FOUeic8DTtU3uYNVMaDErQw";

    
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
[8:42 pm, 16/4/2025] Sharath: this code is gemini.ts
[8:42 pm, 16/4/2025] Sharath: import { useState, useRef, useEffect } from 'react';
import PageContainer from '@/components/PageContainer';
import { Send, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import axios from 'axios';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI assistant. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Call your backend API instead of directly calling Gemini
      const response = await axios.post('/api/chat', {
        message: input,
        chatHistory: messages.map((msg) => ({
          content: msg.content,
          role: msg.sender === 'user' ? 'user' : 'assistant'
        })),
      });

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.data.reply || response.data.message,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Chat API error:', err);
      let errorMessage = "There was an error connecting to the AI service.";
      
      // Check if the error response contains a message about content filtering
      if (axios.isAxiosError(err) && err.response?.data?.error?.includes('content')) {
        errorMessage = "I'm unable to respond to that message due to content policy restrictions.";
      }
      
      setMessages((prev) => [...prev, {
        id: (Date.now() + 2).toString(),
        content: errorMessage,
        sender: 'bot',
        timestamp: new Date(),
      }]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Chat Assistant</h1>
          <p className="text-gray-600">
            Share your thoughts with our AI assistant.
            All conversations are private and confidential.
          </p>
        </div>

        <Card className="glass-card overflow-hidden flex flex-col h-[70vh]">
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                      : 'bg-white/90 border border-muted'
                  }`}
                >
                  <div className="flex items-center mb-1">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                        message.sender === 'user'
                          ? 'bg-white/20'
                          : 'bg-blue-100'
                      }`}
                    >
                      {message.sender === 'user' ? (
                        <User className="h-3 w-3 text-white" />
                      ) : (
                        <Bot className="h-3 w-3 text-blue-600" />
                      )}
                    </div>
                    <span className="text-xs opacity-75">
                      {message.sender === 'user' ? 'You' : 'Assistant'}
                    </span>
                  </div>
                  <p>{message.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-muted p-4 bg-white/50">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="input-styled flex-1"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="btn-primary"
              >
                {loading ? '...' : <Send className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Note: This is an AI assistant designed to provide general support, but it is not a replacement for
            professional advice. If you're experiencing a crisis,
            please visit our <a href="/emergency" className="text-blue-600 hover:underline">Emergency Resources</a> page.
          </p>
        </div>
      </div>
    </PageContainer>
  );
}// lib/gemini.ts
import axios from 'axios';

export const callGeminiAPI = async (inputMessage: string) => {
  try {
    const response = await axios.post('https://api.gemini.com/v1/chat', {
      apiKey: 'AIzaSyBj1BzzNCg6FOUeic8DTtU3uYNVMaDErQw',
      inputMessage,
    });
    return response.data.reply;
  } catch (error) {
    throw new Error('Error calling Gemini API');
  }
};
