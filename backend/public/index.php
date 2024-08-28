<?php

require_once __DIR__ . "/../vendor/autoload.php";

use Olooeez\AcademicEventManager\Controller\AuthController;
use Olooeez\AcademicEventManager\Controller\CourseController;
use Olooeez\AcademicEventManager\Controller\EventController;
use Olooeez\AcademicEventManager\Config\Database;
use Olooeez\AcademicEventManager\Controller\ScoresController;
use Olooeez\AcademicEventManager\Controller\UserController;
use Olooeez\AcademicEventManager\Helper\Auth;

setupCors();
handleOptionsRequest();

function setupCors()
{
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');
    }
}

function handleOptionsRequest()
{
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PATCH, DELETE");
        }
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
        }
        exit();
    }
}

function sendJsonResponse($code, $message)
{
    http_response_code($code);
    echo json_encode($message);
    exit();
}

$method = $_SERVER["REQUEST_METHOD"];
$segments = explode("/", trim($_SERVER["REQUEST_URI"], "/"));

$headers = getallheaders();
$token = isset($headers["Authorization"]) ? str_replace("Bearer ", "", $headers["Authorization"]) : null;

$database = new Database();
$connection = $database->getConnection();

$auth = new Auth();
if ($segments[0] !== 'auth' && !$auth->validateJWT($token)) {
    sendJsonResponse(401, ["message" => "Not authorized"]);
}

switch ($segments[0]) {
    case "auth":
        handleAuth($segments, $method, $connection);
        break;
    case "event":
        handleEvent($segments, $method, $connection);
        break;
    case "course":
        handleCourse($segments, $method, $connection);
        break;
    case "user":
        handleUser($segments, $method, $connection);
        break;
    case "scores":
        handleScores($method, $connection);
        break;
    case "registration":
        handleRegistration($method, $connection);
        break;
    default:
        sendJsonResponse(404, ["message" => "Controller not found"]);
}

function handleAuth($segments, $method, $connection)
{
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
}

function handleEvent($segments, $method, $connection)
{
    global $auth, $token;
    $jwt_values = $auth->validateJWT($token);

    $controller = new EventController($connection);
    $id = $segments[2] ?? null;

    if ($segments[1] === "list") {
        $method === "GET" ? $controller->list() : sendJsonResponse(405, ["message" => "Method Not Allowed"]);
        return;
    }

    if (!$jwt_values["is_admin"]) {
        sendJsonResponse(403, ["message" => "Access denied. Admins only."]);
    }

    if (is_numeric($segments[1])) {
        $method === "GET" ? $controller->get((int) $segments[1]) : sendJsonResponse(405, ["message" => "Method Not Allowed"]);
    } else {
        match ($segments[1]) {
            "create" => $method === "POST" ? $controller->create() : sendJsonResponse(405, ["message" => "Method Not Allowed"]),
            "update" => $method === "PATCH" && $id ? $controller->update($id) : sendJsonResponse(405, ["message" => "Course ID not found"]),
            "delete" => $method === "DELETE" && $id ? $controller->delete($id) : sendJsonResponse(405, ["message" => "Course ID not found"]),
            default => sendJsonResponse(404, ["message" => "Action not found"])
        };
    }
}

function handleCourse($segments, $method, $connection)
{
    global $auth, $token;
    $jwt_values = $auth->validateJWT($token);
    $userId = getUserId();
    $courseId = isset($segments[1]) && is_numeric($segments[1]) ? (int) $segments[1] : null;
    $id = $segments[2] ?? null;

    $controller = new CourseController($connection);

    if ($segments[1] === "list") {
        $method === "GET" ? $controller->list() : sendJsonResponse(405, ["message" => "Method Not Allowed"]);
        return;
    }

    if (($segments[1] === "create" || $segments[1] === "update" || $segments[1] === "delete") && !$jwt_values["is_admin"]) {
        sendJsonResponse(403, ["message" => "Access denied. Admins only."]);
    }

    if ($courseId && !$id) {
        $method === "GET" ? $controller->get($courseId) : sendJsonResponse(405, ["message" => "Method Not Allowed"]);
    } else {
        match ($segments[2] ?? null) {
            "register" => $method === "POST" ? $controller->register($userId, $courseId) : sendJsonResponse(405, ["message" => "Method Not Allowed"]),
            "unregister" => $method === "DELETE" ? $controller->unregister($userId, $courseId) : sendJsonResponse(405, ["message" => "Method Not Allowed"]),
            default => match ($segments[1]) {
                    "create" => $method === "POST" ? $controller->create() : sendJsonResponse(405, ["message" => "Method Not Allowed"]),
                    "update" => $method === "PATCH" && $id ? $controller->update($id) : sendJsonResponse(405, ["message" => "Course ID not found"]),
                    "delete" => $method === "DELETE" && $id ? $controller->delete($id) : sendJsonResponse(405, ["message" => "Course ID not found"]),
                    default => sendJsonResponse(404, ["message" => "Action not found"])
                }
        };
    }
}

function handleUser($segments, $method, $connection)
{
    $controller = new UserController($connection);
    $userId = getUserId();
    $id = $segments[2] ?? null;

    if (is_numeric($segments[1])) {
        match ($method) {
            "PATCH" => $controller->update((int) $segments[1]),
            "DELETE" => $controller->delete((int) $segments[1]),
            default => sendJsonResponse(405, ["message" => "Method Not Allowed"])
        };
    } else {
        match ($segments[1]) {
            "list" => $method === "GET" ? $controller->list() : sendJsonResponse(405, ["message" => "Method Not Allowed"]),
            "me" => $method === "GET" ? $controller->get($userId) : sendJsonResponse(405, ["message" => "Method Not Allowed"]),
            "courses" => $method === "GET" ? $controller->getCoursesFromUser($userId) : sendJsonResponse(405, ["message" => "Method Not Allowed"]),
            "events" => $method === "GET" ? $controller->getEventFromUser($userId) : sendJsonResponse(405, ["message" => "Method Not Allowed"]),
            default => sendJsonResponse(404, ["message" => "Action not found"])
        };
    }
}

function handleScores($method, $connection)
{
    $controller = new ScoresController($connection);
    $method === "GET" ? $controller->list() : sendJsonResponse(405, ["message" => "Method Not Allowed"]);
}

function handleRegistration($method, $connection)
{
    $controller = new UserController($connection);
    $method === "GET" ? $controller->listUsersWithCourses() : sendJsonResponse(405, ["message" => "Method Not Allowed"]);
}

function getUserId()
{
    global $auth, $token;
    $jwt_values = $auth->validateJWT($token);
    return $jwt_values["sub"] ?? null;
}
