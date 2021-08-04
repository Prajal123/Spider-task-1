const date=new Date();
let todos=[],todostoday=[],todospast=[];
const date1=new Date();
const months=["January","february","march","April","May","June","July","August","September","October","November","December"];
var monthdays=document.querySelector('.days');
function renderCalender(){date.setDate(1);

    var firstDayIndex= date.getDay();
   
    var lastday=new Date(date.getFullYear(),date.getMonth()+1,0).getDate();
    
    document.querySelector('h1').innerHTML=months[date.getMonth()]+date.getFullYear();
    var prevlastday=new Date(date.getFullYear(),date.getMonth(),0).getDate();
    var lastdayindex=new Date(date.getFullYear(),date.getMonth()+1,0).getDay();
    
    var nextdays=7-lastdayindex-1;
    if(nextdays==0){
        nextdays=7;
    }
    
    document.querySelector('p').innerHTML="Today:"+date1.toDateString();
    
    let days="";
    
    for(let x=firstDayIndex;x>0;x--){
        days+=`<div class="prev-date">${prevlastday-x+1}</div>`;
        
    }
    for(let i=1;i<=lastday;i++){
        if(i==new Date().getDate() && date.getMonth()==new Date().getMonth()){
            days+=`<div class="today" onclick="check(${i})">${i}</div>`;   
        }
        else{
     days+=`<div onclick="check(${i})">${i}</div>`;
        }
    }
    for(let j=1;j<=nextdays;j++){
        days+=`<div class="next-date">${j}</div>`;
        
    }
    monthdays.innerHTML=days;
  
    }

document.querySelector('.prev').addEventListener('click',function(){
    date.setMonth(date.getMonth()-1);
    renderCalender();
});

document.querySelector('.next').addEventListener('click',function(){
    date.setMonth(date.getMonth()+1);
    renderCalender();

   
})
renderCalender();

var li;
var todoitemlist=document.querySelector(".todoitemlist");
var todayitemlist=document.querySelector(".todayitemlist");
var pastitemlist=document.querySelector(".pastitemlist");

function check(i){
  var task=  prompt("Write your event on "+i+months[date.getMonth()]+" "+date.getFullYear());
  if(task=="" || task==null){
      alert("You have to write something");
  }
  else{
  
  const todo={
    task1:task,
    date2:i+months[date.getMonth()]+" "+date.getFullYear(),
    completed:false,
    date3:i,
    month:date.getMonth(),
    year:date.getFullYear()
  }
  todos.push(todo);
  addtolocalStorage(todos);

  if(todos[todos.length-1].date2==date1.getDate()+months[date.getMonth()]+" "+date.getFullYear()){
      todostoday.push(todos[todos.length-1]);
  }
  if(todos[todos.length-1].year<date1.getFullYear()){
    todospast.push(todos[todos.length-1]);
}
else if(todos[todos.length-1].year==date1.getFullYear()){
    if(todos[todos.length-1].month<date1.getMonth()){
        todospast.push(todos[todos.length-1]);
    }
    else if(todos[todos.length-1].month==date1.getMonth()){
        if(todos[todos.length-1].date3<date1.getDate()){
            todospast.push(todos[todos.length-1]);
        }
 }
}
   renderTodos1(todostoday);
   renderTodos2(todospast);
  }
}


function renderTodos(todos){
   todoitemlist.innerHTML="";
   
  todos.forEach(function(item) {

    const checked=item.completed?'checked':null;

      li=document.createElement('li');
      li.setAttribute("id",item.task1);

      if(item.completed==true){
          li.classList.add('checked');
      }
      li.innerHTML=` <h4>Date:${item.date2}</h4>
                     <input type="checkbox" class="checkbox" ${checked}>Task:${item.task1}
      <button class="btn">Delete</button>`
      todoitemlist.appendChild(li);
      
      
  });
}
function renderTodos1(todos){
    todayitemlist.innerHTML="";
    
   todos.forEach(function(item) {
 
     const checked=item.completed?'checked':null;
 
       li=document.createElement('li');
       li.setAttribute("id",item.task1);
 
       if(item.completed==true){
           li.classList.add('checked');
       }
       li.innerHTML=` <h4>Date:${item.date2}</h4>
                    Task:  ${item.task1}`
       todayitemlist.appendChild(li);    
       
   });
 }

 function renderTodos2(todos){
    pastitemlist.innerHTML="";
    
   todos.forEach(function(item) {
 
     const checked=item.completed?'checked':null;
 
       li=document.createElement('li');
       li.setAttribute("id",item.task1);
 
       if(item.completed==true){
           li.classList.add('checked');
       }
       li.innerHTML=` <h4>Date:${item.date2}</h4>
                    Task:  ${item.task1}`
       pastitemlist.appendChild(li);    
       
   });
 }



