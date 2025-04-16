
import { useState, useRef, useEffect } from 'react';
import PageContainer from '@/components/PageContainer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Moon,
  Cloud,
  Waves,
  Wind,
  Trees,
  Music,
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Meditation tracks data with audio URLs
const tracks = [
  {
    id: 1,
    title: 'Deep Relaxation',
    description: 'Gentle sounds to help you relax deeply',
    duration: '10:00',
    category: 'meditation',
    icon: Moon,
    audioUrl: 'https://cdn.pixabay.com/audio/2023/08/31/audio_303ccd15ad.mp3',
  },
  {
    id: 2,
    title: 'Stress Relief',
    description: 'Release tension with calming sounds',
    duration: '8:00',
    category: 'meditation',
    icon: Cloud,
    audioUrl: 'https://cdn.pixabay.com/audio/2022/03/10/audio_c968815a28.mp3',
  },
  {
    id: 3,
    title: 'Ocean Waves',
    description: 'Gentle waves to calm your mind',
    duration: '15:00',
    category: 'nature',
    icon: Waves,
    audioUrl: 'https://cdn.pixabay.com/audio/2021/09/06/audio_968bd2d883.mp3',
  },
  {
    id: 4,
    title: 'Forest Sounds',
    description: 'Immerse in peaceful forest ambience',
    duration: '12:00',
    category: 'nature',
    icon: Trees,
    audioUrl: 'https://cdn.pixabay.com/audio/2022/05/16/audio_94fc8b5904.mp3',
  },
  {
    id: 5,
    title: 'Gentle Rain',
    description: 'Soothing rainfall for deep focus',
    duration: '20:00',
    category: 'nature',
    icon: Cloud,
    audioUrl: 'https://cdn.pixabay.com/audio/2021/08/09/audio_dc39bde808.mp3',
  },
  {
    id: 6,
    title: 'Soft Piano',
    description: 'Gentle piano melodies for relaxation',
    duration: '9:00',
    category: 'music',
    icon: Music,
    audioUrl: 'https://cdn.pixabay.com/audio/2022/01/20/audio_d3f7d48da5.mp3',
  },
  {
    id: 7,
    title: 'Light Breeze',
    description: 'Gentle wind sounds for relaxation',
    duration: '18:00',
    category: 'nature',
    icon: Wind,
    audioUrl: 'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3',
  },
  {
    id: 8,
    title: 'Mindful Breathing',
    description: 'Guided breathing exercise for mindfulness',
    duration: '5:00',
    category: 'meditation',
    icon: Moon,
    audioUrl: 'https://cdn.pixabay.com/audio/2022/03/15/audio_db7aa74ac1.mp3',
  },
];

// Categories for filtering
const categories = [
  { id: 'all', name: 'All' },
  { id: 'meditation', name: 'Meditation' },
  { id: 'nature', name: 'Nature Sounds' },
  { id: 'music', name: 'Music' },
];

