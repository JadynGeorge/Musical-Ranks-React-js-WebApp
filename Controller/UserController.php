<?php
require_once 'inc/config.php';
require_once 'inc/bootstrap.php';


class UserController extends BaseController
{ 
    protected $userModel;
    protected $db;

    public function __construct(Database $db, UserModel $userModel) {
        $this->db = $db;
        $this->userModel = $userModel;
    }

    public function createAction() 
    {
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if (strtoupper($requestMethod) == "POST") {
            $data = json_decode (file_get_contents('php://input'), true);
    
            if (isset($data['username']) && isset($data['password']) && isset($data['confirm_password']) && $data['username'] !== null && $data['password'] !== null && $data['confirm_password'] !== null) {
            
                if($this->userModel->isUsernameTaken($data['username'])){
                    //http_response_code(409);
                    echo json_encode(["error" => "User creation failed. This username already exists"]);

                }else{
                    if($this->userModel->createUser($data)){
                   // http_response_code(201);
                    echo json_encode(["success" => true, "message" => "User created successfully"]);
                    }else{
                    //http_response_code(401);
                    echo json_encode(["error" => "User creation failed. Make sure passwords match!"]);
                }
            }}else{
                    //http_response_code(204);
                    echo json_encode(["error" => "One of more fields are empty"]);;

            }
            

        }
    }
    public function loginAction() {
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        if (strtoupper($requestMethod) == "POST") {
            $data = json_decode (file_get_contents('php://input'), true);
            
            if (isset($data['username']) && isset($data['password']) && $data['username'] !== null && $data['password'] !== null){
                
                if($this->userModel->isUsernameTaken($data['username'])){
                    
                    
                    $response = $this->userModel->loginUser($data);

                    $responseData = json_decode($response, true);
                    
                    if (is_array($responseData) && isset($responseData['success'])) {
                        if($responseData['success']){
                            echo json_encode(["success" => true, "message" => "User created successfully"]);
                            //echo 'User Logged In';
                        }else{
                            if (isset($responseData['message'])){
                                echo json_encode(["error" => $responseData["message"]]);

                            }
                            else{
                                echo json_encode(["error" => $responseData["message"]]);
                            }
                        }                        
                    }else{
                            //http_response_code(502);
                            echo json_encode(["error" => "Invalid response from UserModel"]);

                        }
                    // the request was processed properly and we return true from the model
                    }else{
                        echo json_encode(["error" => "User creation failed. This username does not exist"]);
                        //something failed with the request
                    }
                }else {
                    echo json_encode(["error" => 'Data is not valid, might be empty']);

                }
            }else{
                echo json_encode(["error" => "Something went wrong in the controller"]);

            }
        }
    
    
    

}

?>
