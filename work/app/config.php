<?php

session_start();

define('DSN', getenv('DSN'));
define('DB_USER', getenv('DB_USER'));
define('DB_PASS', getenv('DB_PASS'));
define('SITE_URL', 'http://' . $_SERVER['HTTP_HOST']);

spl_autoload_register(function ($class) {
  $prefix = 'TaskList\\';

  if (strpos($class, $prefix) === 0) {
    $fileName = sprintf(__DIR__ . '/%s.php', substr($class, strlen($prefix)));
  
    if(file_exists($fileName)) {
      require_once($fileName);
    } else {
      echo 'File not found: ' . $fileName;
      exit;
    }
  } 
});
