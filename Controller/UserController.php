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
            
                if($this->userModel->createUser($data)){
                    http_response_code(201);
                    echo json_encode(["success" => true, "message" => "User created successfully"]);
                }
                else{
                    http_response_code(500);
                    echo json_encode(["error" => "User creation failed. Make sure passwords match!"]);
                }
            }else{
                http_response_code(500);
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
                            echo 'User Logged In';
                        }else{
                            if (isset($responseData['message'])){
                                http_response_code(401);
                                echo $responseData['message'];
                            }
                            else{
                                http_response_code(401);
                                echo "Login failed";
                            }
                        }                        
                    }else{
                            http_response_code(502);
                            echo "Invalid response from UserModel";
                        }
                    // the request was processed properly and we return true from the model
                    }else{
                        http_response_code(401);
                        echo 'Username does not exist';
                        //something failed with the request
                    }
                }else {
                    http_response_code(204);
                    echo 'Data is not valid might be empty';
                }
            }else{
                echo 'Something went wrong in the UserController';
            }
        }
    
    
    

}

?>
