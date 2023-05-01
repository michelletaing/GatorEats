#!/usr/local/bin/php
<?php 
     require_once('config/config.php');
     $conn = new mysqli($host, $username, $password, $database);

     // Check for errors
     if ($conn->connect_error) {
         die("Connection failed: " . $conn->connect_error);
     }
 
     $stmt = $conn->prepare("SELECT * FROM restaurants");
     $stmt->execute();
     $result = $stmt->get_result();
     $restaurants = array();
 
     while ($row = $result->fetch_assoc()) {
         $restaurants[] = $row;
     }
 
     header('Content-Type: application/json');
     echo json_encode($restaurants);
 
     $stmt->close();
     $conn->close();
?>