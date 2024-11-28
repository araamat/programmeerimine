// ühendab HTML-i ID-ga
const wordDiv = document.getElementById("word");
const scoreDiv = document.getElementById("score");
const messageDiv = document.getElementById("message");
const alphabetDiv = document.getElementById("alphabet");

//arvamiste kord
let score = 10;
const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "õ",
  "ä",
  "ö",
  "ü",
  "x",
  "y",
  "z",
];
let guessedLetters = [];

//hiljem sõna API kaudu
let word = await getRandomWord();
console.log(word);

// muudab tähed alakriipsudeks
let guess = word.replace(/[ABDEFGHIJKLMNOPQRSŠZŽTUVÕÄÖÜ]/g, "_");

alphabet.forEach((c) => {
  const letterDiv = document.createElement("div");
  letterDiv.setAttribute("id", c);
  letterDiv.classList.add("letter");
  letterDiv.innerText = c.toUpperCase();

   letterDiv.addEventListener("click", (e) => {
     testLetter(c);
   }),
     alphabetDiv.appendChild(letterDiv);
});

wordDiv.innerText = guess;
scoreDiv.innerText = score;

//JS kuulab, mis klahvi kasutaja vajutab, saab näha Inspector -> Console all kui vajutatud ja töötab
document.addEventListener("keydown", (e) => {
  testLetter(e.key);
});

function testLetter(letter) {

  // võib ära jätta lives !=0, sest lives peab olema true ja 0 on false
  if (
    alphabet.includes(letter) &&
    !guessedLetters.includes(letter) &&
    score != 0
  ) {
    guessedLetters.push(letter);

    const guessedLetterDiv = document.getElementById(letter);

    if (word.includes(letter.toUpperCase())) {
      // i on tähe indeks
      let i = -1;
      let guessArray = guess.split("");

      // do while teeb enne ühe tingimuse, siis kontrollib
      do {
        i = word.indexOf(letter.toUpperCase(), i + 1);
        guessArray[i] = letter.toUpperCase();
        console.log(i);
      } while (i != -1);
      guess = guessArray.join("");
      console.log(guess);
      wordDiv.innerText = guess;
      //kui sõnas pole enam alakriipse
      if (!guess.includes("_")) {
        messageDiv.innerText = "Arvasid ära!";
      }
      guessedLetterDiv.classList.add("correct-letter");
    } else {
      score--;
      scoreDiv.innerText = score;

      if (!score) {
        messageDiv.innerText = "Mäng läbi! Õige sõna oli: " + word;
      }

      guessedLetterDiv.classList.add("wrong-letter");
    }
  }
};

async function getRandomWord() {
  const response = await fetch("hangman.txt");
  let words = await response.text();

  words = words.split("\n");
  const word = words[Math.floor(Math.random() * words.length)];

  return word.toUpperCase();
}
