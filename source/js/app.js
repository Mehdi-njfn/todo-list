let input = document.querySelector('#itemInput');
let addButton = document.querySelector('#addButton');
let clearButton = document.querySelector('#clearButton');
let list = document.querySelector('#todoList');

let todoList = [];
function deleteWithId(id){
  todoList = JSON.parse(localStorage?.getItem('todoList')) || [];
  console.log(todoList);
  let item = todoList.findIndex((i)=>{
    return i.id === id;
  })
  todoList.splice(item, 1);
  console.log(todoList);
  localStorage.setItem('todoList', todoList)
  todoList?.forEach(function(item){
    console.log(item);
    addTodo(item)
  })
}
function deleteItem(e){
  let localList = JSON.parse(localStorage.getItem('todoList')) || [];
  let target = e.target.previousElementSibling.previousElementSibling.innerHTML;
  todoList = localList.filter((i)=>{
    return i.name !== target;
  })
  updateLocalStorage(todoList)
  e.target.parentElement.remove();
}
// function complete(e){
    
//     let update;
//     let localList = JSON.parse(localStorage.getItem('todoList')) || [];
//     let target = e.target.previousElementSibling;
//     todoList = localList.filter((i)=>{
//       if (i.name === target.innerHTML) {
//         update = i;
//       }else {
//         return i;
//       }
//     })
    
//     update.completed = true;
//     target.style.color = '#b7b7b7';
//     target.style.textDecorationLine = 'line-through';
//     console.log(update);
//     todoList.push(update);
//     updateLocalStorage(todoList);
// }
function complete(id){
  todoList?.forEach(function(i){
    if (i.id === id) {
      i.completed = !i.completed;
      return i;
    }
  })
  list.innerHTML = '';
  todoList?.forEach(function(item){
    addTodo(item)
  })
  
  console.log(todoList);
  updateLocalStorage(todoList);
}
function addTodo(item){
  var todo ;
  let newLi = document.createElement('li');
  let label = document.createElement('label');
  let btn1 = document.createElement('button');
  let btn2 = document.createElement('button');
  if (input.value || item?.name) {
    if (input.value) {
      todo = {
        id:todoList.length + 1,
        name: input.value,
        completed:false
      }
      todoList.push(todo);
      updateLocalStorage(todoList);
  
      label.innerHTML = input.value;
    }else if (item) {
      label.innerHTML = item.name;
    }
  
      btn1.classList = 'btn btn-success';
      btn1.innerHTML = 'Complete';
      // btn1.setAttribute('onclick', 'complete(event)')
      btn1.setAttribute('onclick', `complete(${todo?.id || item?.id})`)
  
      btn2.classList = 'btn btn-danger';
      btn2.innerHTML = 'Delete';
      btn2.setAttribute('onclick', 'deleteItem(event)')
      // btn2.setAttribute('onclick', `deleteWithId(${todo?.id || item?.id})`)
      
      if (item?.completed) {
        label.style.color = '#b7b7b7';
        label.style.textDecorationLine = 'line-through';
        btn1.innerHTML = 'unComplete';
      }
      newLi.classList = 'completed well';
      newLi.append(label, btn1, btn2);
  
      input.value = ''
      list.appendChild(newLi);
    
  }
    input.focus()
}
function updateLocalStorage(list){
  if (list[0]) {
    localStorage.setItem('todoList', JSON.stringify(list));
  }else{
    localStorage.removeItem('todoList');
  }
}
function firstInitialize(){
  todoList = JSON.parse(localStorage.getItem('todoList')) || [];
  console.log(todoList);
  todoList?.forEach(function(item){
    //console.log(item);
    addTodo(item)
  })
}


addButton.addEventListener('click', addTodo);
clearButton.addEventListener('click',function(){
  let children = list.children;
  let i = children.length - 1;
  while(children.length){ 
    children[i].remove();
    i--;
  }
  localStorage.removeItem('todoList');
  
} );
input.addEventListener('keyup',function(e){
  if (e.keyCode === 13) {
    addTodo()
  }
})

window.onload = firstInitialize();

// deleteItem(1)