<?php

require_once(__DIR__ . '/../app/config.php');

use TaskList\Database;
use TaskList\Task;
use TaskList\Utils;

$pdo = Database::getInstance();

$task = new Task($pdo);
$task->processPost();
$tasks = $task->getTasks();
$persons = $task->getPersons();

?>

<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="css/reset.css">
  <link rel="stylesheet" href="css/style.css">
  <title>Todo</title>
</head>
<body>
  <header class="header">
    <h1>Tatsuki-TASK-LIST</h1>
  </header>
  <main>
    <div class="main-container">
      <div class="task-container">
        <h2>タスク管理</h2>
        <form id="add_task_form">
          <label>
            新規タスク：<input name="task" id="task_text" type="text" placeholder="タスクを入力してください">
          </label>
          <label>担当者：
            <select name="person_id" id="select_person"></select>
          </label>
          <button id="add_task_button">追加</button>
        </form>
        <h3>Todo list</h3>
        <ul id="todo_list"></ul>
        <h3>Doing list</h3>
        <ul id="doing_list"></ul>
        <h3>Done list</h3>
        <ul id="done_list"></ul>
      </div>
      <div class="person-container">
        <h2>担当者管理</h2>
        <form id="add_person_form">
          <label>
            新規担当者：<input name="person" id="person_text" type="text" placeholder="担当者を入力してください">
          </label>
          <button id="add_person_button">追加</button>
        </form>             
        <h3>担当者リスト</h3>
        <ul id="person_list"></ul>
      </div>
    </div>
  </main>
  <footer>

  </footer>
  <script src="js/index.js"></script>
  <script>

    let tasks = <?php echo json_encode($tasks); ?>;
    let persons = <?php echo json_encode($persons); ?>;

    const token = "<?= Utils::h($_SESSION['token']); ?>";

    tasks.forEach((task) => {      
      appendTask(task);   
    });

    persons.forEach((person) => {      
      appendPerson(person);   
      appendPersonSelect(person);
    });
    
  </script>
</body>
</html>