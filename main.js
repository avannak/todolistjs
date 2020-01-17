var removeSVG = '<svg enable-background="new 0 0 512 512"id=Layer_1 version=1.1 viewBox="0 0 512 512"xml:space=preserve xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink><g><path class="fill" d=M493.8,257.5c0,131.4-106.6,238-238,238s-238-106.6-238-238s106.6-238,238-238S493.8,126.1,493.8,257.5z fill=#F06292 /></g><g><polygon fill=none points="310.9,381.1    201.1,381.1 180.6,170.3 331.4,170.3  "stroke=#FFFFFF stroke-linejoin=round stroke-miterlimit=10 stroke-width=16 /><line fill=none stroke=#FFFFFF stroke-linecap=round stroke-linejoin=round stroke-miterlimit=10 stroke-width=16 x1=180.6 x2=160 y1=170.3 y2=170.3 /><line fill=none stroke=#FFFFFF stroke-linecap=round stroke-linejoin=round stroke-miterlimit=10 stroke-width=16 x1=331.4 x2=352 y1=170.3 y2=170.3 /><rect fill=none height=27.4 stroke=#FFFFFF stroke-linecap=round stroke-linejoin=round stroke-miterlimit=10 stroke-width=16 width=51.4 x=230.1 y=142.9 /></g></svg>';

var checkSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path class = "fill" fill="none" d="M0 0h24v24H0z"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>';





function getDate(){
  const date = new Date();
  var month = date.getMonth();
  var day = date.getDay();
  var year = date.getFullYear();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  document.getElementById('month').innerHTML = month;
  document.getElementById('day').innerHTML = day
  document.getElementById('year').innerHTML = year;
  document.getElementById('hour').innerHTML = hour;
  document.getElementById('minutes').innerHTML = minute;
  document.getElementById('seconds').innerHTML = second;
}

setInterval(getDate, 1000);



let LIST = [], id = 0;


let checked = false;

let data = localStorage.getItem("savedItems");


if(data){
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
  LIST.sort(function (a, b){
    return b.id - a.id;
  });
  
  
}else{
  LIST = [];
  id = 0;
}

function loadList(array){
  array.forEach(function(item){
    addItemToDo(item.name, item.id, item.checked, item.trash);
  
  });
}







document.getElementById('add').addEventListener('click',function() {
  var value = document.getElementById('item').value;
  if(value){
    
    addItemToDo(value, id, false, false);
    LIST.push({
      name: value,
      id: id,
      checked: false,
      trash: false,
    });
    
    
    id++;
    
    localStorage.setItem("savedItems", JSON.stringify(LIST));
    
    
   
  }
  LIST.sort(function (a, b){
    return b.id - a.id;
  });

});




function addItemToDo(text){
  
  var list = document.getElementById('todo');


  var item = document.createElement('li');
  item.innerText = text;

  var buttons = document.createElement('div');
  buttons.classList.add('buttons');

  var remove = document.createElement('button');
  remove.classList.add('remove');
  remove.innerHTML = removeSVG;

  remove.addEventListener('click', removeItem);

  var check = document.createElement('button');
  check.classList.add('check');
  check.innerHTML = checkSVG;

  check.addEventListener('click', function() {
    if(checked == false){
      item.classList.toggle('crossed');
      checked = true;
      console.log(`check from ${item} is now checked`);
    }
    else if(checked == true){
      item.classList.toggle('crossed');
      checked = false;
      console.log(`check from ${item} no longer checked`);
      
    }
    
  });

  buttons.appendChild(remove);
  buttons.appendChild(check);
  item.appendChild(buttons);

  list.insertBefore(item, list.childNodes[0]);
  localStorage.setItem("savedItems", JSON.stringify(LIST));
}

function removeItem(e){
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  parent.removeChild(item);

  var nameOfTask = LIST;
  //find index in the task element
  var index = LIST.indexOf(nameOfTask);
  


  LIST.splice(index,1);
  

  


  localStorage.setItem("savedItems", JSON.stringify(LIST));
  

}

document.getElementById("clearall").addEventListener('click', function(){
  localStorage.clear();
  var list = document.getElementById('todo');
  while (list.firstChild) {
    list.removeChild(list.firstChild);
    
}

});



// var form = document.getElementById('addForm');
// var itemlist = document.getElementById('myUL');
//
// form.addEventListener('') addItem(e){
//   e.preventDefault();
//   console.log('1');
// }
