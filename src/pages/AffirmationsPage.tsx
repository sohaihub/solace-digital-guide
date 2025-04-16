
import { useState, useEffect } from 'react';
import PageContainer from '@/components/PageContainer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart, RefreshCw, MessageCircle, Share2 } from 'lucide-react';

const affirmationCategories = [
  { id: 'general', name: 'General' },
  { id: 'confidence', name: 'Confidence' },
  { id: 'gratitude', name: 'Gratitude' },
  { id: 'anxiety', name: 'Anxiety Relief' },
  { id: 'success', name: 'Success' },
];

const affirmations = {
  general: [
    "I am worthy of love, happiness, and fulfillment.",
    "I trust my journey and know I'm exactly where I need to be.",
    "I embrace my strengths and accept my weaknesses with compassion.",
    "I am open to all the abundance the universe has to offer.",
    "Each day, I grow stronger, wiser, and more compassionate.",
    "I release what no longer serves me and welcome what nurtures my soul.",
    "I have the power to create positive change in my life.",
    "I honor my needs and establish healthy boundaries.",
    "I radiate positive energy and attract positivity into my life.",
    "I am resilient and can overcome any challenge."
  ],
  confidence: [
    "I have the courage to be my authentic self in all situations.",
    "I am confident in my abilities and trust my decisions.",
    "My self-worth is not determined by others' opinions of me.",
    "I speak my truth with confidence and clarity.",
    "I am talented, capable, and worthy of success.",
    "I believe in myself and my unique gifts.",
    "I am becoming more confident and self-assured every day.",
    "I am proud of who I am and all I've accomplished.",
    "I approach new experiences with courage and an open mind.",
    "I radiate confidence, self-respect, and inner harmony."
  ],
  gratitude: [
    "I am grateful for all the abundance in my life.",
    "I appreciate the simple joys and blessings each day brings.",
    "My heart is filled with gratitude for the people who love me.",
    "I find beauty and things to be thankful for in every situation.",
    "I am thankful for my health, my breath, and my body.",
    "Gratitude transforms my perspective and fills me with joy.",
    "I acknowledge and appreciate the lessons in every experience.",
    "I see the world through grateful eyes and an open heart.",
    "I am blessed with opportunities to grow and learn.",
    "My life is full of moments worthy of gratitude and wonder."
  ],
  anxiety: [
    "I breathe deeply and find calm in this present moment.",
    "I am safe, supported, and at peace.",
    "My anxiety is temporary; my strength is permanent.",
    "I release fear and embrace tranquility.",
    "I am in control of my thoughts and emotions.",
    "Every breath calms my mind and relaxes my body.",
    "I am stronger than my anxiety and wiser than my worries.",
    "I choose peace over worry and trust over doubt.",
    "This moment is temporary, and I have the power to move through it.",
    "I am grounded, centered, and secure in myself."
  ],
  success: [
    "I am deserving of success and abundance in all areas of my life.",
    "I have the skills and abilities to achieve my goals.",
    "Every challenge brings me closer to my definition of success.",
    "I celebrate my achievements, both big and small.",
    "I am aligned with my purpose and passion.",
    "Success flows to me easily and effortlessly.",
    "I am committed to my goals and persistent in my actions.",
    "I transform obstacles into opportunities for growth.",
    "My potential to succeed is limitless.",
    "I attract success by maintaining a positive mindset and taking inspired action."
  ]
};

