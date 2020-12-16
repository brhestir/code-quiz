// main.js
// The main javascript file for the code-quiz app

// Container array for question/answers/truth-value data
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
  [ "A very useful tool used furing development and debugging for printing content to the debugger is:",
    [ [ "JavaScript", "false" ],
      [ "terminal / bash", "false" ],
      [ "for loops", "false" ],
      [ "console.log", "true" ]
    ] 
  ]
];

var locStorage = window.localStorage;     // localStorage access object

var questionState = 0;                // Global UI state counter
var timerState = 75;                  // Time remaining counter
var timerID;                          // setInterval id so we can clearInterval later
var timerActive = false;              // timer on/off flag
var answerStatusTimerID = -1;
var answerStatusTimerActive = false;  
var answerStatus = false;
var hsInitials = "";
var hsValue = 0;
var timerDiv;                         // ref to time remaining div
var btnViewHighscoresDiv;             // ref to viewHighscoresDiv

function displayIntroCard(){

  questionState = 0;    // reinit
  timerState = 0;       // reinit
  timerActive = false;  // reinit
  hsInitials = "";      // reinit
  hsValue = 0;          // reinit

  // redisplay header content
  timerEl.textContent = "Time: " + timerState;
  timerEl.className = "p-2 visible";
  btnViewHighscoresDiv.className = "p-2 visible";

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
  btnElement.className = "btn btn-primary btn-sm text-nowrap";
  btnElement.textContent = "Start Quiz";
  mainDiv.append(btnElement);

  // Point button-click event to show Q1
  btnElement.addEventListener("click", startQuiz, false);

};

function displayQuestionCard(){
  // Obtain root element
  var rootDiv = document.getElementById("rootDiv");
  // Obtain and clear child of root (clear UI)
  if(rootDiv.firstChild){
    rootDiv.removeChild(rootDiv.firstChild);
  }

  var mainDiv = document.createElement("div");
  mainDiv.setAttribute("id", "trunkDiv");
  mainDiv.className = "d-flex flex-column justify-content-start mt-3";
  rootDiv.append(mainDiv);

  // Obtain and configure content element list
  var headingElement = document.createElement("h4");
  headingElement.textContent = questionAnswerArray[questionState][0]; //[0] implies Q part
  mainDiv.append(headingElement);

  // Generate container div for answer buttons buttons
  var btnContainer = document.createElement("div");
  btnContainer.className = "d-grid flex-column gap-1 btnContainer";
  mainDiv.append(btnContainer);

  // Generate answer button elements from array details
  for(var i=0; i<4; i++){
    var btnElement = document.createElement("button");
    btnElement.className = "btn btn-primary btn-sm text-nowrap";
    btnElement.textContent = ""+(i+1)+". " + questionAnswerArray[questionState][1][i][0]; //[1][0][0] -> answer[0]text
    btnElement.setAttribute("data-index", i);
    btnContainer.append(btnElement);
  };

  // button click event handler section
  btnContainer.addEventListener("click", btnClickHandler);
};

function displaySummaryCard(){
  timerActive = false;    // halt timer
  hsValue = timerState;   // store time remaining as final score
  
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
  headingElement.textContent = "All done!";
  mainDiv.append(headingElement);

  // Obtain and configure content element list
  var paragraphElement = document.createElement("p");
  paragraphElement.textContent = "Your final score is " + hsValue;
  mainDiv.append(paragraphElement);

  // Generate container div for highscore form elements
  var flexDiv = document.createElement("div");
  flexDiv.className = "d-flex align-items-start w-100";
  mainDiv.append(flexDiv);

  var initialsDiv = document.createElement("p");
  initialsDiv.className = "smallText m-2 text-nowrap";
  initialsDiv.textContent = "Enter initials:";
  flexDiv.append(initialsDiv);

  var inputDiv = document.createElement("input");
  inputDiv.className = "form-control form-control-sm flex-grow-1 m-1";
  inputDiv.setAttribute("id", "inputDivControlInput");
  flexDiv.append(inputDiv);

  var buttonDiv = document.createElement("button");
  buttonDiv.className = "btn btn-primary btn-sm m-1";
  buttonDiv.textContent = "Submit";
  buttonDiv.setAttribute("id", "btnSubmit");
  flexDiv.append(buttonDiv);

  // button click event handler section
  buttonDiv.addEventListener("click", btnClickHandler);
};

function displayHighscoreCard(){
  timerEl.className = "p-2 invisible";
  btnViewHighscoresDiv.className = "p-2 invisible";

  if(!locStorage.getItem('hsArray')){
    hsArray = [];
  }
  else{
    hsArray = JSON.parse(locStorage.getItem('hsArray'));
  }

  var rootDiv = document.getElementById("rootDiv");   // Obtain root element
  // Obtain and clear child of root (clear UI)
  if(rootDiv.firstChild){
    rootDiv.removeChild(rootDiv.firstChild);
  }

  var mainDiv = document.createElement("div");
  mainDiv.setAttribute("id", "trunkDiv");
  mainDiv.className = "d-flex flex-column justify-content-start mt-3";
  rootDiv.append(mainDiv);

  // Obtain and configure content element list
  var headingElement = document.createElement("h3");
  headingElement.textContent = "Highscores";
  mainDiv.append(headingElement);

  // Generate container div for highscore elements
  var containerDiv = document.createElement("div");
  containerDiv.className = "container-fluid m-0 p-0";
  mainDiv.append(containerDiv);

  // HIGHSCORE LOAD/RENDER
  for(var i=0; i<hsArray.length; i++){
    hsDiv = document.createElement("div");
    hsDiv.className = "m-1 highscoreEl";
    hsDiv.textContent = hsArray[i]['initials'] + " - " + hsArray[i]['value'];
    containerDiv.append(hsDiv);
  }

  // Generate container div for button elements
  var flexDiv = document.createElement("div");
  flexDiv.className = "d-flex justify-content-start";
  mainDiv.append(flexDiv);
  
  var buttonGoBackDiv = document.createElement("button");
  buttonGoBackDiv.className = "btn btn-primary btn-sm m-1 text-nowrap";
  buttonGoBackDiv.textContent = "Go Back";
  buttonGoBackDiv.setAttribute("id", "btnGoBack");
  flexDiv.append(buttonGoBackDiv);

  var buttonClearHighScoresDiv = document.createElement("button");
  buttonClearHighScoresDiv.className = "btn btn-primary btn-sm m-1 text-nowrap";
  buttonClearHighScoresDiv.textContent = "Clear Highscores";
  buttonClearHighScoresDiv.setAttribute("id", "btnClearHS");
  flexDiv.append(buttonClearHighScoresDiv);

  // button click event handler section
  mainDiv.addEventListener("click", btnClickHandler);

};

