let currentQuestionNum = 0;
let score = 0;
let questionOrder = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let currentQuestion = 0;
let hintsNum = 3;
let ansOrder = [0, 0, 0, 0];
let isValidAnsNum = true;
let currentQuestionContent = null;
let ans1 = "";
let ans2 = "";
let ans3 = "";
let ans4 = "";
let isHintDisplayed = false;
let highscore = 0;
let totalScore = 0;
let timeleft = 15;
let downloadTimer = 0;
let beginTime = timeleft;
let message = "";
let elapsedTime = 0;
let questions = [
  {
    question: "What is name and location of the main shipyard in Star Trek?",
    a: "Utopia Planitia, Mars",
    b: "Utopia Planitia, Jupiter",
    c: "Earth Spacedock, Earth",
    d: "Elysium Planitia, Mars",
    image: "quizimages/q1.jpg",
    answer: "a",
    hint: "The Red Planet",
  },
  {
    question: "Jean-Luc Picard appeared in which TV show as a guest star?",
    a: "Star Trek: Voyager",
    b: "Star Trek: Enterprise",
    c: "Star Trek: Deep Space Nine",
    d: "Star Trek: Discovery",
    image: "quizimages/q2.jpg",
    answer: "c",
    hint: "This show overlapped with The Next Generation",
  },
  {
    question:
      "John de Lancie first appeared as Q in the pilot episode of the Next Generation, but did he also appear in Deep Space Nine and Voyager?",
    a: "Only in Voyager",
    b: "Deep Space Nine and Voyager",
    c: "Only in Deep Space Nine",
    d: "He didn't appear in either",
    image: "quizimages/q3.jpg",
    answer: "b",
    hint: "He was in the Gamma Quandrant",
  },
  {
    question:
      "Robert Picardo (The EMH) was a guest star in which of the following Next Generation movies?",
    a: "Star Trek: Generations",
    b: "Star Trek: Insurrection",
    c: "Star Trek: First Contact",
    d: "Star Trek: Nemesis",
    image: "quizimages/q4.jpg",
    answer: "c",
    hint: "This movie invovled the first Human warp flight",
  },
  {
    question:
      "The original plan for the Enterprise D included a room for 'Cetacean Ops'. This refers to: ",
    a: "Starfishes",
    b: "Jellyfish",
    c: "Crabs",
    d: "Dolphins",
    image: "quizimages/q5.jpg",
    answer: "d",
    hint: "What is shown on the diagram",
  },
  {
    question:
      "Which member of the Enterprise D's crew has a saddle, and rides horses in the holodeck?",
    a: "Reginald Barclay",
    b: "Will Riker",
    c: "Jean-Luc Picard",
    d: "Data",
    image: "quizimages/q6.jpg",
    answer: "c",
    hint: "One of the bridge crew",
  },
  {
    question:
      "What is the name of the insurgent group made up of former Federation colonists?",
    a: "Maquis",
    b: "Bajorans",
    c: "Cardassians",
    d: "Tal Shiar",
    image: "quizimages/q7.jpg",
    answer: "a",
    hint: "Same name as a French WWII Resistance Cell",
  },
  {
    question: "What Class of Starship is the Enterprise D?",
    a: "Defiant Class",
    b: "Constitution Class",
    c: "Galaxy Class",
    d: "Miranda Class",
    image: "quizimages/q8.jpg",
    answer: "c",
    hint: "The USS Defiant was featured prominently on Deep Space Nine",
  },
  {
    question:
      "Which of these characters made simulations involving other officers on the holodeck?",
    a: "Wesley Crusher",
    b: "Reginald Barclay",
    c: "Ro Laren",
    d: "Nog",
    image: "quizimages/q9.jpg",
    answer: "b",
    hint: "A Human",
  },
  {
    question: "Which of the following Klingons has the biggest eyes?",
    a: "Worf",
    b: "Kahless",
    c: "Gowron",
    d: "Martok",
    image: "quizimages/q10.jpg",
    answer: "c",
    hint: "Emperor of the Klingon Empire",
  },
];

