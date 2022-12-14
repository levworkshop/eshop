<?php

require_once './config.php';
require_once './database.php';
require_once './headers.php';

use App\Eshop\Pdo\Database;

setHeaders();

try {
    $dbConn = new Database();
    $result = $dbConn->dbQuery("SELECT * FROM employees");

    echo json_encode($result);
} catch (Exception $err) {
    echo "Error: " . $err->getMessage();
}
