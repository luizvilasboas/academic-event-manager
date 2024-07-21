<?php

namespace Olooeez\AcademicEventManager\Helper;

use Olooeez\AcademicEventManager\Config\JwtConfig;
use \Firebase\JWT\JWT;

class Auth {
    public static function authenticate() {
        $headers = getallheaders();

        if (isset($headers["Authorization"])) {
            $token = str_replace("Bearer ", "", $headers["Authorization"]);
            try {
                $decoded = JWT::decode($token, JwtConfig::getSecretKey(), [JwtConfig::getAlgortithm()]);
                return $decoded->userId;
            } catch (\Exception $e) {
                http_response_code(401);
                echo json_encode(["message" => "Access denied."]);
                exit();
            }
        } else {
            http_response_code(401);
            echo json_encode(["message" => "Access denied."]);
            exit();
        }
    }
}
