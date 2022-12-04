<?php

require_once './config.php';
require_once './database.php';

use App\Eshop\Pdo\Database;

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, PATCH");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

try {
    $dbConn = new Database();
    $result = $dbConn->dbQuery("SELECT * FROM employees");

    echo json_encode($result);
} catch (Exception $err) {
    echo "Error: " . $err->getMessage();
}
