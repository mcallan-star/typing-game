let currentIndex = 0
let tokens = [] // Array to hold all token spans

document.addEventListener('DOMContentLoaded', () => {
    const typingArea = document.getElementById('typing-area');

    function createLineFromText(text) {
        const line = document.createElement('div'); // creates a new div element for the line
        line.classList.add('line');                 // adds a class to the line for styling

        const words = text.split(' ');              // Split by spaces

        words.forEach(word => {
            const wordSpan = document.createElement('span');  // wordSpan holds a new span element for each word
            wordSpan.classList.add('word');                 // adds a class to the word span for styling

            for (const char of word) {
                const token = document.createElement('span');  // token holds a new span for each char
                token.classList.add('token_unit');          // adds a class to the token for styling
                token.textContent = char;                    // sets the text content of the token to the char
                wordSpan.appendChild(token);            // appends the char span to the word span
                tokens.push(token);                     // adds the token to the tokens array (tracks al token spans)
            }

            line.appendChild(wordSpan);             // appends the word span to the line
        });

        typingArea.appendChild(line);               // add each new line to the typing area
        tokens[0].classList.add('current'); //highlight first token in the tokens array
    }


    createLineFromText("asdf");

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
            if (currentIndex > 0) {
                if (currentIndex < tokens.length) {
                    tokens[currentIndex].classList.remove('highlight');
                }
                currentIndex--;
                const token = tokens[currentIndex];
                token.classList.remove('typed', 'wrong-first-pass', 'corrected');
                token.classList.add('highlight');
            }
            return;
        }

        if (e.key === 'Shift' || e.key === 'CapsLock' || e.key.length > 1) return;

        const token = tokens[currentIndex];
        if (!token) return;

        token.classList.remove('highlight');

        const expected = token.textContent;

        if (e.key === expected) {
            if (token.classList.contains('wrong-first-pass')) {
                token.classList.remove('wrong-first-pass');
                token.classList.add('corrected'); // 🟡 yellow if fixed
            } else {
                token.classList.add('typed'); // ✔️ gray
            }
        } else {
            token.classList.add('wrong-first-pass'); // ❌ red
        }

        currentIndex++;
        if (tokens[currentIndex]) {
            tokens[currentIndex].classList.add('highlight');
        }
    });

});
