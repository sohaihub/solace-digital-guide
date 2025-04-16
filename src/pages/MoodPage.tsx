
import { useState } from 'react';
import PageContainer from '@/components/PageContainer';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Smile,
  SmilePlus,
  Meh,
  Frown,
  Angry,
  Calendar as CalendarIcon,
  BarChart,
  PlusCircle,
} from 'lucide-react';

type Mood = 'veryHappy' | 'happy' | 'neutral' | 'sad' | 'verySad' | null;

type MoodEntry = {
  date: Date;
  mood: Mood;
  notes: string;
};

const moodOptions = [
  { value: 'veryHappy', icon: SmilePlus, label: 'Very Happy', color: 'text-serenity-500 hover:bg-serenity-50' },
  { value: 'happy', icon: Smile, label: 'Happy', color: 'text-serenity-600 hover:bg-serenity-50' },
  { value: 'neutral', icon: Meh, label: 'Neutral', color: 'text-amber-500 hover:bg-amber-50' },
  { value: 'sad', icon: Frown, label: 'Sad', color: 'text-calm-500 hover:bg-calm-50' },
  { value: 'verySad', icon: Angry, label: 'Very Sad', color: 'text-calm-600 hover:bg-calm-50' },
];

const getMoodColor = (mood: Mood): string => {
  switch (mood) {
    case 'veryHappy': return 'bg-serenity-500';
    case 'happy': return 'bg-serenity-400';
    case 'neutral': return 'bg-amber-400';
    case 'sad': return 'bg-calm-400';
    case 'verySad': return 'bg-calm-600';
    default: return 'bg-gray-200';
  }
};

const getMoodEmoji = (mood: Mood): string => {
  switch (mood) {
    case 'veryHappy': return '😄';
    case 'happy': return '🙂';
    case 'neutral': return '😐';
    case 'sad': return '😔';
    case 'verySad': return '😢';
    default: return '❓';
  }
};

