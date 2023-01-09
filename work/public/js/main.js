'use strict';

{
  const doingButtons = document.querySelectorAll('button[id="doing-button"]');
  doingButtons.forEach(doingButton => {
    doingButton.addEventListener('click', () => {
      fetch('?action=doing',  {
        method: 'POST',
        body: new URLSearchParams({
          id: doingButton.dataset.id,
          token: doingButton.dataset.token,
        }),
      });
    });
  });

  const appendTask = (task) =>{   
    const li = document.createElement('li');
    const taskSpan = document.createElement('span');
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
      if (!confirm('タスクを削除しますか？')) {
        return;
      }
      deleteButton.parentNode.submit();
      taskList = taskList.filter(t => t.id !== task.id );
      li.remove();
    });
  }


}