
import { Moon, Cloud, Waves, Trees, Wind, Music } from 'lucide-react';

// Meditation tracks data with audio URLs
export const tracks = [
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
export const categories = [
  { id: 'all', name: 'All' },
  { id: 'meditation', name: 'Meditation' },
  { id: 'nature', name: 'Nature Sounds' },
  { id: 'music', name: 'Music' },
];
