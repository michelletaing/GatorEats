#!/usr/local/bin/php
<?php
    require_once('config/config.php');
    $conn = new mysqli($host, $username, $password, $database);

    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    // Retrieve items from the database based on the category (breakfast, lunch, or dinner) and restaurant ID
    $category = $_GET['category'];
    $restaurantID = $_GET['restaurantID'];
    $time = $_GET['time'];
    $sql = "SELECT * FROM items WHERE restaurantID = $restaurantID AND category = '$category' AND FIND_IN_SET('$time', time)";
    $result = mysqli_query($conn, $sql);

    // Convert the result to an array
    $items = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $items[] = $row;
    }

    // Return the items as JSON data
    header('Content-Type: application/json');
    echo json_encode($items);

    // Close the database connection
    mysqli_close($conn);

?>