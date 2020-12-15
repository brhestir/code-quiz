// main.js
// The main javascript file for the code-quiz app

// We want a root element.  This will be the middle row.

// For each "card", we want to 
// - Consider program state (what card are we on)
// - What is the form of this card? Intro? Question? HS?
// - Based on card form, read from data array variable
// - Generate card using data in the array.

// Obtain, clear, then configure mainDiv root element
var rootDiv = document.getElementById("rootDiv");

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
