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

    public function getAllScores()
    {
        $query = "SELECT u.id, u.name, s.points
                  FROM {$this->table} s 
                  JOIN users u 
                  ON s.student_id = u.id 
                  ORDER BY s.points DESC";

        $stmt = $this->connection->prepare($query);
        $stmt->execute();

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}
