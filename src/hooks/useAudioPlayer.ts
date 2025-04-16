
import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { tracks } from '@/data/meditationTracks';

export type Track = typeof tracks[0];

export interface AudioPlayerState {
  isPlaying: boolean;
  currentTrack: Track;
  volume: number[];
  progress: number;
  trackDuration: number;
  currentTime: number;
}

export const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [volume, setVolume] = useState([70]);
  const [progress, setProgress] = useState(0);
  const [trackDuration, setTrackDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const progressInterval = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  // Initialize audio element
  useEffect(() => {
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio();
      
      // Add event listeners
      audioRef.current.addEventListener('loadedmetadata', () => {
        if (audioRef.current) {
          setTrackDuration(audioRef.current.duration);
        }
      });
      
      audioRef.current.addEventListener('timeupdate', () => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
          const calculatedProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
          setProgress(isNaN(calculatedProgress) ? 0 : calculatedProgress);
        }
      });
      
      audioRef.current.addEventListener('ended', nextTrack);
      
      // Set initial source and volume
      audioRef.current.src = currentTrack.audioUrl;
      audioRef.current.volume = volume[0] / 100;
      audioRef.current.load();
    }
    
    // Clean up function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('loadedmetadata', () => {});
        audioRef.current.removeEventListener('timeupdate', () => {});
        audioRef.current.removeEventListener('ended', nextTrack);
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
      // Reset progress
      setProgress(0);
      setCurrentTime(0);
      
      // Update source and load new track
      audioRef.current.src = currentTrack.audioUrl;
      audioRef.current.load();
      audioRef.current.volume = volume[0] / 100;
      
      // Play if was playing before track change
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Playback started successfully
            })
            .catch(err => {
              console.error("Error playing audio:", err);
              setIsPlaying(false);
              toast({
                title: "Playback Error",
                description: "There was an error playing this track. Please try again.",
                variant: "destructive",
              });
            });
        }
      }
    }
  }, [currentTrack, toast]);

  // Update volume when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100;
    }
  }, [volume]);

  // Handle play/pause
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(err => {
            console.error("Error playing audio:", err);
            setIsPlaying(false);
            toast({
              title: "Playback Error",
              description: "There was an error playing this track. Please try again.",
              variant: "destructive",
            });
          });
      }
    }
  };

  // Handle track selection
  const selectTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    
    if (audioRef.current) {
      // Update UI immediately while audio loads
      setProgress(0);
      setCurrentTime(0);
      
      audioRef.current.src = track.audioUrl;
      audioRef.current.load();
      
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .catch(err => {
            console.error("Error playing audio:", err);
            setIsPlaying(false);
            toast({
              title: "Playback Error",
              description: "There was an error playing this track. Please try again.",
              variant: "destructive",
            });
          });
      }
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

  // Format time from seconds
  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Handle seeking in the track
  const handleSeek = (newProgress: number[]) => {
    if (!audioRef.current || isNaN(audioRef.current.duration)) return;
    
    const seekTime = (newProgress[0] / 100) * audioRef.current.duration;
    audioRef.current.currentTime = seekTime;
    setProgress(newProgress[0]);
  };

  return {
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
  };
};
