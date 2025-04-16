// lib/gemini.ts
import axios from 'axios';

export const callGeminiAPI = async (inputMessage: string) => {
  try {
    const response = await axios.post('https://api.gemini.com/v1/chat', {
      apiKey: 'AIzaSyBj1BzzNCg6FOUeic8DTtU3uYNVMaDErQw',
      inputMessage,
    });
    return response.data.reply;
  } catch (error) {
    throw new Error('Error calling Gemini API');
  }
};
