<?php

namespace Olooeez\AcademicEventManager\Controller;

use Olooeez\AcademicEventManager\Models\Event;
use Olooeez\AcademicEventManager\Config\Database;

use PDO;

class EventController
{
    private $database;
    private $event;

    public function __construct()
    {
        $database = new Database();
        $this->database = $database->getConnection();
        echo is_null($this->database);
        $this->event = new Event($this->database);
    }

    public function create()
    {
        header('Content-Type: application/json');

        $data = json_decode(file_get_contents("php://input"));

        if (!empty($data->name) && !empty($data->description) && !empty($data->start_date) && !empty($data->end_date)) {
            $this->event->name = $data->name;
            $this->event->description = $data->description;
            $this->event->start_date = $data->start_date;
            $this->event->end_date = $data->end_date;

            if ($this->event->create()) {
                http_response_code(201);
                echo json_encode(["message" => "Event was created."]);
            } else {
                http_response_code(503);
                echo json_encode(["message" => "Unable to create event."]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Unable to create event. Data is incomplete."]);
        }
    }

    public function read()
    {
        header('Content-Type: application/json');
        $stmt = $this->event->read();
        $num = $stmt->rowCount();

        if ($num > 0) {
            $events_arr = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $event_item = [
                    "id" => $id,
                    "name" => $name,
                    "description" => $description,
                    "start_date" => $start_date,
                    "end_date" => $end_date
                ];
                array_push($events_arr, $event_item);
            }
            http_response_code(200);
            echo json_encode($events_arr);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "No events found."]);
        }
    }
}
