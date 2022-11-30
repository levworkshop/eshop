<?php

// should be in a separate file
define('DB_CONFIG', 'mysql:host=localhost;dbname=eshop;charset=utf8');
define('DB_USER', 'root');
define('DB_PASSWORD', 'password');

try {

    $db = new PDO(DB_CONFIG, DB_USER, DB_PASSWORD);
    // $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
    $sql = "SELECT firstName, lastName FROM employees";
    $statusOrig = $_GET['status'];
    $status = [];

    if (isset($statusOrig) && in_array($statusOrig, [0, 1])) {
        $sql .= " WHERE status = ?";
        $status = [$_GET['status']];
    }

    $query = $db->prepare($sql);
    $query->execute($status);
    $result = $query->fetchAll(PDO::FETCH_OBJ);
} catch (PDOException $err) {
    echo "Error: {$err->getMessage()}";
}

// echo "<pre>";
// var_dump($_GET['status']);
// echo "</pre>";

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ex. 1</title>
</head>

<body>

    <h2>Employees List</h2>

    <div>
        <a href="ex1.php">All</a>
        <a href="ex1.php?status=1">Staus Active</a>
        <a href="ex1.php?status=0">Staus Not Active</a>
    </div>

    <!-- display list of Employees here -->
    <ul class="list">
        <?php
        foreach ($result as $row) {
            echo "<li>{$row->firstName} {$row->lastName}</li>";
        }
        ?>
    </ul>

</body>

</html>