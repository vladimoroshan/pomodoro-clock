function Pomodoro(timeSession, timeBreak) {
    this.session = timeSession * 60;
    this.break = timeBreak * 60;
    this.state = "initial";
    this.lastState = "session";  
    this.timeLeft = timeSession * 60;
}

Pomodoro.prototype.newState = function(state) {
    this.lastState = this.state;
    this.state = state;
    if(state == "initial") this.lastState = "session";
    this.updateDisplay(this.timeLeft);
}

Pomodoro.prototype.start = function() {
    var that = this;
    if(this.state === "initial" || this.state === "pause") {
      this.newState(this.lastState === "session" ? "session" : "break");
      timer();
      this.ticTac = setInterval(function() {
        timer();
      }, 1000); 
    }   

function timer() {
      that.timeLeft--;
      that.updateDisplay(that.timeLeft);
      if(that.timeLeft === 0) {
        document.getElementById("notification").play();
        that.timeLeft = that.state === "session"? that.break: that.session;
        that.newState(that.state === "session"? "break" : "session");
      }
  }
}

Pomodoro.prototype.pause = function() {
    if(this.state === "session" || this.state === "break") {
      this.newState("pause");
      clearInterval(this.ticTac);
    }
}

Pomodoro.prototype.reset = function() {  
  this.newState("initial");
  this.timeLeft = 25 * 60;
  clearInterval(this.ticTac);
  this.updateDisplay(this.timeLeft);
  document.getElementById("start").innerHTML = "START";
  document.getElementById("timeSession").innerHTML = 25;
  document.getElementById("timeBreak").innerHTML = 5;
}

Pomodoro.prototype.updateDisplay = function(time) {  
  function formattedTime(time) {
    var min = Math.floor(time / 60),
        sec = time - (min * 60);
    return addZero(min) + ":" + addZero(sec);
  }
  
  function addZero(time) {
    return time < 10 ? "0" + time : time; 
  }  
  document.getElementById("clock").innerText = formattedTime(time);
}

Pomodoro.prototype.updateTime = function(timeSession, timeBreak) {
  this.session = timeSession * 60;
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
