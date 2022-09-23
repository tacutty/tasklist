`use strict`;

{
  const addTaskButton = document.getElementById("add_task_button");
  const newTaskElement = document.getElementById("task_text");
  const todoListElement = document.getElementById("todo_list");
  const doingListElement = document.getElementById("doing_list");
  const doneListElement = document.getElementById("done_list");
  const addPersonButton = document.getElementById("add_person_button");
  const newPersonElement = document.getElementById("person_text");
  const personListElement = document.getElementById("person_list");
  const selectPerson = document.getElementById("select_person");

  let taskList = [];
  let personList = [];

  const appendTask = (task) =>{   
    const li = document.createElement('li');
    const taskSpan = document.createElement('span');
    const todoButton = document.createElement('button');
    const doingButton = document.createElement('button');
    const doneButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    const personSpan = document.createElement('span');
    li.classList.add("task-class");
    taskSpan.classList.add("task-name-class");
    todoButton.classList.add("todo-button");
    doingButton.classList.add("doing-button");
    doneButton.classList.add("done-button");
    deleteButton.classList.add("delete-button");

    taskSpan.textContent = task.name;
    todoButton.textContent = 'todo';
    doingButton.textContent = 'doing';
    doneButton.textContent = 'done';
    deleteButton.textContent = 'delete';
    personSpan.textContent = '：' + personList.find(person => person.id === task.personId).name;

    li.appendChild(taskSpan);

    if(task.status === 0){      
      todoListElement.appendChild(li);
      li.appendChild(doingButton);
      li.appendChild(doneButton);        
    }

    if(task.status === 1){
      doingListElement.appendChild(li);
      li.appendChild(todoButton);
      li.appendChild(doneButton);
    }

    if(task.status === 2){
      doneListElement.appendChild(li);
      li.appendChild(todoButton);
      li.appendChild(doingButton);
    }

    li.appendChild(deleteButton);
    li.appendChild(personSpan); 

    todoButton.addEventListener('click', () => {
      task.status = 0;
      li.remove();
      appendTask(task);
    });
    
    doingButton.addEventListener('click', () => {
      task.status = 1;
      li.remove();
      appendTask(task);
    });

    doneButton.addEventListener('click', () => {
      task.status = 2;
      li.remove();
      appendTask(task);
    });
   
    deleteButton.addEventListener('click', () => {
      taskList = taskList.filter(t => t.id !== task.id );
      li.remove();
    });
  }

  function personAlert() {
    if(!personList.length){
      if(!alert("担当者がいません。先に担当者を入力してください。")){
        newPersonElement.focus();
      };
    } 
  }

  addTaskButton.addEventListener('click',() => {
    if (newTaskElement.value === ""){
      console.log(personAlert());
      return;
    };
    
    //const targetPerson = personList.find(person => person.id === selectPerson.value);
    const newTask = { id : new Date().getTime().toString(), name :       newTaskElement.value, status : 0, personId : selectPerson.value}; 
    taskList.push(newTask); 
    appendTask(newTask);
    //appendTaskList();
    newTaskElement.value = "";
    newTaskElement.focus();
  })

  const appendPerson = (person) =>{   
    const li = document.createElement('li');
    const deleteButton = document.createElement('button');
    const span = document.createElement('span');
    li.classList.add("person-class");
    span.classList.add("person-name-class");
    deleteButton.classList.add("delete-button");

    span.textContent = person.name;
    deleteButton.textContent = 'delete';

    li.appendChild(span);
    li.appendChild(deleteButton);

    personListElement.appendChild(li);
   
    deleteButton.addEventListener('click', () => {
      if(taskList.find(t => t.personId === person.id)) {
         alert('この担当者のタスクがまだ残っています');
         return;
      }

      personList = personList.filter(p => p.id !== person.id );
      li.remove();
      const option = document.getElementById(person.id);
      option.remove();
    });
  }

  addPersonButton.addEventListener('click', () =>{
    if (newPersonElement.value === ""){
      return;
    }
    const newPerson = { name : newPersonElement.value, id : new Date().getTime().toString(), };
    personList.push(newPerson);
    appendPerson(newPerson);  
    appendPersonSelect(newPerson);
    
    newPersonElement.value = ""
    newPersonElement.focus();
  })
 
  const appendPersonSelect = (person) => { 
    const option = document.createElement('option');
    option.id = person.id
    option.value =  person.id;
    option.text = person.name;

    selectPerson.appendChild(option);
  }

}