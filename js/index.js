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

    personSpan.dataset.name = task.personId;

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
      alert("担当者がいません。先に担当者を入力してください。")
      newPersonElement.focus();      
    } 
  }

  addTaskButton.addEventListener('click',() => {
    if (newTaskElement.value === ""){
      return;
    }
    
    personAlert();
   
    const newTask = { id : new Date().getTime().toString(), name : newTaskElement.value, status : 0, personId : selectPerson.value}; 
    taskList.push(newTask); 
    appendTask(newTask);
    newTaskElement.value = "";
    newTaskElement.focus();
  })

  const appendPerson = (person) =>{   
    const li = document.createElement('li');
    const deleteButton = document.createElement('button');
    const personaNameSpan = document.createElement('span');
    const input = document.createElement('input');
    const editPersonButton = document.createElement('button');
    const savePersonButton = document.createElement('button');
    const cancelPersonButton = document.createElement('button');

    li.classList.add("person-class");
    input.classList.add("person-edit-input");
    personaNameSpan.classList.add("person-name-class");
    editPersonButton.classList.add("edit-button");
    deleteButton.classList.add("delete-button");
    savePersonButton.classList.add("save-button");   
    cancelPersonButton.classList.add("cancel-button");   

    personaNameSpan.textContent = person.name;
    deleteButton.textContent = 'Delete';
    editPersonButton.textContent = 'Edit';
    savePersonButton.textContent = 'Save';
    cancelPersonButton.textContent = 'Cancel';

    li.appendChild(personaNameSpan);
    li.appendChild(editPersonButton);
    li.appendChild(deleteButton);
  
    personListElement.appendChild(li);

    editPersonButton.addEventListener('click', () => {
      input.value = person.name;

      li.replaceChild(input, personaNameSpan);
      li.replaceChild(savePersonButton, editPersonButton);
      li.replaceChild(cancelPersonButton, deleteButton);
    });

    cancelPersonButton.addEventListener('click', () => {
      input.value = person.name;

      li.replaceChild(personaNameSpan, input);
      li.replaceChild(editPersonButton, savePersonButton);
      li.replaceChild(deleteButton, cancelPersonButton);
    });

    savePersonButton.addEventListener('click', () => {
      if (input.value === ""){
        input.value = person.name;
      }

      personList.find(p => p.id = person.id).name = input.value;
      personaNameSpan.textContent = input.value;

      document.getElementById(person.id).textContent = input.value;

      const taskPersonSpan = document.querySelectorAll('[data-name="' + person.id + '"]');
      for(let i=0 ; i < taskPersonSpan.length; i++) {
        taskPersonSpan[i].textContent = "：" + input.value;
      }

      li.replaceChild(personaNameSpan, input);
      li.replaceChild(editPersonButton, savePersonButton);
      li.replaceChild(deleteButton, cancelPersonButton);
    });

   
    deleteButton.addEventListener('click', () => {
      if(taskList.find(t => t.personId === person.id)) {
         alert('この担当者のタスクがまだ残っています');
         return;
      }

      personList = personList.filter(p => p.id !== person.id );
      li.remove();
      const personOption = document.getElementById(person.id);
      personOption.remove();
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