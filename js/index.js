const addTextButton = document.getElementById("add_task_button");
const newTaskElement = document.getElementById("task_text");
const todoListElement = document.getElementById("todo_list");
const doingListElement = document.getElementById("doing_list");
const doneListElement = document.getElementById("done_list");
const addPersonButton = document.getElementById("add_person_button");
const newPerson = document.getElementById("person_text");
const personListElement = document.getElementById("person_list");
const selectPerson = document.getElementById("select_person");

const taskList = [];
const personList = [];

function appendTaskList() {
  let todoHtml = "";
  let doingHtml = "";
  let doneHtml = ""
  for (let i = 0; i < taskList.length; i++) {
    if(taskList[i].status === 0){
      todoHtml += 
      '<li>' + taskList[i].name  
        + '<button onClick="doingTask(' + i + ')">doing</button>'
        + '<button onClick="doneTask(' + i + ')">done</button>'
        + '<button onClick="deleteTask(' + i + ')">削除</button>'
      '</li>';            
    }
    if(taskList[i].status === 1){
      doingHtml += 
      '<li>' + taskList[i].name  
        + '<button onClick="todoTask(' + i + ')">todo</button>'
        + '<button onClick="doneTask(' + i + ')">done</button>'
        + '<button onClick="deleteTask(' + i + ')">削除</button>'
      '</li>';            
    };
    if(taskList[i].status === 2){
      doneHtml += 
      '<li>' + taskList[i].name  
        + '<button onClick="todoTask(' + i + ')">todo</button>'
        + '<button onClick="doingTask(' + i + ')">doing</button>'
        + '<button onClick="deleteTask(' + i + ')">削除</button>'
      '</li>';            
    };
     
  }
  
  todoListElement.innerHTML = todoHtml; 
  doingListElement.innerHTML = doingHtml; 
  doneListElement.innerHTML = doneHtml; 

};

function todoTask(i) {
  taskList[i].status = 0;
  appendTaskList();
};

function doingTask(i) {
  taskList[i].status = 1;
  appendTaskList();
};

function doneTask(i) {
  taskList[i].status = 2;
  appendTaskList();
};

function deleteTask(i) {
  taskList.splice(i,1);
  appendTaskList();
};

addTextButton.addEventListener('click',() => {
  if (newTaskElement.value === ""){
    return;
  };
  taskList.push({ name : newTaskElement.value, status : 0 }); 
  appendTaskList();
  newTaskElement.value = "";
});

addPersonButton.addEventListener('click', () =>{
  if (newPerson.value === ""){
    return;
  }
  personList.push({ name : newPerson.value, id : new Date().getTime().toString() });
  let personHtml = "";
  for(let i = 0; i < personList.length; i++){
    personHtml += 
      '<li>' + personList[i].name + '</li>'
  }

  let selectPersonHtml = "";
  for(let i = 0; i < personList.length; i++){
    selectPersonHtml += 
      '<option value = "' + personList[i].id + '" >' + personList[i].name + '</option>'
  }

  personListElement.innerHTML = personHtml;
  selectPerson.innerHTML = selectPersonHtml;
});
