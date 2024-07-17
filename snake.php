<?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "snake_game";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $score = $_POST['score'];
    $sql = "INSERT INTO scores (score) VALUES ($score)";
    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $sql = "SELECT score FROM scores ORDER BY score DESC LIMIT 10";
    $result = $conn->query($sql);

    $scores = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $scores[] = $row['score'];
        }
    }

    echo json_encode($scores);
}

$conn->close();
?>
