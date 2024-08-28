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
        $sql = "SELECT id, name, email, password, is_admin FROM {$this->table} WHERE email = :email LIMIT 0,1";
        $stmt = $this->connection->prepare($sql);
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
        $sql = "INSERT INTO {$this->table} (name, email, password) VALUES (:name, :email, :password)";
        $stmt = $this->connection->prepare($sql);

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
        $sql = "UPDATE {$this->table} SET name = :name, email = :email, password = :password WHERE id = :id";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":password", $this->password);
        $stmt->bindParam(":id", $this->id);

        return $stmt->execute();
    }

    public function delete(int $id): bool
    {
        $sql = "DELETE FROM {$this->table} WHERE id = :id";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(":id", $id, \PDO::PARAM_INT);

        return $stmt->execute();
    }

    public function readOne(int $id): array
    {
        $sql = "SELECT * FROM {$this->table} WHERE id = :id";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(":id", $id);
        $stmt->execute();

        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    public function readAll(): array
    {
        $sql = "SELECT id, name, email FROM {$this->table}";
        $stmt = $this->connection->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function getUsersWithCourses(): array
    {
        $sql = "SELECT u.id AS user_id, u.name AS user_name, u.email AS user_email, c.id AS course_id, c.title AS course_title, c.description AS course_description FROM {$this->table} u LEFT JOIN registrations r ON u.id = r.student_id LEFT JOIN courses c ON r.course_id = c.id ORDER BY u.name ASC, c.title ASC";
        $stmt = $this->connection->prepare($sql);
        $stmt->execute();

        $usersWithCourses = [];
        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $userId = $row['user_id'];
            if (!isset($usersWithCourses[$userId])) {
                $usersWithCourses[$userId] = [
                    'id' => $row['user_id'],
                    'name' => $row['user_name'],
                    'email' => $row['user_email'],
                    'courses' => []
                ];
            }
            if ($row['course_id']) {
                $usersWithCourses[$userId]['courses'][] = [
                    'id' => $row['course_id'],
                    'title' => $row['course_title'],
                    'description' => $row['course_description']
                ];
            }
        }

        return array_values($usersWithCourses);
    }

    public function getCoursesByUser(int $userId): array
    {
        $sql = "SELECT c.id AS id, c.title, c.description, c.start_time, c.end_time FROM courses c JOIN registrations r ON c.id = r.course_id WHERE r.student_id = :user_id";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(":user_id", $userId, \PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function getEventsByUser($userId): array
    {
        $sql = "SELECT DISTINCT e.id, e.name, e.description FROM events e JOIN courses c ON e.id = c.event_id JOIN registrations r ON c.id = r.course_id WHERE r.student_id = :user_id";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(":user_id", $userId, \PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}
