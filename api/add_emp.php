<?php

require_once './config.php';
require_once './database.php';
require_once './headers.php';

use App\Eshop\Pdo\Database;

setHeaders();

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
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

    $firstName = $data['firstName'];
    $lastName = $data['lastName'];
    $address = $data['address'];
    $city = $data['city'];
    $status = $data['status'];
    $eid = rand();

    if (!isset($firstName) || !isset($lastName) || !isset($address) || !isset($city) || !isset($status)) {
        echo "Error: bad input";
        return;
    }

    if (empty($firstName) || empty($lastName) || empty($address)) {
        echo "Error: all fields are required";
        return;
    }

    $dbConn = new Database();
    $result = $dbConn->dbQuery(
        "INSERT INTO employees(employeeID, firstName, lastName, streetAddress, city, `status`) VALUES(?,?,?,?,?,?)",
        [$eid, $firstName, $lastName, $address, $city, $status]
    );

    if ($dbConn->get('affected') > 0) {
        echo "{\"ok\": \"true\"}";
    } else {
        echo "{\"ok\": \"false\"}";
    }
} catch (Exception $err) {
    echo "{ok: false, error: {$err->getMessage()} }";
}
