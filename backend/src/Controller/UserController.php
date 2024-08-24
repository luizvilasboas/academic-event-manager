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
}
