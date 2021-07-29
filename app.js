const date=new Date();
let todos=[];
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
function check(i){
  var task=  prompt("Write your event on "+i+months[date.getMonth()]+" "+date.getFullYear());
  if(task=="" || task==null){
      alert("You have to write something");
  }
  else{
  
  const todo={
    task1:task,
    date2:i+months[date.getMonth()]+" "+date.getFullYear()
  }
  todos.push(todo);
  addtolocalStorage(todos);
  }
}


function renderTodos(todos){
   todoitemlist.innerHTML="";
   
  todos.forEach(function(item) {
      li=document.createElement('li');
      li.setAttribute("id",item.date2);
      li.innerHTML=` <h4>Date:${item.date2}</h4>
                     <p>Task:${item.task1}</p>
      <button class="btn">Delete</button>`
      todoitemlist.appendChild(li);
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
}

getfromlocalStorage();

todoitemlist.addEventListener('click',function(e){
    if(e.target.className=='btn'){
        deleteTodo(e.target.parentElement.getAttribute("id"));
    }
})

function deleteTodo(id){
    for(var i=0;i<todos.length;i++){
        if(todos[i].date2==id){
            todos.splice(i,1);
        }
    }
    addtolocalStorage(todos);
}


setInterval(showTime, 1000);
var digiclock=document.querySelector('.container2');

function showTime() {
    let time = new Date();
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

