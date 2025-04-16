export const callGeminiAPI = async (chatHistory: ChatPart[]) => {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: chatHistory.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    }),
  });

  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't respond right now.";
};
