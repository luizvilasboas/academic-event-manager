<?php

namespace Olooeez\AcademicEventManager\Controller;

use Olooeez\AcademicEventManager\Model\Scores;
use Olooeez\AcademicEventManager\Model\Registration;

class ScoresController
{
    private Scores $scores;

    public function __construct(\PDO $connection)
    {
        $this->scores = new Scores($connection);
    }

    public function getScores()
    {
        header("Content-Type: application/json");

        try {
            $scores = $this->scores->getAllScores();

            if (empty($scores)) {
                http_response_code(404);
                echo json_encode(["message" => "No scores found"]);
                return;
            }

            http_response_code(200);
            echo json_encode($scores);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "An error occurred while retrieving scores", "error" => $e->getMessage()]);
        }
    }
}
