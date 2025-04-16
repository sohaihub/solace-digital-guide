
import { Link } from 'react-router-dom';
import PageContainer from '@/components/PageContainer';
import { MessageCircle, BarChart2, SunMedium, Music, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    title: 'AI Therapy Chat',
    description: 'Chat with our AI therapist for support anytime you need it.',
    icon: MessageCircle,
    href: '/chat',
    color: 'bg-mindful-100 text-mindful-600',
  },
  {
    title: 'Track Your Mood',
    description: 'Monitor your emotions and identify patterns over time.',
    icon: BarChart2,
    href: '/mood',
    color: 'bg-calm-100 text-calm-600',
  },
  {
    title: 'Daily Affirmations',
    description: 'Start your day with positive and empowering affirmations.',
    icon: SunMedium,
    href: '/affirmations',
    color: 'bg-serenity-100 text-serenity-600',
  },
  {
    title: 'Meditation Music',
    description: 'Relax with calming sounds designed to reduce anxiety.',
    icon: Music,
    href: '/meditation',
    color: 'bg-mindful-100 text-mindful-600',
  },
  {
    title: 'Emergency Support',
    description: 'Access immediate help resources during a crisis.',
    icon: Phone,
    href: '/emergency',
    color: 'bg-calm-100 text-calm-600',
  },
];

export default function Index() {
  return (
    <PageContainer>
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-mindful-100/70 to-calm-100/50 rounded-3xl -z-10" />
        
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 max-w-6xl mx-auto">
          <div className="md:w-1/2 space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-mindful-700 to-mindful-500 bg-clip-text text-transparent">
              Your Digital Mental Wellness Companion
            </h1>
            <p className="text-lg text-gray-700">
              Solace offers AI-powered support, mood tracking, meditation, and resources 
              to help manage your mental wellbeing. Always available, always confidential.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/chat">
                <Button className="btn-primary">Chat with AI Therapist</Button>
              </Link>
              <Link to="/mood">
                <Button variant="outline" className="border-mindful-300 hover:bg-mindful-50">
                  Track Your Mood
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-mindful-400/20 to-calm-400/20 animate-pulse-gentle" />
              <div className="absolute inset-4 rounded-full bg-gradient-to-r from-mindful-400/40 to-calm-400/40 animate-pulse-gentle animation-delay-1000" />
              <div className="absolute inset-8 rounded-full bg-gradient-to-r from-mindful-400/60 to-calm-400/60 animate-breathe" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl font-display font-bold bg-gradient-to-r from-mindful-600 to-calm-500 bg-clip-text text-transparent">
                  Solace
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-10">How Solace Can Help You</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link 
              key={index} 
              to={feature.href}
              className="glass-card p-6 card-hover animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${feature.color}`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16">
        <div className="glass-card p-8 md:p-10">
          <h2 className="text-3xl font-bold text-center mb-10">What Our Users Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow">
              <p className="italic mb-4">"The AI chat has been incredibly helpful during my late-night anxiety. It's like having a supportive friend available whenever I need one."</p>
              <p className="font-medium">- Sarah M.</p>
            </div>
            
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow">
              <p className="italic mb-4">"Tracking my mood has helped me identify triggers I wasn't aware of. The visualization really puts things into perspective."</p>
              <p className="font-medium">- Marcus T.</p>
            </div>
            
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow">
              <p className="italic mb-4">"The meditation music is my go-to for stress relief. Combined with the daily affirmations, I've noticed a real difference in my outlook."</p>
              <p className="font-medium">- Jamie K.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Wellness Journey?</h2>
          <p className="text-lg text-gray-700 mb-8">
            Join thousands who are using Solace to improve their mental wellbeing, one day at a time.
          </p>
          <Link to="/chat">
            <Button className="btn-primary">Get Started Now</Button>
          </Link>
        </div>
      </section>
    </PageContainer>
  );
}
