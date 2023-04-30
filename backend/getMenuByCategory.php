#!/usr/local/bin/php
<?php
    $conn = new mysqli("mysql.cise.ufl.edu", "michelletaing", "6aXgNsQxTwz5CSt", "gator_eats_test");

    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    // Retrieve items from the database based on the category and restaurant ID
    $category = $_GET['category'];
    $restaurantID = $_GET['restaurantID'];
    $sql = "SELECT * FROM items WHERE category='$category' AND restaurantID='$restaurantID'";
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