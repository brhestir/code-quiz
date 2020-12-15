// main.js
// The main javascript file for the code-quiz app

// We want a root element.  This will be the middle row.

// For each "card", we want to 
// - Consider program state (what card are we on)
// - What is the form of this card? Intro? Question? HS?
// - Based on card form, read from data array variable
// - Generate card using data in the array.

var questionAnswerArray = [
  [ "Commonly used data types DO NOT include:",
    [ [ "Strings", "false" ],
      [ "Booleans", "false" ],
      [ "Alerts", "true" ],
      [ "Numbers", "false" ]
    ]
  ],
  [ "The condition in an if / else statement is enclosed within _____.",
    [ [ "quotes", "false" ],
      [ "curly brackets", "false" ],
      [ "parentheses", "true" ],
      [ "square brackets", "false" ]
    ]
  ],
  [ "Arrays in JavaScript can be used to store _____.",
    [ [ "numbers and strings", "false" ],
      [ "other arrays", "false" ],
      [ "booleans", "false" ],
      [ "all of the above", "true" ]
    ]
  ],
  [ "String values must be enclosed within _____ when being assigned to variables.",
    [ [ "commas", "false" ],
      [ "curly brackets", "false" ],
      [ "quotes", "true" ],
      [ "parentheses", "false" ]
    ]
  ],
  [ "The Javascript language has what of the following properties?",
    [ [ "strongly typed", "false" ],
      [ "turing complete", "false" ],
      [ "piecewise comprehensble", "false" ],
      [ "first-class functions", "true" ]
    ] 
  ]
];

var questionState = 0;    // Global UI state counter
var timerState = 75;      // Time remaining counter
var timerID;              // setInterval id so we can clearInterval later
var timerActive = false;  // timer on/off flag

///////////////////////////////////////////
// Intro card
//////////////////////////////////////////
function displayIntroCard(){
  // Obtain root element
  var rootDiv = document.getElementById("rootDiv");
  // Obtain and clear child of root (clear UI)
  if(rootDiv.firstChild){
    rootDiv.removeChild(rootDiv.firstChild);
  }

  var mainDiv = document.createElement("div");
  mainDiv.setAttribute("id", "trunkDiv");
  mainDiv.className = "d-flex flex-column align-items-center mt-3";
  rootDiv.append(mainDiv);

  // Obtain and configure content element list
  var headingElement = document.createElement("h3");
  headingElement.textContent = "Coding Quiz Challenge";
  mainDiv.append(headingElement);

  var textElement = document.createElement("p");
  textElement.className = "text-center";
  textElement.textContent = "Try to answer the following code-related questions within the time limit.  Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
  mainDiv.append(textElement);

  var btnElement = document.createElement("button");
  btnElement.className = "btn btn-primary";
  btnElement.textContent = "Start Quiz";
  mainDiv.append(btnElement);

  // Point button-click event to show Q1
  btnElement.addEventListener("click", startQuiz, false);

};

function startQuiz(){
  timerState = 75;        // Set initial timer state to 75 seconds
  timerActive = true;     // Turn timer on
  displayQuestionCard();  // Show question
}

function updateTimer(){
  var timerEl = document.getElementById("timerElement");
  if(timerActive===true){
    if(timerState>0){
      timerState -= 1;
    }
    else{
      console.log("TIME IS UP!");
      clearTimeout(timerID);        // stop timer
      // do other time is up action here
    }
    // Update timer display
    timerEl.textContent = "Time Remaining: " + timerState;  
  }
  else{
    // do nothing
  }
}

function displayQuestionCard(){
  // Obtain root element
  var rootDiv = document.getElementById("rootDiv");
  // Obtain and clear child of root (clear UI)
  if(rootDiv.firstChild){
    rootDiv.removeChild(rootDiv.firstChild);
  }

  var mainDiv = document.createElement("div");
  mainDiv.setAttribute("id", "trunkDiv");
  mainDiv.className = "d-flex flex-column align-items-center mt-3";
  rootDiv.append(mainDiv);

  // Obtain and configure content element list
  var headingElement = document.createElement("h3");
  headingElement.textContent = questionAnswerArray[questionState][0]; //[0] implies Q part
  mainDiv.append(headingElement);

  // Generate container div for answer buttons buttons
  var btnContainer = document.createElement("div");
  btnContainer.className = "d-grid gap-1 btnContainer";
  mainDiv.append(btnContainer);

  // Generate answer button elements from array details
  for(var i=0; i<4; i++){
    var btnElement = document.createElement("button");
    btnElement.className = "btn btn-primary btn-sm";
    btnElement.textContent = ""+(i+1)+". " + questionAnswerArray[questionState][1][i][0]; //[1][0][0] -> answer[0]text
    btnElement.setAttribute("data-index", i);
    
    

    btnContainer.append(btnElement);

  };  // end for

  // button click event handler section
  btnContainer.addEventListener("click", btnClickHandler);

};

function btnClickHandler(event){
  var btnIndex = event.target.getAttribute("data-index"); // btn index as created earlier
  if(questionAnswerArray[questionState][1][btnIndex][1] === "true"){
    console.log("Answer is TRUE!");
    questionState++;
  }
  else if( questionAnswerArray[questionState][1][btnIndex][1] === "false"){
    // Decrement main timer by 10 seconds
    if(timerState>=10){
      timerState -= 10;
    }
    else{
      timerState = 0;   // set timer to minimum
    }
  }
  else{
    console.log("Answer is NEITHER TRUE NOR FALSE");
  }
}

function displaySummaryCard(){

};

function displayHighscoreCard(){

};

displayIntroCard();
timerID = setInterval(updateTimer, 1000);