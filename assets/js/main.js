// main.js
// The main javascript file for the code-quiz app

var topElement = document.getElementById("#rootH1");
var newElement = document.createElement("p");

newElement.textContent = "Hey we have a new <p> element here.";
document.body.appendChild(newElement);   // Append the <p> element
