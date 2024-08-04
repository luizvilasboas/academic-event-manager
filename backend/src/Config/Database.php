<?php

namespace Olooeez\AcademicEventManager\Config;

use PDO;

class Database
{
    private $host = "127.0.0.1";
    private $database = "academic_event";
    private $username = "root";
    private $password = "root";

    public function getConnection()
    {
        $connection = null;

        try {
            $connection = new PDO("mysql:host={$this->host};dbname={$this->database}", $this->username, $this->password);
            $connection->exec("set names utf8");
        } catch (\PDOException $exception) {
            echo "connection error: " . $exception->getMessage();
        }

        return $connection;
    }
}
