<?php
// this index.php file is used to create controller instances
// echo 'I AM HERE';
require_once 'inc/bootstrap.php';
session_start();
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

//CORS headers
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Access-Control-Allow-Credentials: true');


$uri = explode('/', $uri);

if ($uri[3] == 'user'){

    // Create a new Database instance
    $db = new Database();

    // Create a new UserModel instance
    $userModel = new UserModel($db);

    $objUserController = new UserController($db, $userModel);
    
    $strMethodName = $uri[4] . 'Action';
    
    $objUserController->{$strMethodName}();
}

if ($uri[3] == 'song'){
    // Create a new UserModel instance
    $db = new Database();

    $songModel = new SongModel($db);

    $objUserController = new SongController($songModel);
    
    $strMethodName = $uri[4] . 'Song';
    
    $objUserController->{$strMethodName}();
}
?>
