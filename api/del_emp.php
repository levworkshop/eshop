<?php

require_once './config.php';
require_once './database.php';
require_once './headers.php';

use App\Eshop\Pdo\Database;

setHeaders();

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
        throw new Exception("bad request");
        return;
    }

    $json = file_get_contents(
        "php://input",
        false,
        stream_context_get_default(),
        0,
        $_SERVER["CONTENT_LENGTH"]
    );

    $data = json_decode($json, true);

    $id = $data['id'];

    $dbConn = new Database();
    $result = $dbConn->dbQuery(
        "DELETE FROM employees WHERE employeeID=?",
        [$id]
    );

    if ($dbConn->get('affected') > 0) {
        echo "{\"ok\": \"true\"}";
    } else {
        echo "{\"ok\": \"false\"}";
    }
} catch (Exception $err) {
    echo "{ok: false, error: {$err->getMessage()} }";
}
