# Pomodoro-Clock-
```

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
        <button id="start" value="start">START</button>
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

```

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
