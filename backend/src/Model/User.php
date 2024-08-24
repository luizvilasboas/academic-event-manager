<?php

namespace Olooeez\AcademicEventManager\Model;

class User
{
    private $connection;
    private $table = "users";
    public $id;
    public $name;
    public $email;
    public $password;

    public function __construct(\PDO $database)
    {
        $this->connection = $database;
    }

    public function checkCredentials(): array|bool
    {
        $query = "SELECT id, email, password FROM {$this->table} WHERE email = :email LIMIT 0,1";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(":email", $this->email);
        $stmt->execute();

        $row = $stmt->fetch(\PDO::FETCH_ASSOC);

        if ($row && password_verify($this->password, $row["password"])) {
            return $row;
        }

        return false;
    }

    public function create()
    {
        $query = "INSERT INTO {$this->table} (name, email, password) VALUES (:name, :email, :password)";
        $stmt = $this->connection->prepare($query);

        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->password = htmlspecialchars(strip_tags($this->password));

        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":password", $this->password);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function update(): bool
    {
        $sql = "UPDATE " . $this->table . " SET name = :name, email = :email, password = :password WHERE id = :id";
        $stmt = $this->connection->prepare($sql);

        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":password", $this->password);
        $stmt->bindParam(":id", $this->id);

        return $stmt->execute();
    }

    public function readOne(int $id): array
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(":id", $id);
        $stmt->execute();

        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }
}
