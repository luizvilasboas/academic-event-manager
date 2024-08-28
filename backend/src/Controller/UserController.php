<?php

namespace Olooeez\AcademicEventManager\Controller;

use Olooeez\AcademicEventManager\Model\User;

class UserController
{
    private User $user;

    public function __construct(\PDO $connection)
    {
        $this->user = new User($connection);
    }

    public function update(int $userId)
    {
        header("Content-Type: application/json");

        $data = json_decode(file_get_contents("php://input"), true);

        if (isset($data["name"], $data["email"], $data["password"])) {
            $this->user->id = $userId;
            $this->user->name = $data["name"];
            $this->user->email = $data["email"];
            $this->user->password = password_hash($data["password"], PASSWORD_BCRYPT);

            if ($this->user->update()) {
                http_response_code(200);
                echo json_encode(["message" => "User updated successfully"]);
            } else {
                http_response_code(500);
                echo json_encode(["message" => "Failed to update user"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Invalid input"]);
        }
    }

    public function get(int $userId)
    {
        header("Content-Type: application/json");

        $userData = $this->user->readOne($userId);

        if ($userData) {
            unset($userData["password"]);
            http_response_code(200);
            echo json_encode($userData);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "User not found"]);
        }
    }

    public function delete(int $userId)
    {
        header("Content-Type: application/json");

        if ($this->user->delete($userId)) {
            http_response_code(200);
            echo json_encode(["message" => "User deleted successfully"]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Failed to delete user"]);
        }
    }

    public function list()
    {
        header("Content-Type: application/json");

        $users = $this->user->readAll();

        if (!empty($users)) {
            http_response_code(200);
            echo json_encode($users);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Nenhum usuário encontrado."]);
        }
    }

    public function listUsersWithCourses()
    {
        header("Content-Type: application/json");

        $usersWithCourses = $this->user->getUsersWithCourses();

        if ($usersWithCourses) {
            http_response_code(200);
            echo json_encode($usersWithCourses);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "No users found."]);
        }
    }

    public function getCoursesFromUser(int $userId)
    {
        header("Content-Type: application/json");

        $courses = $this->user->getCoursesByUser($userId);

        http_response_code(200);
        echo json_encode($courses);
    }

    public function getEventFromUser(int $userId)
    {
        header("Content-Type: application/json");

        if (!$userId) {
            http_response_code(400);
            echo json_encode(["message" => "Student ID is required"]);
            return;
        }

        try {
            $events = $this->user->getEventsByUser($userId);

            http_response_code(200);
            echo json_encode($events);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "An error occurred while retrieving events", "error" => $e->getMessage()]);
        }
    }
}
