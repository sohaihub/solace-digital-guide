
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Track } from '@/hooks/useAudioPlayer';

interface AudioPlayerProps {
  currentTrack: Track;
  isPlaying: boolean;
  progress: number;
  volume: number[];
  currentTime: number;
  trackDuration: number;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSeek: (value: number[]) => void;
  onVolumeChange: (value: number[]) => void;
  formatTime: (seconds: number) => string;
}

export default function AudioPlayer({
  currentTrack,
  isPlaying,
  progress,
  volume,
  currentTime,
  trackDuration,
  onPlayPause,
  onPrevious,
  onNext,
  onSeek,
  onVolumeChange,
  formatTime,
}: AudioPlayerProps) {
  const isMobile = useIsMobile();

  return (
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
        <Slider 
          value={[progress]} 
          onValueChange={onSeek}
          max={100}
          step={1}
          className="mb-1"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(trackDuration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center space-x-3 md:space-x-4 mb-4 md:mb-6">
        <Button 
          variant="ghost" 
          size={isMobile ? "sm" : "icon"}
          onClick={onPrevious}
        >
          <SkipBack className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
        
        <Button 
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${
            isPlaying ? 'bg-mindful-600 hover:bg-mindful-700' : 'bg-mindful-500 hover:bg-mindful-600'
          }`}
          size="icon"
          onClick={onPlayPause}
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
          onClick={onNext}
        >
          <SkipForward className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center space-x-4">
        <Volume2 className="h-4 w-4 text-gray-500" />
        <Slider 
          value={volume} 
          onValueChange={onVolumeChange}
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
  );
}
