<?php

require_once __DIR__ . "/../vendor/autoload.php";

use Olooeez\AcademicEventManager\Controller\AuthController;
use Olooeez\AcademicEventManager\Controller\CourseController;
use Olooeez\AcademicEventManager\Controller\EventController;
use Olooeez\AcademicEventManager\Config\Database;
use Olooeez\AcademicEventManager\Controller\ScoresController;
use Olooeez\AcademicEventManager\Controller\UserController;
use Olooeez\AcademicEventManager\Helper\Auth;

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PATCH, DELETE");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit;
}

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

            if (is_numeric($segments[1])) {
                $method === "GET" ? $controller->getEventById((int) $segments[1]) : sendJsonResponse(405, ["message" => "Method Not Allowed"]);
                break;
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
                    $method === "PATCH" ? $controller->update($id) : sendJsonResponse(405, ["message" => "Method Not Allowed"]);
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

                if (!isset($segments[2])) {
                    $method === "GET" ? $controller->getCourseById($courseId) : sendJsonResponse(405, ["message" => "Method Not Allowed"]);
                    break;
                }

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
                    $method === "PATCH" ? $controller->update($id) : sendJsonResponse(405, ["message" => "Method Not Allowed"]);
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
    case "user":
        if ($token == null) {
            sendJsonResponse(401, ["message" => "Not authorized"]);
        }

        $jwt_values = $auth->validateJWT($token);

        if ($jwt_values) {
            $userId = $jwt_values["sub"];

            if (is_numeric($segments[1])) {
                $controller = new UserController($connection);

                $userId = (int) $segments[1];

                switch ($method) {
                    case "PATCH":
                        $controller->updateUser($userId);
                        break;
                    case "DELETE":
                        $controller->deleteUser($userId);
                        break;
                    default:
                        sendJsonResponse(405, ["message" => "Method Not Allowed"]);
                }

                break;
            }

            switch ($segments[1]) {
                case "list":
                    $controller = new UserController($connection);

                    $method === "GET" ? $controller->read() : sendJsonResponse(405, ["message" => "Method Not Allowed"]);
                    break;
                case "me":
                    $controller = new UserController($connection);

                    if (isset($segments[2]) && $segments[2] == "edit") {
                        $method === "PATCH" ? $controller->updateUser($userId) : sendJsonResponse(405, ["message" => "Method Not Allowed"]);
                        break;
                    } else if (isset($segments[2])) {
                        sendJsonResponse(404, ["message" => "Action not found"]);
                        break;
                    }

                    $method === "GET" ? $controller->getUser($userId) : sendJsonResponse(405, ["message" => "Method Not Allowed"]);
                    break;
                case "courses":
                    $controller = new CourseController($connection);
                    $method === "GET" ? $controller->getCoursesFromStudent($userId) : sendJsonResponse(405, ["message" => "Method Not Allowed"]);
                    break;
                case "events":
                    $controller = new EventController($connection);
                    $method === "GET" ? $controller->getEventFromStudent($userId) : sendJsonResponse(405, ["message" => "Method Not Allowed"]);
                    break;
                default:
                    sendJsonResponse(404, ["message" => "Action not found"]);
            }
        } else {
            sendJsonResponse(401, ["message" => "Not authorized"]);
        }

        break;
    case "scores":
        if ($token == null) {
            sendJsonResponse(401, ["message" => "Not authorized"]);
        }

        $controller = new ScoresController($connection);

        $method === "GET" ? $controller->getScores() : sendJsonResponse(405, ["message" => "Method Not Allowed"]);
        break;
    case "registration":
        if ($token == null) {
            sendJsonResponse(401, ["message" => "Not authorized"]);
        }

        $controller = new UserController($connection);

        $method === "GET" ? $controller->listUsersWithCourses() : sendJsonResponse(405, ["message" => "Method Not Allowed"]);
        break;
    default:
        sendJsonResponse(404, ["message" => "Controller not found"]);
}