function addtolocalStorage(todos){
  localStorage.setItem('todos',JSON.stringify(todos));
  renderTodos(todos);
}

function getfromlocalStorage(){
var reference=localStorage.getItem('todos');
 if(reference){
     todos=JSON.parse(reference);
     renderTodos(todos);
 }
 for(var i=0;i<todos.length;i++){
     if(!todos[i].completed){
         alert("You have a task remaining on"+todos[i].date2);
     }

     if(todos[i].date2==date1.getDate()+months[date.getMonth()]+" "+date.getFullYear() && todos[i].completed==false){
         todostoday.push(todos[i]);
     }
   if(todos[i].year<date1.getFullYear()){
       todospast.push(todos[i]);
   }
   else if(todos[i].year==date1.getFullYear()){
       if(todos[i].month<date1.getMonth()){
           todospast.push(todos[i]);
       }
       else if(todos[i].month==date1.getMonth()){
           if(todos[i].date3<date1.getDate()){
               todospast.push(todos[i]);
           }
    }
   }
 }
 renderTodos1(todostoday);
 renderTodos2(todospast);
}

getfromlocalStorage();

todoitemlist.addEventListener('click',function(e){
    if(e.target.className=='btn'){
        deleteTodo(e.target.parentElement.getAttribute("id"));
    }
    if(e.target.type=='checkbox'){
        togglecheckbox(e.target.parentElement.getAttribute("id"));
    }
})

function deleteTodo(id){
    for(var i=0;i<todos.length;i++){
        if(todos[i].task1==id){
            todos.splice(i,1);
        }
    }
    addtolocalStorage(todos);
}

function togglecheckbox(id){
    for(var i=0;i<todos.length;i++){
        if(todos[i].task1==id){
            todos[i].completed=!todos[i].completed;
        }
    }
    addtolocalStorage(todos);
}


setInterval(showTime, 1000);
var digiclock=document.querySelector('.container2');

var hour1=0;
function showTime() {
    let time = new Date();
    time.setHours(time.getHours()+parseFloat(hour1));
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    am_pm = "AM";

    if (hour > 12) {
        hour -= 12;
        am_pm = "PM";
    }
    if (hour == 0) {
        hr = 12;
        am_pm = "AM";
    }

    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    let currentTime = hour + ":" 
        + min + ":" + sec + am_pm;

    document.getElementById("clock")
        .innerHTML = currentTime;
}

showTime();

var clocksound=new Audio('Clocksound.mp3');
setInterval(timeset,1000);

var currentdate;
var hour=0;
var hourHand=document.querySelector(".hour ");
var minuteHand=document.querySelector(".minute ");
var secondHand=document.querySelector(".second ");

function timeset(){
    var currentdate=new Date();

    currentdate.setHours(currentdate.getHours()+parseFloat(hour)); 
    var secondRatio=currentdate.getSeconds()/60;
    var minuteRatio=(secondRatio + currentdate.getMinutes())/60;
    var hourRatio=(minuteRatio+currentdate.getHours())/12;
   
    setRotation(secondHand,secondRatio);
    setRotation(minuteHand,minuteRatio);
    setRotation(hourHand,hourRatio);
    clocksound.play();
    
}

function setRotation(element,rotationRatio){
    element.style.setProperty('--rotation',rotationRatio*360);    
}

timeset();
clocksound.play();

var clock=document.querySelector(".container3");
var colorbutton=document.getElementById("colorbutton");

function ChangeColor(){
    var color=prompt("Add a color to the clock");
    clock.style.backgroundColor=color;
}

function Changehour(){
    var hourwidthsize=prompt("Enter a width for the hour hand");
    hourHand.style.width=hourwidthsize;
    var hourheightsize=prompt("Enter a height for the hour hand");
    hourHand.style.height=hourheightsize;
}

function Changeminute(){
    var minutewidthsize=prompt("Enter a width for the minute hand");
    minuteHand.style.width=minutewidthsize;
    var minuteheightsize=prompt("Enter a height for the minute hand");
    minuteHand.style.height=minuteheightsize;
}

function Changesecond(){
    var secondwidthsize=prompt("Enter a width for the second hand");
    secondHand.style.width=secondwidthsize;
    var secondheightsize=prompt("Enter a height for the second hand");
    secondHand.style.height=secondheightsize;
}

function Changetime(){
     hour=prompt("Enter a hour, so it will increase present time by hours");    
}

function changeClock(){
    clock.classList.toggle("analog");
    digiclock.classList.toggle("digital");
}

function changetime1(){
 hour1=prompt("Enter a hour, so it will increase present time by hours"); 
}
function changecolor1(){
    var color=prompt("Add a color to the clock");
    document.getElementById("clock").style.backgroundColor=color;
}