export default function MeditationPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [volume, setVolume] = useState([70]);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isMobile = useIsMobile();
  
  // Filter tracks based on selected category
  const filteredTracks = selectedCategory === 'all'
    ? tracks
    : tracks.filter(track => track.category === selectedCategory);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio(currentTrack.audioUrl);
    audioRef.current.volume = volume[0] / 100;
    
    // Clean up function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  // Update audio when track changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentTrack.audioUrl;
      audioRef.current.volume = volume[0] / 100;
      
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.error("Error playing audio:", err);
          setIsPlaying(false);
        });
      }
    }
  }, [currentTrack]);

  // Update volume when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100;
    }
  }, [volume]);

  // Handle play/pause
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    setIsPlaying(!isPlaying);
    
    if (isPlaying) {
      audioRef.current.pause();
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
    } else {
      audioRef.current.play().catch(err => {
        console.error("Error playing audio:", err);
      });
      
      // Update progress
      progressInterval.current = window.setInterval(() => {
        if (audioRef.current) {
          const calculatedProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
          setProgress(calculatedProgress || 0);
          
          if (audioRef.current.ended) {
            nextTrack();
          }
        }
      }, 100);
    }
  };

  // Handle track selection
  const selectTrack = (track: typeof tracks[0]) => {
    setCurrentTrack(track);
    setProgress(0);
    setIsPlaying(true);
    
    if (audioRef.current) {
      audioRef.current.src = track.audioUrl;
      audioRef.current.play().catch(err => {
        console.error("Error playing audio:", err);
        setIsPlaying(false);
      });
    }
  };

  // Handle previous track
  const previousTrack = () => {
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? tracks.length - 1 : currentIndex - 1;
    selectTrack(tracks[prevIndex]);
  };

  // Handle next track
  const nextTrack = () => {
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
    const nextIndex = currentIndex === tracks.length - 1 ? 0 : currentIndex + 1;
    selectTrack(tracks[nextIndex]);
  };

  // Format time from progress percentage and audio duration
  const formatTime = (progress: number) => {
    if (!audioRef.current || isNaN(audioRef.current.duration)) {
      return "0:00";
    }
    
    const totalSeconds = audioRef.current.duration;
    const currentSeconds = (progress / 100) * totalSeconds;
    const mins = Math.floor(currentSeconds / 60);
    const secs = Math.floor(currentSeconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Format duration
  const formatDuration = () => {
    if (!audioRef.current || isNaN(audioRef.current.duration)) {
      return currentTrack.duration;
    }
    
    const mins = Math.floor(audioRef.current.duration / 60);
    const secs = Math.floor(audioRef.current.duration % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Meditation Music</h1>
          <p className="text-sm md:text-base text-gray-600">
            Relax and unwind with calming sounds designed to ease anxiety and promote mindfulness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          <div className="md:col-span-2">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  className={selectedCategory === category.id ? 'bg-mindful-600' : ''}
                  onClick={() => setSelectedCategory(category.id)}
                  size={isMobile ? "sm" : "default"}
                >
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Tracks List */}
            <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
              {filteredTracks.map(track => {
                const isActive = currentTrack.id === track.id;
                return (
                  <Card
                    key={track.id}
                    className={`p-3 md:p-4 flex items-center space-x-3 md:space-x-4 cursor-pointer transition-all card-hover ${
                      isActive ? 'bg-mindful-50 border-mindful-200' : ''
                    }`}
                    onClick={() => selectTrack(track)}
                  >
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${
                      isActive ? 'bg-mindful-100 text-mindful-600' : 'bg-gray-100'
                    }`}>
                      <track.icon className="h-4 w-4 md:h-5 md:w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-sm md:text-base font-medium ${isActive ? 'text-mindful-700' : ''}`}>
                        {track.title}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-500">{track.description}</p>
                    </div>
                    <div className="text-xs md:text-sm text-gray-500">{track.duration}</div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Player Card */}
          <div className="md:col-span-1">
            <Card className="glass-card p-4 md:p-6 sticky top-24">
              {/* Current Track Info */}
              <div className="text-center mb-4 md:mb-6">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-mindful-100 flex items-center justify-center mx-auto mb-3">
                  <currentTrack.icon className="h-6 w-6 md:h-8 md:w-8 text-mindful-600" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold">{currentTrack.title}</h3>
                <p className="text-xs md:text-sm text-gray-600">{currentTrack.description}</p>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-mindful-400 to-mindful-600 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{formatTime(progress)}</span>
                  <span>{formatDuration()}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center items-center space-x-3 md:space-x-4 mb-4 md:mb-6">
                <Button 
                  variant="ghost" 
                  size={isMobile ? "sm" : "icon"}
                  onClick={previousTrack}
                >
                  <SkipBack className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
                
                <Button 
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${
                    isPlaying ? 'bg-mindful-600 hover:bg-mindful-700' : 'bg-mindful-500 hover:bg-mindful-600'
                  }`}
                  size="icon"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  ) : (
                    <Play className="h-5 w-5 md:h-6 md:w-6 text-white ml-1" />
                  )}
                </Button>
                
                <Button 
                  variant="ghost" 
                  size={isMobile ? "sm" : "icon"}
                  onClick={nextTrack}
                >
                  <SkipForward className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center space-x-4">
                <Volume2 className="h-4 w-4 text-gray-500" />
                <Slider 
                  value={volume} 
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="flex-1"
                />
              </div>

              {/* Tips */}
              <div className="mt-6 pt-4 md:mt-8 md:pt-6 border-t border-gray-100">
                <h4 className="text-xs md:text-sm font-medium mb-2">Meditation Tips</h4>
                <ul className="text-xs md:text-sm text-gray-600 space-y-2">
                  <li>• Find a quiet place free from distractions</li>
                  <li>• Sit or lie down in a comfortable position</li>
                  <li>• Focus on your breathing as you listen</li>
                  <li>• If your mind wanders, gently bring it back to the present</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
