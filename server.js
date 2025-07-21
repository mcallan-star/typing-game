const express = require('express');
const app = express();
const port = 3000;

// Allow frontend files (test.html etc.)
app.use(express.static('.'));

app.get('/generate-text', (req, res) => {
  const sentences = [
    "Practice makes perfect.",
    "JavaScript is a flexible language.",
    "Keep calm and code on.",
    "The quick brown fox jumps over the lazy dog."
  ];
  const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
  res.send(randomSentence);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}!!!!!!!!!! :)`);
});
