<?php

namespace Olooeez\AcademicEventManager\Controller;

use Olooeez\AcademicEventManager\Model\User;
use Olooeez\AcademicEventManager\Helper\Auth;

class AuthController
{
    private $user;

    public function __construct(\PDO $connection)
    {
        $this->user = new User($connection);
    }

    public function login()
    {
        header("Content-Type: application/json");

        $data = json_decode(file_get_contents("php://input"));

        if (!empty($data->email) && !empty($data->password)) {
            $this->user->email = $data->email;
            $this->user->password = $data->password;

            $user_row = $this->user->checkCredentials();

            if ($user_row) {
                $auth = new Auth();
                $jwt = $auth->generateJWT($user_row["id"], $user_row["email"]);
                echo json_encode(["token" => $jwt]);
            } else {
                http_response_code(401);
                echo json_encode(["message" => "Invalid credentials"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Unable to login. Data is incomplete"]);
        }
    }

    public function register()
    {
        header("Content-Type: application/json");

        $data = json_decode(file_get_contents("php://input"));

        if (
            !empty($data->name) &&
            !empty($data->email) &&
            !empty($data->password)
        ) {
            $this->user->name = $data->name;
            $this->user->email = $data->email;
            $this->user->password = password_hash($data->password, PASSWORD_BCRYPT);

            if ($this->user->create()) {
                http_response_code(201);
                echo json_encode(["message" => "User registered successfully"]);
            } else {
                http_response_code(500);
                echo json_encode(["message" => "Unable to register user"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Unable to register. Data is incomplete"]);
        }
    }
}
