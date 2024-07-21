<?php

namespace Olooeez\AcademicEventManager\Model;

class Event
{
    private $connection;
    private $table = "events";
    public $id;
    public $name;
    public $description;
    public $start_date;
    public $end_date;

    public function __construct($db)
    {
        $this->connection = $db;
    }

    public function create()
    {
        $query = "INSERT INTO {$this->table} SET name=:name, description=:description, start_date=:start_date, end_date=:end_date";
        $stmt = $this->connection->prepare($query);

        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->start_date = htmlspecialchars(strip_tags($this->start_date));
        $this->end_date = htmlspecialchars(strip_tags($this->end_date));

        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":start_date", $this->start_date);
        $stmt->bindParam(":end_date", $this->end_date);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function read()
    {
        $query = "SELECT * FROM {$this->table}";
        $stmt = $this->connection->prepare($query);
        $stmt->execute();

        return $stmt;
    }
}
