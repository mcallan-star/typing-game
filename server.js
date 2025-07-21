
const express = require('express');

const app = express();
const port = 3000;

app.use(express.static('.'));

app.get('/generate-text', async (req, res) => {
  try {
    const randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26)).toUpperCase(); // Random letter from 'a' to 'z'

    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gemma3',
        messages: [
          { role: "user", content: "Give me a sentence. No quotation marks." },
          { role: "assistant", content: randomLetter }
        ],
        stream: false,
        options: {
          temperature: 1.7,
        }
      })
    });
    
    const data = await response.json();
    console.log('Response from Ollama:', data);
    const text = randomLetter + data.message.content;
    res.send(text);
  } catch (err) {
    console.error('Error from Ollama:', err);
    res.status(500).send('Failed to fetch text from local LLM.');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
