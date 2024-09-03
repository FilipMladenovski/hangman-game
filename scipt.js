window.onload = function () {
  let selectedWord;
  let lives = 10;
  let dimensions = {};
  let hint;
  let guessedWord = [];
  let gameflag = false;

  let gameOver = function () {
    let keyButtons = document.querySelectorAll(`#key`);
    keyButtons.forEach((button) => {
      button.setAttribute("class", "selectedWord");
      button.disabled = true;
    });

    if (!gameflag) {
      let guessLetter = document.querySelectorAll(`span`);
      for (let i = 0; i < selectedWord.length; i++) {
        if (guessLetter[i].innerHTML === `__ `) {
          guessLetter[i].innerHTML = selectedWord[i].toUpperCase();
        }
      }
      document.getElementById('selectedCat').innerHTML = "Game Over. You Lost It";
    } else {
      document.getElementById('selectedCat').innerHTML = "Game Over. You Win";
    }
  };

  let drawHangman = function (dimension, index) {
    let context = document.getElementById("hangman");
    let ctx = context.getContext("2d");
    ctx.beginPath();
    if (index !== 5) {
      ctx.moveTo(dimension[0], dimension[1]);
      ctx.lineTo(dimension[2], dimension[3]);
    } else if (index >= 0) {
      ctx.arc(dimension[0], dimension[1], dimension[2], dimension[3], 2 * Math.PI);
    }
    ctx.stroke();
    if (index === 0) {
      gameOver();
    }
  };

  let guessDetails = function (letter) {
    let flag = false;

    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i].toUpperCase() === letter) {
        document.querySelector(`span[data-letter="${i}"]`).innerHTML = letter;
        guessedWord[i] = selectedWord[i];
        flag = true;
      }
    }
    if (!flag) {
      lives--;
      let livesDetails = document.getElementById("lives");
      livesDetails.innerHTML = `You have ${lives} lives left`;
      drawHangman(dimensions[String(lives)], lives);
    }
    console.log(guessedWord.join(""), selectedWord.replace(" ", ""));
    if (guessedWord.join("") === selectedWord.replace(" ", "")) {
      gameflag = true;
      gameOver();
    }
  };

  let selectedLetter = function (alpha) {
    let selected = document.getElementById('selectedLat');
    let letter = String.fromCharCode(alpha);
    let text = document.createTextNode(letter);

    let button = document.querySelector(`button[data-key="${alpha}"]`);
    button.setAttribute("class", "selectedWord");
    button.disabled = true;

    guessDetails(letter);
  };

  let getHint = function () {
    let hintVal = document.getElementById("hint");
    if (lives >= 2) {
      hintVal.innerHTML = "You chose to lose 2 lives by clicking on Hint";
      setTimeout(() => {
        hintVal.innerHTML = `Hint: '${hint}'`;
      }, 3000);
      guessDetails("%");
      guessDetails("%");
    } else {
      hintVal.innerHTML = "Sorry, cannot give you hints as it would cost you 2 of your lives and you don't have enough lives";
    }
  };

  let generateKeys = function () {
    let keyList = document.getElementById('keyList');
    for (let alpha = 65; alpha < 91; alpha++) {
      let button = document.createElement("button");
      let text = document.createTextNode(String.fromCharCode(alpha));
      button.appendChild(text);
      button.id = "key";
      button.addEventListener("click", () => {
        selectedLetter(alpha);
      });
      button.dataset.key = alpha;
      keyList.appendChild(button);
    }
    let hintKey = document.getElementById('clue');
    hintKey.addEventListener("click", () => {
      getHint();
    });
  };

  let guessWord = function (originalWord) {
    let selectedLetter = document.getElementById("selectedLat");
    for (let i = 0; i < selectedWord.length; i++) {
      var span = document.createElement("span");
      if (selectedWord[i] === " ") {
        span.appendChild(document.createTextNode(`  -  `));
      } else {
        span.appendChild(document.createTextNode(`__ `));
        span.dataset.letter = i;
      }
      selectedLetter.appendChild(span);
    }
  };

  let selectedCat = function () {
    let category = ["Movies", "Sport", "Monuments"];
    let categoryWords = [
      ["Jurassic Park", "Commando", "Mission Impossible"],
      ["Cristiano Ronaldo", "Lionel Messi", "Zinedine Zidane", "Ronaldinho", "David Beckham"],
      ["Stonehenge", "Pyramids", "Taj Mahal"]
    ];
    let hints = [
      ["an American science fiction media franchise created by Michael Crichton and centered on a disastrous attempt to create a theme park of cloned dinosaurs.",
        "Quote: 'Remember, Sully, when I promised to kill you last, I lied.'",
        "Quote: 'Red light. Green light.'"],
      ["Portuguese professional footballer who plays as a forward for and captains both Saudi Pro League club Al Nassr",
        "Argentine professional footballer who plays as a forward for and captains both Major League Soccer club Inter Miami and the Argentina national team.",
        "Popularly known as Zizou, is a French professional football manager and former player",
        "Brazilian retired professional footballer who played mostly as an attacking midfielde",
        "English former professional footballer, the current president and co-owner of Inter Miami"],
      ["The enigmatic monument of Neolithic and Bronze Age", "The majestic ancient monuments mark the glory of Ancient Egypt", "Symbol of love"]
    ];

    let selectedCategory = Math.floor(Math.random() * 3);
    let selectedWordIndex = Math.floor(Math.random() * 3);
    selectedWord = categoryWords[selectedCategory][selectedWordIndex];
    hint = hints[selectedCategory][selectedWordIndex];
    let text = document.createTextNode(`The choosen category is ${category[selectedCategory]}`);
    document.getElementById("selectedCat").appendChild(text);
    let livesDetails = document.getElementById("lives");
    livesDetails.innerHTML = `You have ${lives} lives left`;
    guessWord(selectedWord);
  };

  generateKeys();
  selectedCat();
};