function startQuiz(){
  // Obtain root element
  var rootDiv = document.getElementById("rootDiv");
  // Obtain and clear child of root (clear UI)
  if(rootDiv.firstChild){
    rootDiv.removeChild(rootDiv.firstChild);
  }

  timerState = 75;        // Set initial timer state to 75 seconds
  timerActive = true;     // Turn timer on
  displayQuestionCard();  // async call of displayQuestionCard()
};

function clearHighscores(){
  if(locStorage.getItem('hsArray')){
    var hsArray = [];
    locStorage.setItem('hsArray', JSON.stringify(hsArray));
  }
};

function addHighscore(){
  if(!locStorage.getItem('hsArray')){
    var hsArray = [];
    var hsEntry = { "initials": hsInitials, "value": hsValue };
    hsArray.push(hsEntry);
    locStorage.setItem('hsArray', JSON.stringify(hsArray));
  }
  else{
    var hsArray = JSON.parse(locStorage.getItem('hsArray'));
    var hsEntry = { "initials": hsInitials, "value": hsValue };
    hsArray.push(hsEntry);
    locStorage.setItem('hsArray', JSON.stringify(hsArray));
  }
};

function btnClickHandler(event){
  if(event.target.hasAttribute("id") === true){
    if(event.target.getAttribute("id") === "btnSubmit"){
      var inputDiv = document.getElementById("inputDivControlInput");
      hsInitials = inputDiv.value;
      addHighscore();
      displayHighscoreCard();
    }
    else if(event.target.getAttribute("id") === "btnGoBack"){
      displayIntroCard();
    }
    else if(event.target.getAttribute("id") === "btnClearHS"){
      clearHighscores();
      displayHighscoreCard();

    }
  }
  else if(event.target.hasAttribute("data-index")){
    var btnIndex = event.target.getAttribute("data-index"); // btn index as created earlier
    
    // on CORRECT, increment questionState & redraw
    if(questionAnswerArray[questionState][1][btnIndex][1] === "true"){
      answerStatus = true;
      displayCorrectWrongIndicator();
      questionState++;  // increment question state
      
      if(questionState < (questionAnswerArray.length)){
        displayQuestionCard();    // Draw question card under new state
      }
      else{
        displaySummaryCard();     // Draw summary card
      }
    }
    else if( questionAnswerArray[questionState][1][btnIndex][1] === "false"){
      // Decrement main timer by 10 seconds
      if(timerState>=10){
        answerStatus = false;
        displayCorrectWrongIndicator();
        timerState -= 10;
      }
      else{
        answerStatus = false;
        displayCorrectWrongIndicator();
        timerState = 0;   // set timer to minimum
      }
    }
  } 
};

function displayCorrectWrongIndicator(){
  
  statusDiv = document.getElementById("statusDiv");

  if(answerStatusTimerActive === false){
    answerStatusTimerActive = true;     // set answerStatusTimerActive flag
    
    hbElement = document.createElement("hr");
    hbElement.className = "mt-3 w-100";
    statusElement = document.createElement("h4");
    statusElement.className = "statusText w-100";
    
    if(answerStatus === true){
      statusElement.textContent = "Correct!";
    }
    else{
      statusElement.textContent = "Wrong!";
    }
    
    statusDiv.append(hbElement);
    statusDiv.append(statusElement);
    
    answerStatusTimerID = setTimeout(function(){
      hbElement.remove();
      statusElement.remove();
      answerStatusTimerActive = false;       // timedOut timer is inactive
    }, 400);

  }
};

function updateTimer(){
  timerEl = document.getElementById("timerElement");
  if(timerActive===true){
    if(timerState>0){
      timerState -= 1;
    }
    else{                         // if timerState === 0 then the game is over
      timerActive = false;        // pause timer
      displaySummaryCard();       // game over -> go to summary card
    }
    // Update timer display
    timerEl.textContent = "Time: " + timerState;  
  }
};

// Call main proc when window loading is complete
window.onload = function() {
  
  timerEl = document.getElementById('timerElement');
  btnViewHighscoresDiv = document.getElementById('highscoreElement');
  btnViewHighscoresDiv.addEventListener('click', displayHighscoreCard);
  
  timerEl.className = "p-2 visible";
  btnViewHighscoresDiv.className = "p-2 visible";

  displayIntroCard();
  timerID = setInterval(updateTimer, 1000);   // start countdown
};
  