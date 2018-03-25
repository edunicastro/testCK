<?php
  require_once('connection.php');
  $method = $_SERVER['REQUEST_METHOD'];
  $input = json_decode(file_get_contents('php://input'), true);

  switch ($method) {
    case 'GET':
      $sql = "SELECT * FROM `clientes` WHERE id=$key":''; break;
    case 'PUT':
      $sql = "update `clientes` set $set where id=$key"; break;
    case 'POST':
      $sql = "INSERT INTO `clientes` SET $set"; break;
    case 'DELETE':
      $sql = "DELETE FROM `clientes` WHERE id=$key"; break;
  }

  $result = mysqli_query($link, $sql);

  print_r($result);
?>
