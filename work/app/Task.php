<?php

namespace TaskList;

class Task
{
  private $pdo;

  public function __construct($pdo)
  {
    $this->pdo = $pdo;
    Token::create();
  }

  public function processPost()
  {   
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
      Token::validate();
      $action = filter_input(INPUT_GET, 'action');

      switch ($action) {
        case 'addTask':
          $id = $this->addTask();
          header('Content-Type: application/json');
          echo json_encode(['id' => $id]);
          break;
        case 'todo':
          $this->todoTask();
          break;
        case 'doing':
          $this->doingTask();
          break;
        case 'done':
          $this->doneTask();
          break;
        case 'deleteTask':
          $this->deleteTask();
        break;
        case 'addPerson':
          $id = $this->addPerson();
          header('Content-Type: application/json');
          echo json_encode(['id' => $id]);
        break;
        case 'editPerson':
          $person_name = $this->editPerson();
          header('Content-Type: application/json');
          echo json_encode(['person_name' => $person_name]);
          break;
        case 'deletePerson':
          $this->deletePerson();
        break;
        default:
          exit;
      }

      exit;
    }
  }

  private function addTask()
  {
    $task = trim(filter_input(INPUT_POST, 'task'));

    if ($task === '') {
      return;
    } 
    if(isset($_POST["person_id"])) {
      $person_id = $_POST["person_id"];
      if ($person_id === '') {
        return;
      } 
    }

    $stmt = $this->pdo->prepare("INSERT INTO tasks (task, person_id) VALUES (:task, :person_id)");
    $stmt->bindValue('task', $task, \PDO::PARAM_STR);
    $stmt->bindValue('person_id', $person_id, \PDO::PARAM_INT);
    $stmt->execute();
    
    return (int) $this->pdo->lastInsertId();
  } 

  private function addPerson()
  {
    $person = trim(filter_input(INPUT_POST, 'person'));
    if ($person === '') {
      return;
    } 
    
    $stmt = $this->pdo->prepare("INSERT INTO persons (person_name) VALUES (:person)");
    $stmt->bindValue('person', $person, \PDO::PARAM_STR);
    $stmt->execute();

    return (int) $this->pdo->lastInsertId();
  } 

  private function todoTask()
  {
    $id = filter_input(INPUT_POST, 'id');
    if (empty($id)) {
      return;
    }

    $stmt = $this->pdo->prepare("SELECT * FROM tasks WHERE id = :id");
    $stmt->bindValue('id', $id, \PDO::PARAM_INT);
    $stmt->execute();
    $task = $stmt->fetch();
    if (empty($task)) {
      header('HTTP', true, 404);
      exit; 
    }

    $stmt = $this->pdo->prepare("UPDATE tasks SET now_status = 'todo' WHERE id = :id");
    $stmt->bindValue('id', $id, \PDO::PARAM_INT);
    $stmt->execute();
  }

  private function doingTask()
  {
    $id = filter_input(INPUT_POST, 'id');
    if (empty($id)) {
      return;
    }

    $stmt = $this->pdo->prepare("SELECT * FROM tasks WHERE id = :id");
    $stmt->bindValue('id', $id, \PDO::PARAM_INT);
    $stmt->execute();
    $task = $stmt->fetch();
    if (empty($task)) {
      header('HTTP', true, 404);
      exit; 
    }

    $stmt = $this->pdo->prepare("UPDATE tasks SET now_status = 'doing' WHERE id = :id");
    $stmt->bindValue('id', $id, \PDO::PARAM_INT);
    $stmt->execute();
  }

  private function doneTask()
  {
    $id = filter_input(INPUT_POST, 'id');
    if (empty($id)) {
      return;
    }

    $stmt = $this->pdo->prepare("SELECT * FROM tasks WHERE id = :id");
    $stmt->bindValue('id', $id, \PDO::PARAM_INT);
    $stmt->execute();
    $task = $stmt->fetch();
    if (empty($task)) {
      header('HTTP', true, 404);
      exit; 
    }

    $stmt = $this->pdo->prepare("UPDATE tasks SET now_status = 'done' WHERE id = :id");
    $stmt->bindValue('id', $id, \PDO::PARAM_INT);
    $stmt->execute();
  }

  private function deleteTask()
  {
    $id = filter_input(INPUT_POST, 'id');
    if (empty($id)) {
      return;
    }

    $stmt = $this->pdo->prepare("DELETE FROM tasks WHERE id = :id");
    $stmt->bindValue('id', $id, \PDO::PARAM_INT);
    $stmt->execute();
  }

  private function deletePerson()
  {
    $id = filter_input(INPUT_POST, 'id');
    if (empty($id)) {
      return;
    }

    $stmt = $this->pdo->prepare("DELETE FROM persons WHERE id = :id");
    $stmt->bindValue('id', $id, \PDO::PARAM_INT);
    $stmt->execute();
  }

  private function editPerson()
  {
    $id = filter_input(INPUT_POST, 'id');
    if (empty($id)) {
      return;
    }

    $person = trim(filter_input(INPUT_POST, 'person'));
    if ($person === '') {
      return;
    } 

    $stmt = $this->pdo->prepare("UPDATE persons SET person_name = (:person)  WHERE id = :id");
    $stmt->bindValue('person', $person, \PDO::PARAM_STR);
    $stmt->bindValue('id', $id, \PDO::PARAM_INT);
    $stmt->execute();

    return $person;
  }

  public function getTasks()
  {
    $stmt_todo = $this->pdo->query(
      "SELECT 
        tasks.id, now_status, task, tasks.created_at, persons.person_name, tasks.person_id 
      FROM 
        tasks 
      LEFT JOIN persons ON tasks.person_id = persons.id");

    $results = $stmt_todo->fetchAll();
     
    return $results;
  }

  public function getPersons()
  {
    $stmt_todo = $this->pdo->query("SELECT * FROM persons ORDER BY created_at");

    $persons = $stmt_todo->fetchAll();

    return $persons;
  }
}