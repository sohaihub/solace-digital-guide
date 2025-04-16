
import { useState, useRef, useEffect } from 'react';
import PageContainer from '@/components/PageContainer';
import { Send, User, Bot, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { sendChatRequest } from '@/lib/gemini';
import { useIsMobile } from '@/hooks/use-mobile';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isError?: boolean;
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
  const isMobile = useIsMobile();

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
      // Prepare chat history in the proper format
      const chatHistory = messages.map((msg) => ({
        content: msg.content,
        role: msg.sender === 'user' ? 'user' as const : 'assistant' as const
      }));

      // Call the API
      const response = await sendChatRequest(input, chatHistory);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.reply,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error('Chat API error:', err);
      
      setMessages((prev) => [...prev, {
        id: (Date.now() + 2).toString(),
        content: err.message || "There was an error connecting to the AI service.",
        sender: 'bot',
        timestamp: new Date(),
        isError: true
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
      <div className={`${isMobile ? 'w-full' : 'max-w-4xl'} mx-auto`}>
        <div className="text-center mb-4 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">AI Chat Assistant</h1>
          <p className="text-sm md:text-base text-gray-600">
            Share your thoughts with our AI assistant.
            All conversations are private and confidential.
          </p>
        </div>

        <Card className="glass-card overflow-hidden flex flex-col h-[70vh]">
          <div className="flex-1 overflow-y-auto p-3 md:p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[80%] rounded-2xl px-3 py-2 md:px-4 md:py-3 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                      : message.isError
                      ? 'bg-red-50 border border-red-200'
                      : 'bg-white/90 border border-muted'
                  }`}
                >
                  <div className="flex items-center mb-1">
                    <div
                      className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center mr-2 ${
                        message.sender === 'user'
                          ? 'bg-white/20'
                          : message.isError
                          ? 'bg-red-100'
                          : 'bg-blue-100'
                      }`}
                    >
                      {message.sender === 'user' ? (
                        <User className="h-3 w-3 text-white" />
                      ) : message.isError ? (
                        <AlertTriangle className="h-3 w-3 text-red-600" />
                      ) : (
                        <Bot className="h-3 w-3 text-blue-600" />
                      )}
                    </div>
                    <span className="text-xs opacity-75">
                      {message.sender === 'user' ? 'You' : 'Assistant'}
                    </span>
                  </div>
                  <p className={`text-sm md:text-base ${message.isError ? 'text-red-600' : ''}`}>
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-muted p-3 md:p-4 bg-white/50">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="input-styled flex-1 text-sm md:text-base"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="btn-primary"
                size={isMobile ? "sm" : "default"}
              >
                {loading ? '...' : <Send className={`h-4 w-4 md:h-5 md:w-5`} />}
              </Button>
            </div>
          </div>
        </Card>

        <div className="mt-4 md:mt-6 text-center text-xs md:text-sm text-gray-500">
          <p>
            Note: This is an AI assistant designed to provide general support, but it is not a replacement for
            professional advice. If you're experiencing a crisis,
            please visit our <a href="/emergency" className="text-blue-600 hover:underline">Emergency Resources</a> page.
          </p>
        </div>
      </div>
    </PageContainer>
  );
}
