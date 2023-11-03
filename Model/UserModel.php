<?php
require_once 'inc/bootstrap.php';
require_once 'inc/config.php';
require_once 'Database.php';

header("Content-Type: application/json");


class UserModel extends Database{ 
    protected $db;

    public function __construct(Database $db) {
        $this->db = $db;
    }


    public function createUser($data) { 
        
        if (isset($data['username']) && isset($data['password']) && isset($data['confirm_password']) && $data['username'] !== null && $data['password'] !== null && $data['confirm_password']) 
        {
            // connection is made
            $mysqli = $this->db->getConnection();

            // we take the given info provided by userData
            $username = $data["username"];
            $password = $data["password"];
            $confirm_password = $data["confirm_password"];

            // we hash the password and prepare a sqli query and bind the given parameters
            if(($password != $confirm_password)){
            echo 'Passwords do not match';
            return false;

            }else{
            
                $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
                $stmt = $mysqli->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
                if ($stmt === false) {
                    die("Unable to prepare statement: " . $mysqli->error);
                }

                $stmt->bind_param("ss", $username, $hashedPassword);

                
                
                if ($stmt->execute()) {
                    return true;
                } else {
                    return false;
                }
            }
        }else{
            echo "Invalid user sign up data";
            return false;
        }

}

    public function loginUser($data) {
            // connection is made
            $mysqli = $this->db->getConnection();

            $dbUsername = '';
            $dbPassword = '';
            // we take the given info provided by userData
            $username = $data['username'];
            $password = $data['password'];
            $stmt = $mysqli->prepare("SELECT username, password FROM users WHERE username = ?");

            if ($stmt === false) {
                die("Unable to prepare statement: " . $mysqli->error);
            }
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $stmt->bind_result($dbUsername, $dbPassword);

            if ($stmt->fetch() && password_verify($password, $dbPassword)){                
                    
    
                    $response = [
                        "success" => true,
                        "message" => "You are logged in"

                    ];
                    
                
                } else{
                    //Incorrect password
                    $response = [
                        "success" => false,
                        "message" => "Invalid credentials"
                    ];
                } 

                return json_encode($response);
    }


    public function isUsernameTaken($username) {
        // Perform a database query to check if the username exists in the database.
        $mysqli = $this->db->getConnection();
        $query = "SELECT * FROM users WHERE username = ?";
        $stmt = $mysqli->prepare($query);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $stmt->store_result();
    
        return $stmt->num_rows > 0;
    }
}

?>
