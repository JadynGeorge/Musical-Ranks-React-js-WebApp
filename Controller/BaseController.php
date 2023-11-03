<?php

class BaseController {
    protected $db; // Database connection
    protected $loggedInUser; // Current user's data

    public function __construct() {
        $this->initializeDatabase();
    }

    protected function initializeDatabase() {
        $this->db = new Database();
    }
 }
?>