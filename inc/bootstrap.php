<?php
define("PROJECT_ROOT_PATH", __DIR__ . "/../");
// include main configuration file 
require_once PROJECT_ROOT_PATH . "/inc/config.php";
// include the base controller file 
require_once PROJECT_ROOT_PATH . "/Controller/BaseController.php";

require_once PROJECT_ROOT_PATH . "/Controller/SongController.php";

require_once PROJECT_ROOT_PATH . "/Controller/UserController.php";
// include the use model file 
require_once PROJECT_ROOT_PATH . "/Model/UserModel.php";

require_once PROJECT_ROOT_PATH . "/Model/SongModel.php";

require_once PROJECT_ROOT_PATH . "/Model/Database.php";


?>