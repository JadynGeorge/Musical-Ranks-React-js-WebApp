<?php 
class SongModel {
    protected $db;

    public function __construct(Database $db) {
        $this->db = $db;
    }

    
    // //function for handling display of songs query
    public function displaySong(){
        $mysqli = $this->db->getConnection();
        
        $sql = "SELECT * from ratings";
        $stmt = $mysqli->prepare($sql);
        
        if(!$stmt){
            die("Error: " . $mysqli->error);
        }

        if ($stmt->execute()){
            $result = $stmt->get_result();
            $data = [];

            while ($row = $result->fetch_assoc()){
            $data[] = $row;
            }

            $stmt->close();
            return $data;

        }else{
            die("Error: " . $stmt->error);
        }
    }

    
    public function createSong($songData) {
        $mysqli = $this->db->getConnection();
        $username = $songData['username'];
        $artist = $songData['artist'];
        $song_name = $songData['song'];
        $rating = $songData['rating'];

        $stmt = $mysqli->prepare("INSERT INTO ratings (username, artist, song, rating) VALUES (?, ?, ?, ?)");
        if ($stmt === false) {
            die("Unable to prepare statement: " . $mysqli->error);
        }

        $stmt->bind_param("sssi", $username, $artist, $song_name, $rating);

        if ($stmt->execute()) {
            return true;
        } else {
             return false;
        }
    }

    public function viewSong($songID) {
        $mysqli = $this->db->getConnection();
        $id = $songID['id'];
        $query = "SELECT * from ratings WHERE id = ?";
        $stmt = $mysqli->prepare($query);
        if ($stmt === false) {
            die("Unable to prepare statement: " . $mysqli->error);
        }
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            return true; // the query worked and we have to return song info stuff or something so we have to change the true here
        } else {
            return null; // song doesn't exist somehow?
        }


    }


    public function updateSongRating($songData) {
        $mysqli = $this->db->getConnection();
        
        $songID = $songData["id"];
        $newRating =$songData["rating"];

        $query = "UPDATE ratings SET rating = ? WHERE id = ?";
        
        $stmt = $mysqli->prepare($query);
        if ($stmt === false) {
            return false;
            // die("Unable to prepare statement: " . $mysqli->error);
        }
        
        $stmt->bind_param("ii", $newRating, $songID);
        if ($stmt->execute()) {
            // return true; // Update successful
            return true;
        } else {
            // return false; // Update failed
            return false;
        }

        }


    

    public function deleteSong($songID) {
        $mysqli = $this->db->getConnection();
        $id = $songID["id"];

        $query = "DELETE FROM ratings WHERE id = ? ";
        
        $stmt = $mysqli->prepare($query);
        if ($stmt === false) {
            die("Unable to prepare statement: " . $mysqli->error);
        }
        
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            return true; 
        } else {
            return false;
        }
    }

    public function isSongAlreadyExists($artist, $songName) {
        // Perform a database query to check if the song already exists in the database.
        $mysqli = $this->db->getConnection();
        $query = "SELECT * FROM ratings WHERE artist = ? AND song = ?";
        $stmt = $mysqli->prepare($query);
        $stmt->bind_param("ss", $artist, $songName);
        $stmt->execute();
        $stmt->store_result();
    
        return $stmt->num_rows > 0;
    }
}
?>