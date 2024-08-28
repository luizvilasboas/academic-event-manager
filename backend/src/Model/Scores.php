<?php

namespace Olooeez\AcademicEventManager\Model;

class Scores
{
    private $connection;
    private $table = "scores";

    public function __construct(\PDO $database)
    {
        $this->connection = $database;
    }

    public function readAll()
    {
        $sql = "SELECT * FROM ranking_participation";
        $stmt = $this->connection->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}
