DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS persons;

CREATE TABLE persons (
  id INT NOT NULL AUTO_INCREMENT,
  person_name TEXT,
  PRIMARY KEY (id),
  created_at datetime  default current_timestamp,
  updated_at timestamp default current_timestamp on update current_timestamp
);

CREATE TABLE tasks (
  id INT NOT NULL AUTO_INCREMENT,
  now_status VARCHAR(10) DEFAULT 'todo',  
  task VARCHAR(30),
  person_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (person_id) REFERENCES persons(id)
   ON DELETE CASCADE
   ON UPDATE CASCADE,
  created_at datetime  default current_timestamp,
  updated_at timestamp default current_timestamp on update current_timestamp
);

INSERT INTO persons (person_name) VALUES ('Shibata');
INSERT INTO persons (person_name) VALUES ('Makino');

INSERT INTO tasks (task, now_status, person_id) VALUES ('Cleaning','todo', 1);
INSERT INTO tasks (task, now_status, person_id) VALUES ('Shopping', 'doing', 2);

SELECT 
  tasks.id, now_status, task, tasks.created_at, person_name
FROM 
  tasks LEFT JOIN persons ON tasks.person_id = persons.id;

SELECT * FROM tasks;
SELECT * FROM persons;

