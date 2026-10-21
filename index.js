// using readline to get the user inputs from terminal
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// quiz qustions array with questions, choices and the answer key
var questionsList = [
  {
    q: "What is the capital city of Kenya?",
    choices: ["1. Mombasa", "2. Nairobi", "3. Kisumu", "4. Nakuru"],
    ans: 2
  },
  {
    q: "Which keyword is used to declare a constant in JS?",
    choices: ["1. var", "2. let", "3. const", "4. static"],
    ans: 3
  },
  {
    q: "What does CLI stand for?",
    choices: ["1. Command Line Interface", "2. Common Language Input", "3. Control Line Internet", "4. Computer Level Interface"],
    ans: 1
  },
  {
    q: "Which array method adds an item to the end of an array?",
    choices: ["1. shift()", "2. pop()", "3. push()", "4. unshift()"],
    ans: 3
  }
];

// trackin vars for the session
let currentIndex = 0;
let userScore = 0;
let resultsHistory = [];
let timeLimitSecs = 10; // each queston gets 10 secs
let questionTimer;

// start quiz func to print the banner nd prompt user
function startQuiz() {
  console.log("-----------------------------------------");
  console.log("       WELCOME TO THE TRIVIA CLI GAME    ");
  console.log("-----------------------------------------");
  console.log("Rules: Choose options 1 to 4.");
  console.log("Timer is " + timeLimitSecs + " seconds per question!");
  
  rl.question("\nPress enter to begin...", function () {
    nextQuestion();
  });
}

function nextQuestion() {
  // check if we done with all qustions
  if (currentIndex >= questionsList.length) {
    showSummary();
    return;
  }

  let item = questionsList[currentIndex];
  console.log("\n=========================================");
  console.log("Question " + (currentIndex + 1) + "/" + questionsList.length);
  console.log(item.q);

  // loop through choices and print
  for (let i = 0; i < item.choices.length; i++) {
    console.log(item.choices[i]);
  }

  let isTimeUp = false;

  // set up the async timeout feature here
  questionTimer = setTimeout(function () {
    isTimeUp = true;
    console.log("\n⏰ Oops, time is up for this question!");
    
    // push blank/timed out object to the array
    resultsHistory.push({
      questionText: item.q,
      picked: "Timed out",
      correct: false
    });

    currentIndex++;
    nextQuestion();
  }, timeLimitSecs * 1000);

  rl.question("Your answer (1-4): ", function (ansInput) {
    // if timer done already dont do anything
    if (isTimeUp) {
      return;
    }

    // stop the timmer since user answered
    clearTimeout(questionTimer);

    let chosenNumber = parseInt(ansInput);

    // check if input is actually valid number
    if (isNaN(chosenNumber) || chosenNumber < 1 || chosenNumber > 4) {
      console.log("Invalid choice entered, marks missed!");
      resultsHistory.push({
        questionText: item.q,
        picked: ansInput || "None",
        correct: false
      });
    } else {
      if (chosenNumber === item.ans) {
        console.log("Nice! That is correct.");
        userScore++;
        resultsHistory.push({
          questionText: item.q,
          picked: chosenNumber,
          correct: true
        });
      } else {
        console.log("Wrong! The correct answer was option " + item.ans);
        resultsHistory.push({
          questionText: item.q,
          picked: chosenNumber,
          correct: false
        });
      }
    }

    currentIndex++;
    nextQuestion();
  });
}

// final summary func to show score
function showSummary() {
  console.log("\n=========================================");
  console.log("               GAME FINISHED             ");
  console.log("=========================================");
  console.log("Your total score: " + userScore + " out of " + questionsList.length);

  let finalPercent = (userScore / questionsList.length) * 100;
  if (finalPercent >= 75) {
    console.log("Grade: Great job!");
  } else if (finalPercent >= 50) {
    console.log("Grade: Passed, but revise a bit.");
  } else {
    console.log("Grade: Need more practice.");
  }

  console.log("\n--- Breakdown ---");
  // using array method foreach to loop results as per rubric
  resultsHistory.forEach(function (res, index) {
    let mark = res.correct ? "[CORRECT]" : "[WRONG]";
    console.log((index + 1) + ". " + res.questionText);
    console.log("   Selected: " + res.picked + " -> " + mark);
  });

  console.log("\nGoodbye!");
  rl.close();
}

// run quiz
startQuiz();