<?php

namespace App\Eshop\Pdo;

use Exception;
use PDO;
use PDOException;

class Database
{
    private
        $conn,
        $affected = 0;

    public function connect()
    {
        try {
            $this->conn = new PDO(DB_CONFIG, DB_USER, DB_PWD);
        } catch (PDOException $err) {
            throw new Exception("Error: {$err->getMessage()}");
        }
    }

    public function dbQuery($sql, $params = [])
    {
        try {
            $this->affected = 0;

            if (!isset($this->conn) || empty($this->conn)) {
                $this->connect();
            }

            $query = $this->conn->prepare($sql);
            $query->execute($params);
            $result = $query->fetchAll(PDO::FETCH_OBJ);
            $this->affected = $query->rowCount();
        } catch (PDOException $err) {
            throw new Exception("Error: {$err->getMessage()}");
        }

        return $result;
    }

    public function get($param)
    {
        return $this->$param;
    }

    public function close()
    {
        $this->conn = null;
    }
}
