#!/usr/local/bin/php
<?php
    $conn = new mysqli("mysql.cise.ufl.edu", "michelletaing", "6aXgNsQxTwz5CSt", "gator_eats_test");

    // Check for errors
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $category = $_GET['category'];
    $restaurantID = $_GET['restaurantID'];
    $stmt = $conn->prepare("SELECT DISTINCT mealType FROM items WHERE restaurantID = $restaurantID AND category = '$category'");
    $stmt->execute();
    $result = $stmt->get_result();
    $mealTypes = array();

    while ($row = $result->fetch_assoc()) {
        $mealTypes[] = $row['mealType'];
    }

    header('Content-Type: application/json');
    echo json_encode($mealTypes);

    $stmt->close();
    $conn->close();
?>