export default function AffirmationsPage() {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [currentAffirmation, setCurrentAffirmation] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [animateAffirmation, setAnimateAffirmation] = useState(false);

  // Generate a random affirmation from the selected category
  const generateAffirmation = () => {
    setAnimateAffirmation(false);
    setTimeout(() => {
      const categoryAffirmations = affirmations[selectedCategory as keyof typeof affirmations];
      const randomIndex = Math.floor(Math.random() * categoryAffirmations.length);
      setCurrentAffirmation(categoryAffirmations[randomIndex]);
      setAnimateAffirmation(true);
    }, 100);
  };

  // Toggle favorite status of an affirmation
  const toggleFavorite = (affirmation: string) => {
    if (favorites.includes(affirmation)) {
      setFavorites(favorites.filter(fav => fav !== affirmation));
    } else {
      setFavorites([...favorites, affirmation]);
    }
  };

  // Generate an affirmation when component mounts or category changes
  useEffect(() => {
    generateAffirmation();
  }, [selectedCategory]);

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Daily Affirmations</h1>
          <p className="text-gray-600">
            Positive affirmations can help reshape your thoughts and mindset.
            Read them aloud, write them down, or simply reflect on them daily.
          </p>
        </div>

        {/* Category Selection */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {affirmationCategories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              className={selectedCategory === category.id ? 'bg-mindful-600' : ''}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Current Affirmation Card */}
        <Card className="glass-card overflow-hidden mb-10 transition-all duration-500">
          <div 
            className={`relative bg-gradient-to-br from-mindful-500 to-calm-600 text-white p-8 md:p-12 ${
              animateAffirmation ? 'animate-scale-in' : 'opacity-0'
            }`}
          >
            <Sparkles className="absolute top-6 left-6 h-6 w-6 text-white/30" />
            <Sparkles className="absolute bottom-6 right-6 h-6 w-6 text-white/30" />
            
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-display font-semibold mb-6 text-center">
                {currentAffirmation}
              </h2>
              
              <div className="flex items-center justify-center space-x-4 mt-8">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/10 hover:bg-white/20"
                  onClick={() => toggleFavorite(currentAffirmation)}
                >
                  <Heart
                    className={`h-5 w-5 ${favorites.includes(currentAffirmation) ? 'fill-white' : ''}`}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/10 hover:bg-white/20"
                  onClick={() => navigator.clipboard.writeText(currentAffirmation)}
                >
                  <Share2 className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  className="bg-white/20 hover:bg-white/30 text-white px-8"
                  onClick={generateAffirmation}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  New Affirmation
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Suggested Practice */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">How to Use Affirmations</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="bg-mindful-100 text-mindful-600 rounded-full p-1 mr-2 mt-1">
                  <MessageCircle className="h-3 w-3" />
                </span>
                <span>Speak them aloud with conviction and belief</span>
              </li>
              <li className="flex items-start">
                <span className="bg-mindful-100 text-mindful-600 rounded-full p-1 mr-2 mt-1">
                  <MessageCircle className="h-3 w-3" />
                </span>
                <span>Write them down in a journal each morning</span>
              </li>
              <li className="flex items-start">
                <span className="bg-mindful-100 text-mindful-600 rounded-full p-1 mr-2 mt-1">
                  <MessageCircle className="h-3 w-3" />
                </span>
                <span>Meditate on them during quiet moments</span>
              </li>
              <li className="flex items-start">
                <span className="bg-mindful-100 text-mindful-600 rounded-full p-1 mr-2 mt-1">
                  <MessageCircle className="h-3 w-3" />
                </span>
                <span>Set reminders to review them throughout the day</span>
              </li>
            </ul>
          </Card>
          
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Best Practices</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="bg-mindful-100 text-mindful-600 rounded-full p-1 mr-2 mt-1">
                  <MessageCircle className="h-3 w-3" />
                </span>
                <span>Use present tense "I am" rather than "I will be"</span>
              </li>
              <li className="flex items-start">
                <span className="bg-mindful-100 text-mindful-600 rounded-full p-1 mr-2 mt-1">
                  <MessageCircle className="h-3 w-3" />
                </span>
                <span>Choose affirmations that resonate with you personally</span>
              </li>
              <li className="flex items-start">
                <span className="bg-mindful-100 text-mindful-600 rounded-full p-1 mr-2 mt-1">
                  <MessageCircle className="h-3 w-3" />
                </span>
                <span>Consistency matters more than duration</span>
              </li>
              <li className="flex items-start">
                <span className="bg-mindful-100 text-mindful-600 rounded-full p-1 mr-2 mt-1">
                  <MessageCircle className="h-3 w-3" />
                </span>
                <span>Connect emotionally with the words as you say them</span>
              </li>
            </ul>
          </Card>
        </div>

        {/* Favorites Section */}
        <Card className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-4">Your Favorite Affirmations</h2>
          {favorites.length > 0 ? (
            <div className="space-y-3">
              {favorites.map((affirmation, index) => (
                <div 
                  key={index} 
                  className="bg-white/70 p-4 rounded-lg flex justify-between items-center"
                >
                  <p className="flex-1">{affirmation}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFavorite(affirmation)}
                  >
                    <Heart className="h-5 w-5 fill-mindful-500 text-mindful-500" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-white/50 rounded-lg">
              <Heart className="h-12 w-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">No favorites yet</p>
              <p className="text-sm text-gray-400 mt-1">
                Click the heart icon to save your favorite affirmations
              </p>
            </div>
          )}
        </Card>
      </div>
    </PageContainer>
  );
}
