<?php

require_once __DIR__ . "/../vendor/autoload.php";

use Olooeez\AcademicEventManager\Controller\AuthController;
use Olooeez\AcademicEventManager\Controller\CourseController;
use Olooeez\AcademicEventManager\Controller\EventController;
use Olooeez\AcademicEventManager\Config\Database;
use Olooeez\AcademicEventManager\Controller\UserController;
use Olooeez\AcademicEventManager\Helper\Auth;

function sendJsonResponse($code, $message)
{
    http_response_code($code);
    echo json_encode($message);
    exit();
}

$method = $_SERVER["REQUEST_METHOD"];
$request = trim($_SERVER["REQUEST_URI"], "/");
$segments = explode("/", $request);

$headers = getallheaders();
$token = isset($headers["Authorization"]) ? str_replace("Bearer ", "", $headers["Authorization"]) : null;

$database = new Database();
$connection = $database->getConnection();

$auth = new Auth();

switch ($segments[0]) {
    case "auth":
        $controller = new AuthController($connection);
        switch ($segments[1]) {
            case "login":
                $method === "POST" ? $controller->login() : sendJsonResponse(405, ["message" => "Method Not Allowed"]);
                break;
            case "register":
                $method === "POST" ? $controller->register() : sendJsonResponse(405, ["message" => "Method Not Allowed"]);
                break;
            default:
                sendJsonResponse(404, ["message" => "Action not found"]);
        }
        break;
    case "event":
        if ($token == null) {
            sendJsonResponse(401, ["message" => "Not authorized"]);
        }
        if ($auth->validateJWT($token)) {
            $controller = new EventController($connection);
            switch ($segments) {
                case "create":
                    $method === "POST" ? $controller->create() : sendJsonResponse(405, ["message" => "Method Not Allowed"]);
                    break;
                case "update":
                    if (isset($segments[2])) {
                        $id = $segments[2];
                    } else {
                        sendJsonResponse(405, ["message" => "Course ID not found"]);
                    }
                    $method === "PUT" ? $controller->update($id) : sendJsonResponse(405, ["message" => "Method Not Allowed"]);
                    break;
                case "list":
                    $method === "GET" ? $controller->read() : sendJsonResponse(405, ["message" => "Method Not Allowed"]);
                    break;
                case "delete":
                    if (isset($segments[2])) {
                        $id = $segments[2];
                    } else {
                        sendJsonResponse(405, ["message" => "Course ID not found"]);
                    }
                    $method === "DELETE" ? $controller->delete($id) : sendJsonResponse(405, ["message" => "Method Not Allowed"]);
                    break;
                default:
                    sendJsonResponse(404, ["message" => "Action not found"]);
            }
        } else {
            sendJsonResponse(401, ["message" => "Not authorized"]);
        }
        break;
    case "course":
        if ($token == null) {
            sendJsonResponse(401, ["message" => "Not authorized"]);
        }

        $jwt_values = $auth->validateJWT($token);
                
        if ($jwt_values) {
            $userId = $jwt_values["sub"];

            $controller = new CourseController($connection);

            if (is_numeric($segments[1])) {
                $courseId = (int) $segments[1];

                if ($token == null) {
                    sendJsonResponse(401, ["message" => "Not authorized"]);
                }

                switch ($segments[2]) {
                    case "enroll":
                        $method === "POST" ? $controller->enroll($userId, $courseId) : sendJsonResponse(405, ["message" => "Method Not Allowed"]);
                        break;
                    case "unroll":
                        $method === "DELETE" ? $controller->enroll($userId, $courseId) : sendJsonResponse(405, ["message" => "Method Not Allowed"]);
                        break;
                    default:
                        sendJsonResponse(404, ["message" => "Action not found"]);
                }
            }

            switch ($segments[1]) {
                case "create":
                    $method === "POST" ? $controller->create() : sendJsonResponse(405, ["message" => "Method Not Allowed"]);
                    break;
                case "update":
                    if (isset($segments[2])) {
                        $id = $segments[2];
                    } else {
                        sendJsonResponse(405, ["message" => "Course ID not found"]);
                    }
                    $method === "PUT" ? $controller->update($id) : sendJsonResponse(405, ["message" => "Method Not Allowed"]);
                    break;
                case "list":
                    $method === "GET" ? $controller->read() : sendJsonResponse(405, ["message" => "Method Not Allowed"]);
                    break;
                case "delete":
                    if (isset($segments[2])) {
                        $id = $segments[2];
                    } else {
                        sendJsonResponse(405, ["message" => "Course ID not found"]);
                    }
                    $method === "DELETE" ? $controller->delete($id) : sendJsonResponse(405, ["message" => "Method Not Allowed"]);
                    break;
                default:
                    sendJsonResponse(404, ["message" => "Action not found"]);
            }
        } else {
            sendJsonResponse(401, ["message" => "Not authorized"]);
        }
        break;
    case "me":
        if ($token == null) {
            sendJsonResponse(401, ["message" => "Not authorized"]);
        }

        $jwt_values = $auth->validateJWT($token);

        if ($jwt_values) {
            $controller = new UserController($connection);

            $method === "GET" ? $controller->getUser($userId) : sendJsonResponse(405, ["message" => "Method Not Allowed"]);

            switch ($segments[1]) {
                case "courses":
                    $controller = new CourseController($connection);

                    $userId = $jwt_values["sub"];

                    $method === "GET" ? $controller->getCoursesFromStudent($userId) : sendJsonResponse(405, ["message" => "Method Not Allowed"]);
                    break;
            }
        } else {
            sendJsonResponse(401, ["message" => "Not authorized"]);
        }

        break;
    default:
        sendJsonResponse(404, ["message" => "Controller not found"]);
}