window.onload = function () {
  document.getElementById("menuBtn").addEventListener("click", loadMainMenu);

  loadMainMenu();

  // loadQuestion();
};

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}

function loadMainMenu() {
  document.getElementById("container").style.display = "none";
  document.getElementById("header").style.display = "none";
  document.getElementById("lightbox").style.backgroundColor = "rgba(0,0,0,0.5)";
  makeQuestionOrder();
  currentQuestionNum = 0;
  timeleft = 30;

  if (score > highscore) {
    highscore = score;
  }

  score = 0;
  document.getElementById("score").innerHTML = score;

  clearInterval(downloadTimer);
  document.getElementById("countdown").innerHTML = "";

  document.getElementById("message").style.paddingTop = "0";

  message =
    "<h3 id='menuHeader'>Star Trek Quiz</h3>  <p class='welcomeMsg'>Your highscore is " +
    highscore +
    "</p><p class='welcomeMsg'>Click on the screen when you're ready to begin, there will be " +
    questions.length +
    " questions.</p><p class='welcomeMsg'>There will be a " +
    timeleft +
    " second timer that will persist over the entire quiz, but you will get time added for answering quickly.</p><p class='welcomeMsg'> Your score is also based on the amount of time you took to answer each question.</p>";

  // show the lightbox
  document.getElementById("lightbox").style.display = "block";
  document.getElementById("message").innerHTML = message;
}

// show hint if max hints not reached
function getHint() {
  if (!isHintDisplayed) {
    if (hintsNum > 0) {
      document.getElementById("hint").innerHTML =
        questions[currentQuestion].hint;
      isHintDisplayed = true;
      hintsNum--;
    } else {
      document.getElementById("hint").innerHTML =
        "You've used all of your hints.";
    }
  }

  document.getElementById("hintButton").removeEventListener;
}

function makeAnsOrder() {
  for (let i = 0; i < ansOrder.length; i++) {
    if (i > 0) {
      do {
        isValidAnsNum = true;
        ansOrder[i] = Math.floor(Math.random() * 4 + 1);

        for (let j = 0; j < i; j++) {
          if (ansOrder[i] == ansOrder[j]) {
            isValidAnsNum = false;
          }
        }
      } while (!isValidAnsNum);
    } else {
      ansOrder[i] = Math.floor(Math.random() * 4 + 1);
    }
  }

  for (let i = 0; i < ansOrder.length; i++) {
    if (i == 0) {
      if (ansOrder[i] == 1) {
        ans1 = "a";
      } else if (ansOrder[i] == 2) {
        ans1 = "b";
      } else if (ansOrder[i] == 3) {
        ans1 = "c";
      } else if (ansOrder[i] == 4) {
        ans1 = "d";
      }
    } else if (i == 1) {
      if (ansOrder[i] == 1) {
        ans2 = "a";
      } else if (ansOrder[i] == 2) {
        ans2 = "b";
      } else if (ansOrder[i] == 3) {
        ans2 = "c";
      } else if (ansOrder[i] == 4) {
        ans2 = "d";
      }
    } else if (i == 2) {
      if (ansOrder[i] == 1) {
        ans3 = "a";
      } else if (ansOrder[i] == 2) {
        ans3 = "b";
      } else if (ansOrder[i] == 3) {
        ans3 = "c";
      } else if (ansOrder[i] == 4) {
        ans3 = "d";
      }
    } else if (i == 3) {
      if (ansOrder[i] == 1) {
        ans4 = "a";
      } else if (ansOrder[i] == 2) {
        ans4 = "b";
      } else if (ansOrder[i] == 3) {
        ans4 = "c";
      } else if (ansOrder[i] == 4) {
        ans4 = "d";
      }
    }
  }
}

function makeQuestionOrder() {
  let existingQuestions = 0;

  for (let i = 0; i < questionOrder.length; i++) {
    questionOrder[i] = Math.floor(Math.random() * 10);

    if (i > 0) {
      // check if the random question number has been used before
      do {
        existingQuestions = 0;
        questionOrder[i] = Math.floor(Math.random() * 10);

        for (let j = 0; j < i; j++) {
          if (questionOrder[i] == questionOrder[j]) {
            existingQuestions++;
          }
        }
      } while (existingQuestions >= 1);
    }
  }
}

