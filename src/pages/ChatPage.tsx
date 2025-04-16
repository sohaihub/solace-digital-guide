
import { useState, useRef, useEffect } from 'react';
import PageContainer from '@/components/PageContainer';
import { Send, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

// Sample therapy bot responses
const botResponses = [
  "How does that make you feel?",
  "I understand that must be difficult. Can you tell me more about it?",
  "It sounds like you're going through a challenging time. Remember that it's okay to ask for help.",
  "Have you tried any coping strategies that have worked for you in the past?",
  "I'm here to support you. Let's explore this further.",
  "That's a really insightful observation about yourself.",
  "It takes courage to share these feelings. Thank you for trusting me.",
  "Let's take a step back and look at the bigger picture. What do you think might be contributing to these feelings?",
  "Have you considered how your thoughts might be influencing your emotions in this situation?",
  "It's completely normal to feel that way. Many people experience similar emotions.",
  "What would be a small step you could take today to help with this situation?",
  "I'm curious, what thoughts come up for you when you experience this?",
  "That sounds really challenging. How have you been managing so far?",
  "It's important to acknowledge your feelings. They're valid and real.",
  "I wonder if we could explore some strategies that might help you cope with this in the future."
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI therapy assistant. How are you feeling today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate bot thinking
    setTimeout(() => {
      // Add bot response
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
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
          <h1 className="text-3xl font-bold mb-2">AI Therapy Chat</h1>
          <p className="text-gray-600">
            Share your thoughts and feelings with our AI therapy assistant.
            All conversations are private and confidential.
          </p>
        </div>

        <Card className="glass-card overflow-hidden flex flex-col h-[70vh]">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex mb-4 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-mindful-500 to-mindful-600 text-white'
                      : 'bg-white/90 border border-muted'
                  }`}
                >
                  <div className="flex items-center mb-1">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                      message.sender === 'user' 
                        ? 'bg-white/20' 
                        : 'bg-mindful-100'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="h-3 w-3 text-white" />
                      ) : (
                        <Bot className="h-3 w-3 text-mindful-600" />
                      )}
                    </div>
                    <span className="text-xs opacity-75">
                      {message.sender === 'user' ? 'You' : 'Solace AI'}
                    </span>
                  </div>
                  <p>{message.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
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
                disabled={!input.trim()}
                className="btn-primary"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Note: This is an AI assistant designed to provide support, but it is not a replacement for
            professional therapy. If you're experiencing a crisis,
            please visit our <a href="/emergency" className="text-mindful-600 hover:underline">Emergency Resources</a> page.
          </p>
        </div>
      </div>
    </PageContainer>
  );
}
