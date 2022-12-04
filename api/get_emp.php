<?php

require_once './config.php';
require_once './database.php';
require_once './headers.php';

use App\Eshop\Pdo\Database;

setHeaders();

try {
    if (!isset($_GET['id'])) {
        throw new Exception("Error: bad input");
        return;
    }

    $id = filter_input(INPUT_GET, 'id', FILTER_UNSAFE_RAW);

    $dbConn = new Database();
    $result = $dbConn->dbQuery(
        "SELECT * FROM employees WHERE employeeID=?",
        [$id]
    );

    echo json_encode($result);
} catch (Exception $err) {
    echo "Error: " . $err->getMessage();
}
