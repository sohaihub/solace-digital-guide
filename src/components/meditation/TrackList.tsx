
import React from 'react';
import { Card } from '@/components/ui/card';
import { Track } from '@/hooks/useAudioPlayer';

interface TrackListProps {
  filteredTracks: Track[];
  currentTrack: Track;
  onSelectTrack: (track: Track) => void;
}

export default function TrackList({ filteredTracks, currentTrack, onSelectTrack }: TrackListProps) {
  return (
    <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
      {filteredTracks.map(track => {
        const isActive = currentTrack.id === track.id;
        return (
          <Card
            key={track.id}
            className={`p-3 md:p-4 flex items-center space-x-3 md:space-x-4 cursor-pointer transition-all card-hover ${
              isActive ? 'bg-mindful-50 border-mindful-200' : ''
            }`}
            onClick={() => onSelectTrack(track)}
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
  );
}