export default function MoodPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMood, setSelectedMood] = useState<Mood>(null);
  const [notes, setNotes] = useState('');
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [view, setView] = useState<'calendar' | 'stats'>('calendar');

  const handleMoodSelection = (mood: Mood) => {
    setSelectedMood(mood);
  };

  const handleSaveMood = () => {
    if (!selectedMood) return;
    
    const newEntry: MoodEntry = {
      date: selectedDate,
      mood: selectedMood,
      notes: notes,
    };
    
    // Check if we already have an entry for this date
    const entryIndex = moodEntries.findIndex(
      entry => format(entry.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
    );
    
    if (entryIndex >= 0) {
      // Update existing entry
      const updatedEntries = [...moodEntries];
      updatedEntries[entryIndex] = newEntry;
      setMoodEntries(updatedEntries);
    } else {
      // Add new entry
      setMoodEntries([...moodEntries, newEntry]);
    }
    
    // Reset form
    setNotes('');
  };

  // Find mood for selected date
  const selectedDateMood = moodEntries.find(
    entry => format(entry.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  );

  // Calculate mood stats
  const moodStats = moodOptions.map(option => ({
    mood: option.value,
    count: moodEntries.filter(entry => entry.mood === option.value).length,
    label: option.label,
    icon: option.icon
  }));

  // Helper to customize calendar day rendering based on mood entries
  const dayHasMood = (date: Date): boolean => {
    return moodEntries.some(entry => format(entry.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'));
  };

  const renderDay = (date: Date) => {
    const entry = moodEntries.find(
      entry => format(entry.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
    
    if (!entry) return undefined;
    
    return (
      <div className="relative flex items-center justify-center w-full h-full">
        <div className={`absolute inset-2 rounded-full ${getMoodColor(entry.mood)}`} />
        <span className="relative text-white">{date.getDate()}</span>
      </div>
    );
  };

  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Mood Tracker</h1>
            <p className="text-gray-600">Track how you feel each day and discover patterns over time.</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={view === 'calendar' ? 'default' : 'outline'}
              className={view === 'calendar' ? 'bg-mindful-600' : ''}
              onClick={() => setView('calendar')}
            >
              <CalendarIcon className="mr-1 h-4 w-4" />
              Calendar
            </Button>
            <Button
              variant={view === 'stats' ? 'default' : 'outline'}
              className={view === 'stats' ? 'bg-mindful-600' : ''}
              onClick={() => setView('stats')}
            >
              <BarChart className="mr-1 h-4 w-4" />
              Stats
            </Button>
          </div>
        </div>

        {view === 'calendar' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">Your Mood Calendar</h2>
              <div className="border rounded-md p-3">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="mx-auto"
                  classNames={{
                    day_today: "bg-mindful-100 text-mindful-900 font-semibold",
                    day_selected: "bg-mindful-600 text-white hover:bg-mindful-700",
                  }}
                  components={{
                    Day: ({ date, ...props }) => (
                      <button {...props}>
                        {renderDay(date) || date.getDate()}
                      </button>
                    ),
                  }}
                />
              </div>
            </Card>

            <Card className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">
                {selectedDateMood 
                  ? `Your Mood on ${format(selectedDate, 'MMMM d, yyyy')}` 
                  : `How are you feeling on ${format(selectedDate, 'MMMM d, yyyy')}?`}
              </h2>
              
              {selectedDateMood ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getMoodColor(selectedDateMood.mood)}`}>
                      <span className="text-2xl">{getMoodEmoji(selectedDateMood.mood)}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {moodOptions.find(m => m.value === selectedDateMood.mood)?.label}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {selectedDateMood.notes || "No notes for this entry"}
                      </p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => setSelectedMood(null)}
                    variant="outline"
                    size="sm"
                  >
                    Update this entry
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Mood Selection */}
                  <div className="flex flex-wrap justify-between gap-2">
                    {moodOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleMoodSelection(option.value as Mood)}
                        className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                          selectedMood === option.value
                            ? 'bg-mindful-100 border-2 border-mindful-500'
                            : 'bg-white hover:bg-gray-50'
                        } ${option.color}`}
                      >
                        <option.icon 
                          className={`h-8 w-8 mb-1 ${selectedMood === option.value ? 'text-mindful-600' : ''}`} 
                        />
                        <span className="text-xs">{option.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Notes (optional)</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="input-styled w-full h-24"
                      placeholder="How are you feeling today? What's on your mind?"
                    />
                  </div>

                  {/* Save Button */}
                  <Button
                    onClick={handleSaveMood}
                    disabled={!selectedMood}
                    className={selectedMood ? 'btn-primary' : ''}
                  >
                    <PlusCircle className="mr-1 h-4 w-4" />
                    Save Mood
                  </Button>
                </div>
              )}
            </Card>
          </div>
        ) : (
          <Card className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-6">Your Mood Statistics</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Mood Distribution</h3>
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {moodStats.map(stat => (
                    <div key={stat.mood} className="flex flex-col items-center">
                      <div className="flex-1 w-full bg-gray-100 rounded-t-lg relative">
                        <div 
                          className={`absolute bottom-0 left-0 right-0 ${getMoodColor(stat.mood as Mood)}`}
                          style={{ 
                            height: `${moodEntries.length ? (stat.count / moodEntries.length) * 100 : 0}%`,
                            minHeight: stat.count ? '10%' : '0',
                          }}
                        />
                        <div className="absolute bottom-2 inset-x-0 text-center text-white font-bold">
                          {stat.count}
                        </div>
                      </div>
                      <div className="h-20 flex flex-col items-center justify-center p-2 bg-white rounded-b-lg">
                        <stat.icon className={`h-6 w-6 mb-1 ${getMoodColor(stat.mood as Mood).replace('bg-', 'text-')}`} />
                        <span className="text-xs text-center">{stat.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Recent Entries</h3>
                {moodEntries.length > 0 ? (
                  <div className="space-y-2">
                    {moodEntries
                      .sort((a, b) => b.date.getTime() - a.date.getTime())
                      .slice(0, 5)
                      .map((entry, index) => (
                        <div key={index} className="flex items-center bg-white p-3 rounded-lg">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${getMoodColor(entry.mood)}`}>
                            <span className="text-xl">{getMoodEmoji(entry.mood)}</span>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{format(entry.date, 'MMMM d, yyyy')}</div>
                            <div className="text-sm text-gray-600 line-clamp-1">
                              {entry.notes || "No notes"}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-6 bg-white/50 rounded-lg">
                    <p className="text-gray-500">No mood entries yet.</p>
                    <p className="text-sm">Start tracking your moods to see statistics here.</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}
