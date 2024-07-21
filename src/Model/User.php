<?php

namespace Olooeez\AcademicEventManager\Model;

use \Firebase\JWT\JWT;

use Olooeez\AcademicEventManager\Config\JwtConfig;

class User
{
    private $connection;
    private $table = "users";
    public $id;
    public $name;
    public $email;
    public $password;
    public $registration;

    public function __construct($database)
    {
        $this->connection = $database;
    }

    public function checkCredentials()
    {
        $query = "SELECT id, email, password FROM {$this->table} WHERE email = :email LIMIT 0,1";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(":email", $this->email);
        $stmt->execute();

        $row = $stmt->fetch(\PDO::FETCH_ASSOC);

        if ($row && password_verify($this->password, $row["password"])) {
            return $row;
        }

        return false;
    }

    public function generateJWT($user_id)
    {
        $issuedAt = time();
        $expirationTime = $issuedAt + 3600;
        $payload = [
            "iat" => $issuedAt,
            "exp" => $expirationTime,
            "userId" => $user_id
        ];

        $jwt = JWT::encode($payload, JwtConfig::getSecretKey(), JwtConfig::getAlgortithm());
        return $jwt;
    }

    public function create()
    {
        $query = "INSERT INTO {$this->table} (name, email, password, registration) VALUES (:name, :email, :password, :registration)";
        $stmt = $this->connection->prepare($query);

        // Limpa e vincula os dados
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->password = htmlspecialchars(strip_tags($this->password));
        $this->registration = htmlspecialchars(strip_tags($this->registration));

        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':password', $this->password);
        $stmt->bindParam(':registration', $this->registration);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
}
