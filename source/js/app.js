let $ = document;
let Addtodo = _id("addButton");
let cleartodo = _id("clearButton");
let input = _id("itemInput");
let ulelem = _id("todoList");
let todoarr = [];
let length = 0;


function _id(id) {
  return $.getElementById(id);
}
function _class(classname) {
  return $.getElementsByClassName(classname);
}

function additemtodo() {
  let todoobj = {
    id: ++length,
    content: input.value,
    status: false,
  };

  input.value = "";

  todoarr.push(todoobj);

  setlocalstorage(todoarr);
  todogenerate(todoarr);
}

function todogenerate(todolist) {
  ulelem.innerHTML = "";

  todolist.forEach(function (todos) {

    let li = $.createElement("li");
    let label = $.createElement("label");
    let deletebtn = $.createElement("button");
    let completedbtn = $.createElement("button");

    li.setAttribute("class", "completed well");
    deletebtn.setAttribute("class", "btn btn-danger");
    completedbtn.setAttribute("class", "btn btn-success");

    label.innerHTML = todos.content;
    deletebtn.innerHTML = "Delete";
    
    if (todos.status) {
      completedbtn.innerHTML = "Uncomplete";
      li.classList.add("uncompleted");
    } else if (todos.status === false) {
      completedbtn.innerHTML = "Complete";
      li.classList.remove("uncompleted");
    }

    completedbtn.addEventListener("click", function () {
      completetodo(completedbtn, li, todoarr, todos.id, todos.status);
    });

    deletebtn.addEventListener('click',function(){
        deletetodo(todos.id, todoarr)
    })

    li.append(label, completedbtn, deletebtn);
    ulelem.append(li);
  });
}

function cleartodos() {
  todoarr = [];
  localStorage.clear();
  ulelem.innerHTML = "";
}

function getlocalstorage() {
  let getarr = JSON.parse(localStorage.getItem("todolist"));
  if (getarr) {
    todoarr = getarr;
  } else {
    todoarr = [];
  }
  todogenerate(todoarr);
}

function setlocalstorage(todoarr) {
  localStorage.setItem("todolist", JSON.stringify(todoarr));
}

function completetodo(completedbtn, li, todoarr, idtodo, todost) {
  if (todost) {
    completedbtn.innerHTML = "Complete";
    li.classList.remove("uncompleted");
  } else {
    completedbtn.innerHTML = "Uncomplete";
    li.classList.add("uncompleted");
  }

  todoarr.forEach(function (todos) {
    
    if (todos.id === idtodo) {
      if (completedbtn.innerHTML === "Complete") {
        todos.status = false;
      } else {
        todos.status = true;
      }
    }
  });
  setlocalstorage(todoarr);
}

function deletetodo(idtodo, todoarr){
    console.log(todoarr);
    let find = todoarr.findIndex(function(todo){
         return todo.id === idtodo
    })
    todoarr.splice(find, 1)

    setlocalstorage(todoarr)
    window.location.reload();
}

Addtodo.addEventListener("click", additemtodo);
cleartodo.addEventListener("click", cleartodos);
window.addEventListener("load", getlocalstorage);
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    additemtodo();
  }
});
