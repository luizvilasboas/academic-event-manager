<?php

namespace Olooeez\AcademicEventManager\Model;

class Course
{
    private \PDO $connection;
    private string $table = "courses";
    public int $id;
    public int $event_id;
    public string $title;
    public string $description;
    public $start_time;
    public $end_time;

    public function __construct(\PDO $connection)
    {
        $this->connection = $connection;
    }

    public function create(): bool
    {
        $sql = "INSERT INTO {$this->table} (event_id, title, description, start_time, end_time) VALUES (:event_id, :title, :description, :start_time, :end_time)";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(":event_id", $this->event_id);
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":start_time", $this->start_time);
        $stmt->bindParam(":end_time", $this->end_time);

        return $stmt->execute();
    }

    public function readAll(): array
    {
        $sql = "SELECT * FROM {$this->table}";
        $stmt = $this->connection->query($sql);

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function readOne(int $id): array
    {
        $sql = "SELECT * FROM {$this->table} WHERE id = :id";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(":id", $id);
        $stmt->execute();

        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    public function update(int $id): bool
    {
        $sql = "UPDATE {$this->table} SET event_id = :event_id, title = :title, description = :description, start_time = :start_time, end_time = :end_time WHERE id = :id";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(":event_id", $this->event_id);
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":start_time", $this->start_time);
        $stmt->bindParam(":end_time", $this->end_time);
        $stmt->bindParam(":id", $id);

        return $stmt->execute();
    }

    public function delete(int $id): bool
    {
        $sql = "DELETE FROM {$this->table} WHERE id = :id";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(":id", $id);

        return $stmt->execute();
    }

    public function getCoursesByUser(int $userId): array
    {
        $sql = "SELECT c.event_id AS id, c.title, c.description, c.start_time, c.end_time FROM {$this->table} c JOIN registrations r ON c.id = r.course_id WHERE r.student_id = :user_id";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(":user_id", $userId, \PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}
