#!/usr/local/bin/php
<?php
    $conn = new mysqli("mysql.cise.ufl.edu", "michelletaing", "6aXgNsQxTwz5CSt", "gator_eats_test");

    // Check for errors
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $id = isset($_GET['id']) ? $_GET['id'] : null;

    if ($id === null) {
        header('Content-Type: application/json');
        echo json_encode(['error' => 'ID parameter is required']);
    } else {
        $stmt = $conn->prepare("SELECT * FROM restaurants WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $restaurant = $result->fetch_assoc();

        if ($restaurant === null) {
            header('Content-Type: application/json');
            echo json_encode(['error' => 'Restaurant not found']);
        } else {
            header('Content-Type: application/json');
            echo json_encode($restaurant);
        }

        $stmt->close();
    }

    $conn->close();
?>
