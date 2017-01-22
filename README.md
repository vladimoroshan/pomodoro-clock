# Pomodoro-Clock-
===

##What this project is

> The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. The technique uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks. -from Wikipedia's article
Pomodoro.js allows you to visualize the above technic in your browser.

As a note I didn't use jQuery or any other library in this process.

Here’s the **basic layout**:
In the head links to google fonts and sound for Pomodoro clock when time is up. 

===
```

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css?family=Arimo:700|Lato:100|Roboto:300" rel="stylesheet">
  <audio id="notification" src="https://s3.amazonaws.com/freecodecamp/simonSound1.mp3" preload="auto"></audio>
</head>

<body>
<div id="top">
  
  <div id="left">
    <p>SESSION LENGTH</p>
      <div class="time">
        <button id="minusL">-</button>
        <span id="timeSession">25</span>
        <button id="plusL">+</button>
      </div>
  </div>
  
  <div id="center">
        <button id="start">START</button>
        <button id="reset">Reset</button>   </div>
  
  <div id="rigth">
      <p>BREAK LENGTH</p>
      <div class="time">
        <button id="minusR">-</button>
        <span id="timeBreak">5</span>
        <button id="plusR">+</button>
      </div>
  </div>
  
</div>

<div id="bottom">
  <span id="clock">25:00</span>  
</div>
  
</body>
```
Here is @media queries to make font-size and round button smaller. In the rest are a scalable units, like em, vw, vh and %. So my clock pretty responsive on any screen. Also remarkable features are css pseudo classes, :active, :not().

---
```

body {   
  margin: 0px;  
  padding: 0px;
  color: #ffffff;
  background-color: #2E1304;
  font: 2em "Arimo", sans-serif;
  min-width: 320px;
}

@media screen and (max-width: 480px) {
    body {
    font-size: 0.8em;
    }
    #center #start {
    width: 100px;
    height: 100px;
    }
}

@media screen and (min-width:481px) and (max-width:880px) {
  body {
     font-size: 1.3em;
    }
  #center #start {
     width: 120px;
     height: 120px;
    }
}

#top {
  display: table;
  width: 100%;
  height: 40vh; 
  background-color: #f44336;
}

#left, #center, #rigth  {
  width: 33vw; 
  display: table-cell;
  vertical-align: middle;
  text-align: center; 
}

p {
  white-space: nowrap;
  margin: 2vw;
}
.time {
  margin-top: 4vh;
}

button:not(#start) {
  background-color: Transparent;
  border: none;
  cursor:pointer;
  outline:none;
  color: #fff
}

button:not(#start):not(#reset):active {	
  transform: scale(1.2);   
}

button:not(#start):not(#reset) {
  font-size: 1em;
  margin: 0 1vw 0;
}

#start{
  width: 150px;
  height: 150px;
  margin-top: 5vh;
  border-radius: 50%;
  border: 0 solid #000;
  color: #545454;
  text-align: center;
  font: 0.8em "Roboto", sans-serif;
  outline: none;
}

#start:active {	
  transform: scale(1.05);   
}

#reset {
  display: block;
  margin: 3vh auto 10px;  
  font: 0.9em "Roboto", sans-serif;;
}

#reset:active {	
  color: #545454;  
}

#bottom {
  display: table;
  width: 100%;
  height: 60vh;  
  background-color: #FC8266;      
  font: 7em 'Lato', sans-serif;
}

#clock {
  display: table-cell;
  vertical-align: middle;
  text-align: center;  
}


```

Let’s get the engine of our **Pomodoro Clock**.

I created a Pomodoro **object constructor** with some properties and then added several methods to it. It is a nice way to contain most of the logic behind the actual clock within a single object.

Maybe it would be easy to handle logic with jQuery. But as I said only pure javascript.

The first method is a state. It shows is the timer paused, running session time or break time or even has not started running.
The rest of the methods and properties are speaking for yourselves and I wrote some comments. I hope you quickly understand what for.  

