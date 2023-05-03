#!/usr/local/bin/php
<?php
    require_once('config/config.php');
    $conn = new mysqli($host, $username, $password, $database);

    // Check for errors
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $itemID = $_GET['itemID'];

    $stmt = $conn->prepare("SELECT * FROM details WHERE itemID = ?");
    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("i", $itemID);
    $stmt->execute();
    if ($stmt->error) {
        die("Execute failed: " . $stmt->error);
    }

    $result = $stmt->get_result();
    if (!$result) {
        die("Get result failed: " . $stmt->error);
    }

    $details = $result->fetch_assoc();
    if ($details === null) {
        header('Content-Type: application/json');
        http_response_code(404);
        echo json_encode(['error' => 'Menu item details cannot be found.']);
    } else {
        header('Content-Type: application/json');
        echo json_encode($details);
    }

    $stmt->close();
    $conn->close();
?>
