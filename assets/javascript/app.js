
var panel = $("#quiz-area");
var countStartNumber = 30;

// Question set
var questions = [
  {
    question:
      "How does Harry manage to breathe underwater during the second task of the Triwizard Tournament?",
    answers: [
      "turns into a shark",
      "Kisses a mermaid",
      "Eats Gillyweed",
      "bubble head charm"
    ],
    correctAnswer: "Eats Gillyweed",
    image: "assets/images/gillyweed.gif"
  },
  {
    question: "What is the name of Fred and George's joke shop?",
    answers: ["Weasleys Wizzard Wheezes", "The Emporium", "Zonko's Jokes"],
    correctAnswer: "Weasleys Wizzard Wheezes",
    image: "assets/images/weaslywheezes.gif"
  },
  {
    question: "Which of these is NOT one of the Unforgivable Curses?",
    answers: [
      "Cruciatus Curse",
      "Imperius Curse",
      "Sectumsempra",
      "Avada Kedavra"
    ],
    correctAnswer: "Sectumsempra",
    image: "assets/images/sectumsempra.gif"
  },
  {
    question: "Who plays Lord Voldemort in the movies?",
    answers: ["Jeremy Irons", "Tom Hiddleston", "Gray Oldman", "Ralph Fiennes"],
    correctAnswer: "Ralph Fiennes",
    image: "assets/images/voldemort.gif"
  },
  {
    question: "Who guards the entrance to the Gryffindor common room?",
    answers: [
      "The Grey Lady",
      "The fat friar",
      "The bloody baron",
      "The Fat Lady"
    ],
    correctAnswer: "The Fat Lady",
    image: "assets/images/fatlady.gif"
  },
  {
    question: "Who is NOT a member of the Order of the Phoenix?",
    answers: [
      "Cornelius Fudge",
      "Mad Eye Moody",
      "Professor Snape",
      "Remus Lupin"
    ],
    correctAnswer: "Cornelius Fudge",
    image: "assets/images/fudge.gif"
  },
  {
    question: "Who played Ron Weasley in the movies?",
    answers: [
      "Kieran Kulkan",
      "Rupert Grint",
      "Tyler Hoechlin",
      "Daniel Radcliffe"
    ],
    correctAnswer: "Rupert Grint",
    image: "assets/images/ron.gif"
  },
  {
    question: "A wizard who cannot do magic is known as a:",
    answers: ["Bleaker", "Squib", "Duddle", "Wizont"],
    correctAnswer: "Squib",
    image: "assets/images/squib.gif"
  }
];

// Variable to hold our setInterval
var timer;

var game = {

  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    game.counter--;
    $("#counter-number").text(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.timeUp();
    }
  },

  loadQuestion: function() {

    timer = setInterval(game.countdown, 1000);

    panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      panel.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
  },

  nextQuestion: function() {
    game.counter = countStartNumber;
    $("#counter-number").text(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

  timeUp: function() {

    clearInterval(timer);

    $("#counter-number").html(game.counter);

    panel.html("<h2>Out of Time!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  results: function() {

    clearInterval(timer);

    panel.html("<h2>All done, heres how you did!</h2>");

    $("#counter-number").text(game.counter);

    panel.append("<h3>Correct Answers: " + game.correct + "</h3>");
    panel.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
    panel.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
    panel.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    game.incorrect++;

    clearInterval(timer);

    panel.html("<h2>Nope!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
    panel.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  answeredCorrectly: function() {

    clearInterval(timer);

    game.correct++;

    panel.html("<h2>Correct!</h2>");
    panel.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

// CLICK EVENTS

$(document).on("click", "#start-over", function() {
  game.reset();
});

$(document).on("click", ".answer-button", function(e) {
  game.clicked(e);
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQuestion();
});