```

function Pomodoro(timeSession, timeBreak) {
    this.session = timeSession * 60;
    this.break = timeBreak * 60;
    this.state = "initial";
    this.lastState = "session";  
    this.timeLeft = timeSession * 60;//time left is initialized the same as a pomodoro cycle, it will decrease
}
       
Pomodoro.prototype.newState = function(state) {
    this.lastState = this.state; //Set lastState to current state.
    this.state = state;    // Updates current state.
    if(state == "initial") this.lastState = "session";
    this.updateDisplay(this.timeLeft); // Update display with current time
}

Pomodoro.prototype.start = function() {
    var that = this; // inside the timer() function, "this" will refer to the function itself, and not the Pomodoro
    if(this.state === "initial" || this.state === "pause") { //If clock is stopped or paused:
      this.newState(this.lastState === "session" ? "session" : "break");
      timer();
      this.ticTac = setInterval(function() { // an interval that will run timer() every second
        timer();
      }, 1000); 
    }   

function timer() {//decrease the time left every second and update the timer display accordingly 
      that.timeLeft--; //decreases the time by one
      that.updateDisplay(that.timeLeft);
      if(that.timeLeft === 0) { //If time reaches zero, we start a pomodoro cycle or break cycle depending on the current state
        document.getElementById("notification").play(); //and play already downloaded sound
        that.timeLeft = that.state === "session"? that.break: that.session; //reset the timeLeft property to the next cycle.
        that.newState(that.state === "session"? "break" : "session"); //change the state to the next cycle
      }
  }
}

Pomodoro.prototype.pause = function() {
    if(this.state === "session" || this.state === "break") { //Only if the clock is running and not already paused
      this.newState("pause"); //Set's current state to paused
      clearInterval(this.ticTac); 
    }
}

Pomodoro.prototype.reset = function() {  
  this.newState("initial");
  this.timeLeft = 25 * 60;
  clearInterval(this.ticTac);      //Clears the previous interval
  this.updateDisplay(this.timeLeft);      // Updates the display.
  document.getElementById("start").innerHTML = "START";
  document.getElementById("timeSession").innerHTML = 25;
  document.getElementById("timeBreak").innerHTML = 5;
}

}
Pomodoro.prototype.updateDisplay = function(time) {  
  function formattedTime(time) {
    var min = Math.floor(time / 60),
        sec = time - (min * 60);
    return addZero(min) + ":" + addZero(sec);
  }
  // It formats the given time to look like: MM:SS
  function addZero(time) {
    return time < 10 ? "0" + time : time; 
  }  
  document.getElementById("clock").innerText = formattedTime(time);
}

Pomodoro.prototype.updateTime = function(timeSession, timeBreak) {
  this.session = timeSession * 60; //when the user changes the session time or the break.
  this.break = timeBreak * 60;
  this.timeLeft = timeSession * 60;
  this.updateDisplay(this.session);
}

var newPomodoro = new Pomodoro(25, 5),
    sessionTime = document.getElementById("timeSession"),
    breakTime = document.getElementById("timeBreak");

document.body.addEventListener("click", function(e) {
  
  if (e.target.nodeName == "BUTTON") {  
      if(e.target.id == "minusL") {
          sessionTime.innerText = parseInt(sessionTime.innerText) === 1 ? 1 : parseInt(sessionTime.innerText) - 1;
          newPomodoro.updateTime(sessionTime.innerText, breakTime.innerText);
      }

      if(e.target.id == "plusL") {
          sessionTime.innerText = parseInt(sessionTime.innerText) + 1;
          newPomodoro.updateTime(sessionTime.innerText, breakTime.innerText);        
      }

      if(e.target.id == "reset") {
        newPomodoro.reset();        
      }

      if(e.target.id == "minusR") {
          breakTime.innerText = parseInt(breakTime.innerText) === 1 ? 1 : parseInt(breakTime.innerText) - 1;
          newPomodoro.updateTime(sessionTime.innerText, breakTime.innerText);
      }

      if(e.target.id == "plusR") { 
          breakTime.innerText = parseInt(breakTime.innerText) + 1;
          newPomodoro.updateTime(sessionTime.innerText, breakTime.innerText);
      }
    
      if(e.target.id == "start") {
         if(e.target.innerHTML == "START") {
             newPomodoro.start();
             e.target.innerHTML = "PAUSE";
         }      
        else if(e.target.innerHTML == "PAUSE") {
            newPomodoro.pause();
            e.target.innerHTML = "START";
        } 
      }      
    }
});

```

Javascript doesn't have feature to pause setInterval(), so pause button just save remeaing time and clear interval. 
