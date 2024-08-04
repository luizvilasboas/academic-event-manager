<?php

namespace Olooeez\AcademicEventManager\Model;

class Event
{
    private $connection;
    private $table = "events";
    public $id;
    public $name;
    public $description;
    public $start_date;
    public $end_date;

    public function __construct(\PDO $connection)
    {
        $this->connection = $connection;
    }

    public function create()
    {
        $query = "INSERT INTO {$this->table} SET name=:name, description=:description, start_date=:start_date, end_date=:end_date";
        $stmt = $this->connection->prepare($query);

        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->start_date = htmlspecialchars(strip_tags($this->start_date));
        $this->end_date = htmlspecialchars(strip_tags($this->end_date));

        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":start_date", $this->start_date);
        $stmt->bindParam(":end_date", $this->end_date);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function readAll(): array
    {
        $query = "SELECT * FROM {$this->table}";
        $stmt = $this->connection->query($query);

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function readOne(int $id): array
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(":id", $id);
        $stmt->execute();

        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    public function update(int $id): bool
    {
        $sql = "UPDATE " . $this->table . " SET name = :name, description = :description, start_date = :start_date, end_date = :end_date WHERE id = :id";
        $stmt = $this->connection->prepare($sql);

        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":start_date", $this->start_date);
        $stmt->bindParam(":end_date", $this->end_date);
        $stmt->bindParam(":id", $id);

        return $stmt->execute();
    }

    public function delete(int $id): bool
    {
        $sql = "DELETE FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(":id", $id);

        return $stmt->execute();
    }

    public function getEventsByUser($userId): array
    {
        $sql = "SELECT events.* FROM {$this->table} 
                JOIN enrollments ON events.id = enrollments.event_id 
                WHERE enrollments.user_id = :user_id";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(":user_id", $userId);
        $stmt->execute();

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}
