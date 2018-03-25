<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include_once './config/database.php';

$database = new Database();
$db = $database->getConnection();

$cliente = new Cliente($db);

if(isset($_GET['acao'])) {
  switch ($_GET['acao']) {
    case 'add':
      if($_POST['nome']!='' && $_POST['sobrenome']!='' && $_POST['endereco']!='') {
        $insert_id = $cliente->insertCliente($_POST);
        $_POST['id'] = $insert_id;
        echo json_encode($_POST);
      }
    break;
    case 'update':
      if($_POST['id']!='' && $_POST['nome']!='' && $_POST['sobrenome']!='' && $_POST['endereco']!='') {
        $stmt = $cliente->updateCliente($_POST);
        $rows = $cliente->getAll()->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($rows);
      }
    break;
    case 'delete':
      if($_GET['id']!='' && is_int((int)$_GET['id'])) {
        $stmt = $cliente->deleteCliente($_GET['id']);
        $rows = $cliente->getAll()->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($rows);
      }
    break;
  }
} else {
  $rows = $cliente->getAll()->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($rows);
}




class Cliente {
    private $conn;
    private $table_name = "clientes";

    // object properties
    public $id;
    public $nome;
    public $sobrenome;
    public $endereco;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    function getAll() {
      $stmt = $this->conn->prepare("SELECT * FROM $this->table_name;");
      $stmt->execute();
      return $stmt;
    }

    function updateCliente($cliente) {
      $stmt = $this->conn->prepare("UPDATE $this->table_name SET nome=:nome, sobrenome=:sobrenome, endereco=:endereco WHERE id = :id;");
      $stmt->bindValue(":id", $cliente['id']);
      $stmt->bindValue(":nome", $cliente['nome']);
      $stmt->bindValue(":sobrenome", $cliente['sobrenome']);
      $stmt->bindValue(":endereco", $cliente['endereco']);
      $stmt->execute();
      return $stmt;
    }

    function deleteCliente($id) {
      $stmt = $this->conn->prepare("DELETE FROM $this->table_name WHERE id = :id;");
      $stmt->bindValue(":id", $id);
      $stmt->execute();
      return $stmt;
    }

    function insertCliente($cliente) {
      $stmt = $this->conn->prepare("INSERT INTO $this->table_name VALUES (NULL, :nome, :sobrenome, :endereco);");
      $stmt->bindValue(":nome", $cliente['nome']);
      $stmt->bindValue(":sobrenome", $cliente['sobrenome']);
      $stmt->bindValue(":endereco", $cliente['endereco']);
      $stmt->execute();
      return $this->conn->lastInsertId();
    }
}

?>
