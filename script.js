document.addEventListener('DOMContentLoaded', () => {
    const typingArea = document.getElementById('typing-area');

    function createLineFromText(text) {
        const line = document.createElement('div'); // creates a new div element for the line
        line.classList.add('line');  // adds a class to the line for styling

        const words = text.split(' '); // Split by spaces

        words.forEach(word => {
            const wordSpan = document.createElement('span');  // wordSpan holds a new span element for each word
            wordSpan.classList.add('word');  // adds a class to the word span for styling

            for (const char of word) {
                const token = document.createElement('span');  // token holds a new span for each char
                token.classList.add('token_unit'); // adds a class to the token for styling
                token.textContent = char;          // sets the text content of the token to the char
                wordSpan.appendChild(token);  // appends the char span to the word span
            }

            line.appendChild(wordSpan);  // appends the word span to the line
        });

        typingArea.appendChild(line);  // add each new line to the typing area
    }


    createLineFromText("asdf");

    document.addEventListener('keydown', (e) => {
        console.log(`the ${e.key} Key was pressed: `);
        typingArea.textContent += e.key;
    });
});
