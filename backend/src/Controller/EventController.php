<?php

namespace Olooeez\AcademicEventManager\Controller;

use Olooeez\AcademicEventManager\Model\Event;

class EventController
{
    private $event;

    public function __construct(\PDO $connection)
    {
        $this->event = new Event($connection);
    }

    public function create()
    {
        header("Content-Type: application/json");

        $data = json_decode(file_get_contents("php://input"));

        if (!empty($data->name) && !empty($data->description) && !empty($data->start_time) && !empty($data->end_time)) {
            $this->event->name = $data->name;
            $this->event->description = $data->description;
            $this->event->start_time = $data->start_time;
            $this->event->end_time = $data->end_time;

            if ($this->event->create()) {
                http_response_code(201);
                echo json_encode(["message" => "Event was created"]);
            } else {
                http_response_code(503);
                echo json_encode(["message" => "Unable to create event"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Unable to create event. Data is incomplete"]);
        }
    }

    public function read()
    {
        header("Content-Type: application/json");

        $rows = $this->event->readAll();
        $events_arr = [];
        foreach ($rows as $row) {
            extract($row);
            $event_item = [
                "id" => $id,
                "name" => $name,
                "description" => $description,
                "start_time" => $start_time,
                "end_time" => $end_time
            ];
            array_push($events_arr, $event_item);
        }
        http_response_code(200);
        echo json_encode($events_arr);
    }

    public function update(int $id)
    {
        header("Content-Type: application/json");

        $data = json_decode(file_get_contents("php://input"), true);

        if (isset($data["name"], $data["description"], $data["start_time"], $data["end_time"])) {
            $this->event->name = $data["name"];
            $this->event->description = $data["description"];
            $this->event->start_time = $data["start_time"];
            $this->event->end_time = $data["end_time"];

            if ($this->event->update((int) $id)) {
                http_response_code(200);
                echo json_encode(["message" => "Event updated successfully"]);
            } else {
                http_response_code(500);
                echo json_encode(["message" => "Failed to update event"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Invalid input"]);
        }
    }

    public function delete(int $id)
    {
        header("Content-Type: application/json");

        if ($id) {
            if ($this->event->delete((int) $id)) {
                http_response_code(200);
                echo json_encode(["message" => "Event deleted successfully"]);
            } else {
                http_response_code(500);
                echo json_encode(["message" => "Failed to delete event"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Event ID is required"]);
        }
    }

    public function getEventFromStudent(int $studentId)
    {
        header("Content-Type: application/json");

        if (!$studentId) {
            http_response_code(400);
            echo json_encode(["message" => "Student ID is required"]);
            return;
        }

        try {
            $events = $this->event->getEventsByUser($studentId);

            http_response_code(200);
            echo json_encode($events);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "An error occurred while retrieving events", "error" => $e->getMessage()]);
        }
    }

    public function getEventById(int $id)
    {
        header("Content-Type: application/json");

        if (!$id) {
            http_response_code(400);
            echo json_encode(["message" => "Event ID is required"]);
            return;
        }

        try {
            $event = $this->event->getByIdWithCourses($id);

            if (!$event) {
                http_response_code(404);
                echo json_encode(["message" => "Event not found"]);
                return;
            }

            http_response_code(200);
            echo json_encode($event);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "An error occurred while retrieving the event", "error" => $e->getMessage()]);
        }
    }
}
