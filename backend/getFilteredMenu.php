#!/usr/local/bin/php
<?php
    require_once('config/config.php');
    $conn = new mysqli($host, $username, $password, $database);

    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    // Retrieve items from the database based on the category, diet, and restaurant ID
    $category = $_GET['category'];
    $diet = $_GET['diet'];
    $restaurantID = $_GET['restaurantID'];
    $sql = "SELECT i.name, i.details, i.mealType, d.nutrition, d.ingredients, d.diet, i.itemID
            FROM items i
            JOIN details d ON i.itemID = d.itemID
            WHERE i.restaurantID = $restaurantID AND i.category = '$category' AND d.diet LIKE '%$diet%'";
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
