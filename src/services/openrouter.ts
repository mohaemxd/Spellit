import axios from 'axios';

const apiKey = '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';
const model = 'google/gemini-flash-1.5-8b-exp';

async function fetchWordFromPublicAPI(retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      // 1. Get a random word
      const wordRes = await axios.get('https://random-word-api.herokuapp.com/word?number=1');
      console.log('Random Word API response:', wordRes.data);
      const word = wordRes.data[0];
      // 2. Get its definition and example
      try {
        const dictRes = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const entry = dictRes.data[0];
        const definition = entry.meanings?.[0]?.definitions?.[0]?.definition || 'No definition found.';
        const example = entry.meanings?.[0]?.definitions?.[0]?.example || 'No example found.';
        return { word, definition, example };
      } catch (dictErr) {
        console.log(`Dictionary API failed for word "${word}":`, dictErr);
        // Try another word
        continue;
      }
    } catch (e) {
      console.log(`Public API attempt ${i + 1} failed:`, e);
    }
  }
  // Fallback to a static word
  return {
    word: 'example',
    definition: 'A thing characteristic of its kind or illustrating a general rule.',
    example: 'This painting is an example of his early work.',
  };
}

export async function fetchRandomWord() {
  const prompt = `Give me a random English word, its definition, and an example sentence. Format your response as:\nWord: <word>\nDefinition: <definition>\nExample: <example>`;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model,
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Debug: log the raw response
    console.log('OpenRouter response:', response.data);

    const content = response.data.choices[0].message.content;

    // Try to parse line-by-line
    const wordMatch = content.match(/Word:\s*(.*)/i);
    const defMatch = content.match(/Definition:\s*(.*)/i);
    const exMatch = content.match(/Example:\s*(.*)/i);
    if (wordMatch && defMatch && exMatch) {
      return {
        word: wordMatch[1].trim(),
        definition: defMatch[1].trim(),
        example: exMatch[1].trim(),
      };
    }
  } catch (e) {
    console.log('LLM fetch failed, falling back to public API:', e);
  }

  // Fallback to public API
  return await fetchWordFromPublicAPI();
} 