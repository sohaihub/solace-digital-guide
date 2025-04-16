
import { useState } from 'react';
import PageContainer from '@/components/PageContainer';
import { tracks } from '@/data/meditationTracks';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import CategoryFilter from '@/components/meditation/CategoryFilter';
import TrackList from '@/components/meditation/TrackList';
import AudioPlayer from '@/components/meditation/AudioPlayer';

export default function MeditationPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const {
    isPlaying,
    currentTrack,
    volume,
    progress,
    trackDuration,
    currentTime,
    setVolume,
    togglePlayPause,
    selectTrack,
    previousTrack,
    nextTrack,
    formatTime,
    handleSeek,
  } = useAudioPlayer();
  
  // Filter tracks based on selected category
  const filteredTracks = selectedCategory === 'all'
    ? tracks
    : tracks.filter(track => track.category === selectedCategory);

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
            <CategoryFilter 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            {/* Tracks List */}
            <TrackList
              filteredTracks={filteredTracks}
              currentTrack={currentTrack}
              onSelectTrack={selectTrack}
            />
          </div>

          {/* Player Card */}
          <div className="md:col-span-1">
            <AudioPlayer
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              progress={progress}
              volume={volume}
              currentTime={currentTime}
              trackDuration={trackDuration}
              onPlayPause={togglePlayPause}
              onPrevious={previousTrack}
              onNext={nextTrack}
              onSeek={handleSeek}
              onVolumeChange={setVolume}
              formatTime={formatTime}
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