function loadQuestion() {
  // style the background elements for questions
  document.getElementById("container").style.display = "block";
  document.getElementById("header").style.display = "block";
  document.getElementById("lightbox").style.backgroundColor = "rgba(0,0,0,0.8)";

  currentQuestion = questions[currentQuestionNum];

  makeAnsOrder();

  isHintDisplayed = false;
  document.getElementById("hint").innerHTML =
    "You have " + hintsNum + " hints remaining";

  // call the function every 1000 ms or 1 second
  downloadTimer = setInterval(timer, 1000);

  document.getElementById("hintButton").addEventListener("click", getHint);
  // close light box for first question
  // if (currentQuestion == 0) {
  // closeLightBox();
  // }

  currentQuestion = questionOrder[currentQuestionNum];


  // load the image
  let img = document.getElementById("image");
  img.src = questions[currentQuestion].image;
  img.style.width = "auto";
  img.style.height = "30vh";

  // load the question and answers
  document.getElementById("question").innerHTML =
    questions[currentQuestion].question;
  document.getElementById("a").innerHTML =
    "A. " + questions[currentQuestion][ans1];
  document.getElementById("b").innerHTML =
    "B. " + questions[currentQuestion][ans2];
  document.getElementById("c").innerHTML =
    "C. " + questions[currentQuestion][ans3];
  document.getElementById("d").innerHTML =
    "D. " + questions[currentQuestion][ans4];
} // loadQuestion

function timer() {
  // update display
  document.getElementById("countdown").innerHTML =
    timeleft + " seconds remaining";
  timeleft--; // decrement time left

  // if time runs out, end timer
  if (timeleft <= 0) {
    message = "You ran out of time. <br> Your score was " + score;
    message += "<div id='restart'>Return to menu</div>";

    // show the lightbox
    document.getElementById("lightbox").style.display = "block";
    document.getElementById("message").style.paddingTop = "200px";
    document.getElementById("message").innerHTML = message;
  }
}

function markIt(ans) {
  clearInterval(downloadTimer);

  message = "";

  elapsedTime = beginTime - timeleft;

  // add time based on how long it took to answer question
  if (elapsedTime <= 5) {
    timeleft += 6;
  } else if (elapsedTime <= 10) {
    timeleft += 4;
  } else {
    timeleft += 2;
  }

  if (currentQuestionNum == questions.length) {
    document.getElementById("lightbox").style.display = "block";
    document.getElementById("message").innerHTML = message;
  } else {
    if (ans == questions[currentQuestion].answer) {
      // score the user based on how long it took to answer the question
      if (elapsedTime <= 3) {
        score += 100;
      } else if (elapsedTime <= 7) {
        score += 50;
      } else if (elapsedTime <= 15) {
        score += 30;
      } else {
        score += 10;
      }

      // display score
      document.getElementById("score").innerHTML = score;

      message = "Correct! Your current score is " + score;
    } else {
      message = "Incorrect. Your current score is " + score;
    } // else
  }

  // move to the next question
  currentQuestionNum++;
  if (currentQuestionNum >= questions.length) {
    // create a special message
    if (score > 500) {
      message = score + " points, Wow! You're cleary a fan!";
    } else if (score > 200) {
      message = score + " points, That's pretty good!";
    } else if (score > 100) {
      message = score + " points, At least it's not zero.";
    } else {
      message = score + " points, You must be new to the show.";
    }

    // add ability to restart quiz
    message += "<div id='restart'>Return to menu</div>";
  }

  // show the lightbox
  document.getElementById("lightbox").style.display = "block";
  document.getElementById("message").style.paddingTop = "200px";
  document.getElementById("message").innerHTML = message;

  beginTime = timeleft;
} // markIt

function closeLightBox() {
  // prevent lightbox from closing if the timer is out or the user is on the final question
  if (timeleft <= 0) {
    loadMainMenu();
  } else if (currentQuestionNum < questions.length) {
    document.getElementById("lightbox").style.display = "none";
    loadQuestion();
  } else {
    loadMainMenu();
  }
} // closeLightbox
