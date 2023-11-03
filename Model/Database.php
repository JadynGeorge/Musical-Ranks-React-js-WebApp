<?php
class Database
{
    protected $connection;
    public function __construct()
    {
        try {
                $this->connection = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE_NAME);
    	
            if ($this->connection->connect_error) {
                throw new Exception("Could not connect to database.");   
            }
        } catch (Exception $e) {
            throw new Exception($e->getMessage());   
        }			
    }
    public function getConnection() {
        return $this->connection;
    }
}
?>

