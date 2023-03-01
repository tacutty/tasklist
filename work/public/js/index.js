`use strict`;
  
  const addTaskForm = document.getElementById("add_task_form");
  const addTaskButton = document.getElementById("add_task_button");
  const newTaskElement = document.getElementById("task_text");
  const todoListElement = document.getElementById("todo_list");
  const doingListElement = document.getElementById("doing_list");
  const doneListElement = document.getElementById("done_list");
  const addPersonForm = document.getElementById("add_person_form");
  const addPersonButton = document.getElementById("add_person_button");
  const newPersonElement = document.getElementById("person_text");
  const personListElement = document.getElementById("person_list");
  const selectPerson = document.getElementById("select_person");  

  // let taskList = [];
  // let personList = [];

  const appendTask = (task) => { 
    const li = document.createElement('li');
    const taskSpan = document.createElement('span');
    const deleteButton = document.createElement('button');
    const personSpan = document.createElement('span');
    const todoButton = document.createElement('button');
    const doingButton = document.createElement('button');
    const doneButton = document.createElement('button');
       
    li.classList.add("task-class");
    li.id = "task_" + task.id;
    taskSpan.classList.add("task-name-class");
    todoButton.classList.add("todo-button");
    doingButton.classList.add("doing-button");
    doneButton.classList.add("done-button");
    deleteButton.classList.add("delete-button");

    taskSpan.textContent = task.task;
    todoButton.textContent = 'todo';
    doingButton.textContent = 'doing';
    doneButton.textContent = 'done';
    deleteButton.textContent = 'delete';
    personSpan.textContent = '：' + task.person_name;

    personSpan.dataset.personId = task.person_id;

    li.dataset.id = task.id;

    li.appendChild(taskSpan);    

    if(task.now_status === "todo"){ 
      let filterList = tasks.filter(t => t.now_status === "todo");  
      let index = filterList.findIndex(t => t.id === task.id);

      if (index === 0) {
        todoListElement.prepend(li);
      } else {
        let beforeTaskId = filterList[index - 1].id;  
        let beforeTaskElement = document.getElementById("task_" + beforeTaskId);
        beforeTaskElement.after(li);
      }

      li.appendChild(doingButton);
      li.appendChild(doneButton);     
    }

    if(task.now_status === "doing"){
      let filterList = tasks.filter(t => t.now_status === "doing");  
      let index = filterList.findIndex(t => t.id === task.id);

      if (index === 0) {
        doingListElement.prepend(li);
      } else {
        let beforeTaskId = filterList[index - 1].id;  
        let beforeTaskElement = document.getElementById("task_" + beforeTaskId);
        beforeTaskElement.after(li);
      }

      li.appendChild(todoButton);
      li.appendChild(doneButton);
    }

    if(task.now_status === "done"){
      let filterList = tasks.filter(t => t.now_status === "done");  
      let index = filterList.findIndex(t => t.id === task.id);

      if (index === 0) {
        doneListElement.prepend(li);
      } else {
        let beforeTaskId = filterList[index - 1].id;   
        let beforeTaskElement = document.getElementById("task_" + beforeTaskId);
        beforeTaskElement.after(li);
      }

      li.appendChild(todoButton);
      li.appendChild(doingButton);
    }

    li.appendChild(deleteButton);
    li.appendChild(personSpan); 

    todoButton.addEventListener('click', () => {
      fetch('?action=todo',  {
        method: 'POST',
        body: new URLSearchParams({
          id: todoButton.parentNode.dataset.id,
          token: token,
        }),
      })
      .then(response => {
        if(!response.ok) {
          throw new Error('このタスクはすでに削除されています。');
        }       
      })
      .catch(err => {
        alert(err.message);
        location.reload();
      });
      task.now_status = "todo";
      li.remove();
      appendTask(task);
    });
    
    doingButton.addEventListener('click', () => {
      fetch('?action=doing',  {
        method: 'POST',
        body: new URLSearchParams({
          id: doingButton.parentNode.dataset.id,
          token: token,
        }),
      })
      .then(response => {
        if(!response.ok) {
          throw new Error('このタスクはすでに削除されています。');
        }
      })
      .catch(err => {
        alert(err.message);
        location.reload();
      });
      task.now_status = "doing";
      li.remove();
      appendTask(task);
    });

    doneButton.addEventListener('click', () => {
      fetch('?action=done',  {
        method: 'POST',
        body: new URLSearchParams({
          id: doneButton.parentNode.dataset.id,
          token: token,
        }),
      })
      .then(response => {
        if(!response.ok) {
          throw new Error('このタスクはすでに削除されています。');
        }
      })
      .catch(err => {
        alert(err.message);
        location.reload();
      });
      task.now_status = "done";
      li.remove();
      appendTask(task);
    });
   
    deleteButton.addEventListener('click', () => {
      if (!confirm('タスクを削除しますか？')) {
        return;
      }
      
      deleteButton.disabled = true;
      fetch('?action=deleteTask',  {
        method: 'POST',
        body: new URLSearchParams({
          id: deleteButton.parentNode.dataset.id,
          token: token,
        }),
      }).then(() =>  {
        tasks = tasks.filter(t => t.id !== task.id );
        li.remove();
      }); 
    });

  }

  function personAlert() {
    if(!personList.length){
      alert("担当者がいません。先に担当者を入力してください。")
      newPersonElement.focus();      
    } 
  }

  function addTask(jsonId) {
    let idx = selectPerson.selectedIndex;
    let txt  = selectPerson.options[idx].text;
    let person_id  = Number(selectPerson.options[idx].id);
    const newTask ={id: jsonId, now_status: 'todo', task: newTaskElement.value, created_at: new Date().getTime().toString(), person_name: txt, person_id: person_id};
    tasks.push(newTask);
    appendTask(newTask);
       
    newTaskElement.value = "";
    newTaskElement.focus();
    
  }

  addTaskForm.addEventListener('submit', e => {
    e.preventDefault();

    if (newTaskElement.value === ""){
      return;
    }
    addTaskButton.disabled = true;
    
    fetch('?action=addTask',  {
      method: 'POST',
      body: new URLSearchParams({
        task: newTaskElement.value,
        person_id: selectPerson.value,
        token: token,
      }),
    })
    .then(response =>  {
      return response.json();
    })
    .then(json => {
      addTask(json.id);
      addTaskButton.disabled = false;
    });    
  });

  const appendPerson = (person) =>{   
    const li = document.createElement('li');
    const deleteButton = document.createElement('button');
    const personNameSpan = document.createElement('span');
    const input = document.createElement('input');
    const editPersonButton = document.createElement('button');
    const savePersonButton = document.createElement('button');
    const cancelPersonButton = document.createElement('button');

    li.classList.add("person-class");
    input.classList.add("person-edit-input");
    personNameSpan.classList.add("person-name-class");
    editPersonButton.classList.add("edit-button");
    deleteButton.classList.add("delete-button");
    savePersonButton.classList.add("save-button");   
    cancelPersonButton.classList.add("cancel-button");   

    personNameSpan.textContent = person.person_name;
    deleteButton.textContent = 'Delete';
    editPersonButton.textContent = 'Edit';
    savePersonButton.textContent = 'Save';
    cancelPersonButton.textContent = 'Cancel';

    li.dataset.id = person.id;

    li.appendChild(personNameSpan);
    li.appendChild(editPersonButton);
    li.appendChild(deleteButton);
  
    personListElement.appendChild(li);

    editPersonButton.addEventListener('click', () => {
      input.value = person.person_name;

      li.replaceChild(input, personNameSpan);
      li.replaceChild(savePersonButton, editPersonButton);
      li.replaceChild(cancelPersonButton, deleteButton);
    });

    cancelPersonButton.addEventListener('click', () => {
      input.value = person.person_name;

      li.replaceChild(personNameSpan, input);
      li.replaceChild(editPersonButton, savePersonButton);
      li.replaceChild(deleteButton, cancelPersonButton);
    });
    
    savePersonButton.addEventListener('click', () => {
      if (input.value === ""){
        input.value = person.person_name;
        li.replaceChild(personNameSpan, input);
        li.replaceChild(editPersonButton, savePersonButton);
        li.replaceChild(deleteButton, cancelPersonButton);
      }

      fetch('?action=editPerson',  {
        method: 'POST',
        body: new URLSearchParams({
          person: input.value,
          id: person.id,
          token: token,
        })
      }).then(response =>  {
        return response.json();
      }).then(json => {
        person.person_name = json.person_name;      
        personNameSpan.textContent = json.person_name;

        for (let i = 0; i < tasks.length; i++) {
          if (tasks[i].person_id === person.id ) {
            tasks[i].person_name = json.person_name;
          }        
        }

        document.getElementById(person.id).textContent = json.person_name;

        const taskPersonSpan = document.querySelectorAll('[data-person-id="' + person.id + '"]');
        for(let i=0 ; i < taskPersonSpan.length; i++) {
          taskPersonSpan[i].textContent = "：" + json.person_name;
        }

        li.replaceChild(personNameSpan, input);
        li.replaceChild(editPersonButton, savePersonButton);
        li.replaceChild(deleteButton, cancelPersonButton);
      });   
    });

    deleteButton.addEventListener('click', () => {
      if(tasks.find(t => t.person_name === person.person_name)) {       
        alert('この担当者のタスクがまだ残っています');
        return;
      } else {
        deleteButton.disabled = true;
        fetch('?action=deletePerson',  {
          method: 'POST',
          body: new URLSearchParams({
            id: deleteButton.parentNode.dataset.id,
            token: token,
          }),
        }).then(() =>  {
          persons = persons.filter(p => p.id !== person.id );
          li.remove();  
          const personOption = document.getElementById(person.id);
          personOption.remove();          
        });     
      }      
    });
  }

  function addPerson(jsonId) {
    
    const newPerson ={created_at: new Date().getTime().toString(), id: jsonId, person_name: newPersonElement.value, updated_at: new Date().getTime().toString()}
    persons.push(newPerson);
    appendPerson(newPerson);
    appendPersonSelect(newPerson);
            
    newPersonElement.value = "";
    newPersonElement.focus();
  }

  addPersonForm.addEventListener('submit', e =>{
    e.preventDefault();
    
    if (newPersonElement.value === ""){
      return;
    }

    addPersonButton.disabled = true;
    
    fetch('?action=addPerson',  {
      method: 'POST',
      body: new URLSearchParams({
        person: newPersonElement.value,
        token: token,
      }),
    })
    .then(response =>  {
      return response.json();
    })
    .then(json => {
      addPerson(json.id);      
      addPersonButton.disabled = false;          
    });
  })
 
  const appendPersonSelect = (person) => { 
    const option = document.createElement('option');
    option.id = person.id;
    option.value =  person.id;
    option.text = person.person_name;

    selectPerson.appendChild(option);
  }






