import { useState, useRef, useEffect } from 'react';
import PageContainer from '@/components/PageContainer';
import { Send, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { callGeminiAPI } from '@/lib/gemini';
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
      content: "Hello! I'm your AI therapy assistant. How are you feeling today?",
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
      const response = await callGeminiAPI(userMessage.content);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [...prev, {
        id: (Date.now() + 2).toString(),
        content: "There was an error connecting to Gemini API.",
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
          <h1 className="text-3xl font-bold mb-2">AI Therapy Chat</h1>
          <p className="text-gray-600">
            Share your thoughts and feelings with our AI therapy assistant.
            All conversations are private and confidential.
          </p>
        </div>

        <Card className="glass-card overflow-hidden flex flex-col h-[70vh]">
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-mindful-500 to-mindful-600 text-white'
                      : 'bg-white/90 border border-muted'
                  }`}
                >
                  <div className="flex items-center mb-1">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                        message.sender === 'user'
                          ? 'bg-white/20'
                          : 'bg-mindful-100'
                      }`}
                    >
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
            Note: This is an AI assistant designed to provide support, but it is not a replacement for
            professional therapy. If you're experiencing a crisis,
            please visit our <a href="/emergency" className="text-mindful-600 hover:underline">Emergency Resources</a> page.
          </p>
        </div>
      </div>
    </PageContainer>
  );
}
