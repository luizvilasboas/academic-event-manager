<?php

namespace Olooeez\AcademicEventManager\Model;

class Registration {
    private \PDO $connection;
    private string $table = "registrations";
    public int $student_id;
    public int $course_id;

    public function __construct(\PDO $connection)
    {
        $this->connection = $connection;
    }

    public function register(): bool
    {
        $sql = "INSERT INTO " . $this->table . " (student_id, course_id) VALUES (:student_id, :course_id)";
        $stmt = $this->connection->prepare($sql);

        $stmt->bindParam(":student_id", $this->student_id);
        $stmt->bindParam(":course_id", $this->course_id);

        return $stmt->execute();
    }

    public function unregister(): bool
    {
        $sql = "DELETE FROM " . $this->table . " WHERE student_id = :student_id AND course_id = :course_id";
        $stmt = $this->connection->prepare($sql);

        $stmt->bindParam(":student_id", $this->student_id);
        $stmt->bindParam(":course_id", $this->course_id);

        return $stmt->execute();
    }
}
