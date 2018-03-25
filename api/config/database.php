<?php
  class Database {
    private $host = "localhost";
    private $db_name = "cknowledge";
    private $username = "root";
    private $password = "";
    private $charset = "utf8";
    public $conn;

    public function getConnection() {


      $this->conn = null;

      try {
          $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=".$this->charset, $this->username, $this->password);
          $this->conn->exec("set names utf8");
      } catch(PDOException $exception) {
          echo "Connection error: " . $exception->getMessage();
      }

      return $this->conn;

    }

  }


?>
