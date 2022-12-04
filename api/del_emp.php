<?php

require_once './config.php';
require_once './database.php';
require_once './headers.php';

use App\Eshop\Pdo\Database;

setHeaders();

try {
    if (!isset($_REQUEST['id'])) {
        throw new Exception("Error: bad input");
        return;
    }

    $id = $_REQUEST['id'];

    $dbConn = new Database();
    $result = $dbConn->dbQuery(
        "DELETE FROM employees WHERE employeeID=?",
        [$id]
    );
    if ($dbConn->affected > 0) {
        echo "{ok: true}";
    } else {
        echo "{ok: false}";
    }
} catch (Exception $err) {
    echo "{ok: false, error: {$err->getMessage()} }";
}
