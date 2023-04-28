#!/usr/local/bin/php

<?php
require_once PROJECT_ROOT_PATH . "/Model/Database.php";
class RestaurantModel extends Database
{
    public function getRestaurants($limit)
    {
        return $this->select("SELECT * FROM restaurants ORDER BY ID ASC LIMIT ?", ["i", $limit]);
    }
}
?>