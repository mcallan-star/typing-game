
const express = require('express');

const app = express();
const port = 3000;

app.use(express.static('.'));

app.get('/generate-text', async (req, res) => {
  try {
    const randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26)); // Random letter from 'a' to 'z'
    const prompt = `Give me a sentence that is fun to type. No quotation marks. Start with the sentence with the letter '${randomLetter}'. Do not use alliteration.`;
    console.log(`Generated prompt: ${prompt}`);
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gemma3',
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.1
        }
      })
    });
    
    const data = await response.json();
    const text = data.response.trim();
    res.send(text);
  } catch (err) {
    console.error('Error from Ollama:', err);
    res.status(500).send('Failed to fetch text from local LLM.');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
