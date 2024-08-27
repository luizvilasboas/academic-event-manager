<?php

namespace Olooeez\AcademicEventManager\Controller;

use Olooeez\AcademicEventManager\Model\Course;
use Olooeez\AcademicEventManager\Model\Registration;

class CourseController
{
    private Course $course;
    private Registration $registration;

    public function __construct(\PDO $connection)
    {
        $this->course = new Course($connection);
        $this->registration = new Registration($connection);
    }

    public function create()
    {
        header("Content-Type: application/json");

        $data = json_decode(file_get_contents("php://input"), true);

        if (isset($data["event_id"], $data["title"], $data["description"], $data["start_time"], $data["end_time"])) {
            $this->course->event_id = $data["event_id"];
            $this->course->title = $data["title"];
            $this->course->description = $data["description"];
            $this->course->start_time = $data["start_time"];
            $this->course->end_time = $data["end_time"];

            if ($this->course->create()) {
                http_response_code(201);
                echo json_encode(["message" => "Course created successfully"]);
            } else {
                http_response_code(500);
                echo json_encode(["message" => "Failed to create course"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Invalid input"]);
        }
    }

    public function read()
    {
        header("Content-Type: application/json");

        $courses = $this->course->readAll();

        http_response_code(200);
        echo json_encode($courses);
    }

    public function update(int $id)
    {
        header("Content-Type: application/json");

        $data = json_decode(file_get_contents("php://input"), true);

        if (isset($data["event_id"], $data["title"], $data["description"], $data["start_time"], $data["end_time"])) {
            $this->course->event_id = $data["event_id"];
            $this->course->title = $data["title"];
            $this->course->description = $data["description"];
            $this->course->start_time = $data["start_time"];
            $this->course->end_time = $data["end_time"];

            if ($this->course->update((int) $id)) {
                http_response_code(200);
                echo json_encode(["message" => "Course updated successfully"]);
            } else {
                http_response_code(500);
                echo json_encode(["message" => "Failed to update course"]);
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
            if ($this->course->delete((int) $id)) {
                http_response_code(200);
                echo json_encode(["message" => "Course deleted successfully"]);
            } else {
                http_response_code(500);
                echo json_encode(["message" => "Failed to delete course"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Course ID is required"]);
        }
    }

    public function register(int $studentId, int $courseId)
    {
        header("Content-Type: application/json");

        $data = json_decode(file_get_contents("php://input"), true);

        $this->registration->student_id = $studentId;
        $this->registration->course_id = $courseId;

        if ($this->registration->register()) {
            http_response_code(201);
            echo json_encode(["message" => "registerment successful"]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Failed to register"]);
        }

    }

    public function unregister(int $studentId, int $courseId)
    {
        header("Content-Type: application/json");

        $this->registration->student_id = $studentId;
        $this->registration->course_id = $courseId;

        if ($this->registration->unregister()) {
            http_response_code(200);
            echo json_encode(["message" => "Unregisterment successful"]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Failed to unregister"]);
        }
    }

    public function getCourseById(int $id)
    {
        header("Content-Type: application/json");
    
        if (!$id) {
            http_response_code(400);
            echo json_encode(["message" => "Course ID is required"]);
            return;
        }
    
        try {
            $course = $this->course->readOne($id);
    
            if (!$course) {
                http_response_code(404);
                echo json_encode(["message" => "Course not found"]);
                return;
            }
    
            http_response_code(200);
            echo json_encode($course);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "An error occurred while retrieving the course", "error" => $e->getMessage()]);
        }
    }
}
