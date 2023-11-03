<?php
require_once 'inc/config.php';
require_once 'inc/bootstrap.php';

class SongController extends BaseController{
    protected $songModel;

    public function __construct(SongModel $songModel) {
        $this->songModel = $songModel;
    }

    
    public function showallSong(){
        // $requestMethod = $_SERVER["REQUEST_METHOD"];
        // if(stroupper($requestMethod) == "GET"){
            $data['get_songlist'] = $this->songModel->displaySong();
            echo json_encode($data['get_songlist']);
        
    }
    
    
    public function createSong() {
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        if (strtoupper($requestMethod) == "POST") {
            $songData = json_decode (file_get_contents('php://input'), true);

            
            if(isset($songData['artist']) && isset($songData['song']) && isset($songData['rating']) && $songData['artist'] !== "" && $songData['song'] !== "" && $songData['rating'] !== 0){
                if($this->songModel->isSongAlreadyExists($songData['artist'], $songData['song'])){
                    echo json_encode(["warning" => true, "message" => "This song is already ranked!"]);
                }
                else{
                    
                    if($this->songModel->createSong($songData)){
                        echo json_encode(["success" => true, "message" => "You created a rating successfully"]);                        
                        // song is made
                    }else{
                        echo json_encode(["error" => true, "message" => "This Song could not be made :("]);

                        // song couldnt be made
                    }
                }
            
            }else{
                echo json_encode(["warning" => true, "message" => "Fill out the fields and rating!"]);
                    // something is empty/not properly filled out 
                }
        }else{
            echo json_encode(["error" => true, "message" => "Wrong request method used."]);
            // wrong request method
        }
    }
 
    

    public function viewSong() {
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        if (strtoupper($requestMethod) == "POST") {
            $songID = json_decode (file_get_contents('php://input'), true);

            if ($this->songModel->viewSong($songID)) {
                //return the successfull response
            } else {
                echo json_encode(["error" => "Cannot change view song at this time"]);
            }
        } else{
            echo json_encode(["error" => "Incorrect request for ratings"]);
        }
    }

    public function updateSong() {
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        if (strtoupper($requestMethod) == "POST") {
            $songData = json_decode (file_get_contents('php://input'), true);
            if(isset($songData['rating']) && $songData['rating'] !== 0){
                if($this->songModel->updateSongRating($songData)){
                    echo json_encode (["success" => true, "message" => "Song updated successfully"]);

                }else{
                    echo json_encode (["error" => true, "message" => "Song unable to update. "]);
                }
            }else{
                echo json_encode(["warning" => true, "message" => "Rating is missing. Please enter a number"]);

            }
            
        }else{
            echo json_encode(["error" => true, "message" => "Incorrect request method"]);
        }
    }
    


    public function deleteSong() {
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        if (strtoupper($requestMethod) == "POST") {
            $songID = json_decode (file_get_contents('php://input'), true);
            if (isset($songID['id'])){
                if($this->songModel->deleteSong($songID)){
                    echo json_encode(["success" => true, "message" => "You deleted the song successfully"]);
                    // the request was processed properly and we return true from the model
                }else{
                    echo json_encode(["message" => "Something is wrong with the request"]);

                    //something failed with the request
                }
            } else {
                echo json_encode(["message" => "The ID is empty"]);
                //error if the id is empty
                }
        }else{
            echo json_encode(["message" => "The request method is empty"]);
            // request method is wrong
        }
    }
}
?>