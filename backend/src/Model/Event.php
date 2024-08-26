<?php

namespace Olooeez\AcademicEventManager\Model;

class Event
{
    private $connection;
    private $table = "events";
    public $id;
    public $name;
    public $description;
    public $start_time;
    public $end_time;

    public function __construct(\PDO $connection)
    {
        $this->connection = $connection;
    }

    public function create()
    {
        $query = "INSERT INTO {$this->table} SET name=:name, description=:description, start_time=:start_time, end_time=:end_time";
        $stmt = $this->connection->prepare($query);

        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->start_time = htmlspecialchars(strip_tags($this->start_time));
        $this->end_time = htmlspecialchars(strip_tags($this->end_time));

        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":start_time", $this->start_time);
        $stmt->bindParam(":end_time", $this->end_time);

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
        $sql = "UPDATE " . $this->table . " SET name = :name, description = :description, start_time = :start_time, end_time = :end_time WHERE id = :id";
        $stmt = $this->connection->prepare($sql);

        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":start_time", $this->start_time);
        $stmt->bindParam(":end_time", $this->end_time);
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

    public function getByIdWithCourses(int $id): ?array
    {
        $sql = "SELECT id, name, description, start_time, end_time 
                FROM {$this->table} 
                WHERE id = :id";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(':id', $id, \PDO::PARAM_INT);
        $stmt->execute();

        $event = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$event) {
            return null;
        }

        $sqlCourses = "SELECT id, title, description, start_time, end_time
                       FROM courses
                       WHERE event_id = :event_id";
        $stmtCourses = $this->connection->prepare($sqlCourses);
        $stmtCourses->bindParam(':event_id', $id, \PDO::PARAM_INT);
        $stmtCourses->execute();

        $courses = $stmtCourses->fetchAll(\PDO::FETCH_ASSOC);

        $event['courses'] = $courses;

        return $event;
    }

}
