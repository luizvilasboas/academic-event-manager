<?php

namespace Olooeez\AcademicEventManager\Helper;

use Olooeez\AcademicEventManager\Model\User;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Auth
{
    private string $secretKey;
    private string $algorithm;

    public function __construct(string $secretKey = "temp", string $algorithm = "HS256")
    {
        $this->secretKey = $secretKey;
        $this->algorithm = $algorithm;
    }

    public function generateJWT(int $id, string $is_admin): string
    {
        $payload = [
            "iss" => "yourdomain.com",
            "aud" => "yourdomain.com",
            "iat" => time(),
            "exp" => time() + (60 ** 7),
            "sub" => $id,
            "is_admin" => $is_admin
        ];

        return JWT::encode($payload, $this->secretKey, $this->algorithm);
    }

    public function validateJWT(string $jwt): array | bool
    {
        try {
            $decoded = JWT::decode($jwt, new Key($this->secretKey, $this->algorithm));
            return (array) $decoded;
        } catch (\Exception $e) {
            return false;
        }
    }
}
?>
