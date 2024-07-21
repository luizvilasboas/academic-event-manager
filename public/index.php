<?php

require_once __DIR__ . "/../vendor/autoload.php";

use Olooeez\AcademicEventManager\Controller\AuthController;
use Olooeez\AcademicEventManager\Controller\EventController;

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

switch ($segments[0]) {
    case "auth":
        $controller = new AuthController();
        switch ($segments[1]) {
            case "login":
                $method === "POST" ? $controller->login() : sendJsonResponse(405, ["message" => "Method Not Allowed"]);
                break;
            case "register":
                $method === 'POST' ? $controller->register() : sendJsonResponse(405, ["message" => "Method Not Allowed"]);
                break;
            default:
                sendJsonResponse(404, ["message" => "Action not found."]);
        }
        break;
    case "events":
        $controller = new EventController();
        if (isset($segments[1])) {
            # $method === "GET" ? $controller->getCourses($segments[1]) : sendJsonResponse(405, ["message" => "Method Not Allowed"]);
        } else {
            $method === "GET" ? $controller->read() : ($method === "POST" ? $controller->create() : sendJsonResponse(405, ["message" => "Method Not Allowed"]));
        }
        break;
    default:
        sendJsonResponse(404, ["message" => "Controller not found."]);
}
