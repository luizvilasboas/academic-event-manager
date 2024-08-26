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

    public function updateUser(int $id)
    {
        header("Content-Type: application/json");

        $data = json_decode(file_get_contents("php://input"), true);

        if (isset($data["name"], $data["email"], $data["password"])) {
            $this->user->id = $id;
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

    public function getUser(int $id)
    {
        header("Content-Type: application/json");

        $userData = $this->user->readOne($id);

        if ($userData) {
            unset($userData["password"]);
            http_response_code(200);
            echo json_encode($userData);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "User not found"]);
        }
    }

    public function deleteUser(int $id)
    {
        header("Content-Type: application/json");

        if ($this->user->delete($id)) {
            http_response_code(200);
            echo json_encode(["message" => "User deleted successfully"]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Failed to delete user"]);
        }
    }

    public function read()
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

    public function getCoursesFromStudent(int $id)
    {
        header("Content-Type: application/json");

        $courses = $this->user->getCoursesByUser($id);

        http_response_code(200);
        echo json_encode($courses);
    }

    public function getEventFromStudent(int $id)
    {
        header("Content-Type: application/json");

        if (!$id) {
            http_response_code(400);
            echo json_encode(["message" => "Student ID is required"]);
            return;
        }

        try {
            $events = $this->user->getEventsByUser($id);

            http_response_code(200);
            echo json_encode($events);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "An error occurred while retrieving events", "error" => $e->getMessage()]);
        }
    }
}
