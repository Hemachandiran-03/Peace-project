<?php
include('connection.php');
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $username = $_POST["username"];
    $email = $_POST["email"];
    $rating = $_POST["rating"];
    $comments = $_POST["comments"];

    // Connect to your database (replace placeholders with your actual database credentials)
    /*$servername = "localhost";
    $username = "username";
    $password = "password";
    $dbname = "feedback_db";*/

    /*$conn = new mysqli($servername, $username, $password, $dbname);*/


    if(mysqli_connect_errno())
    {
        echo"connection failed.";
        exit();
    }
    else
    {
        $sql = "INSERT INTO feedback VALUES ('".$username."','".$email."','".$rating."','".$comments."')";
        $res = mysqli_query($mysqli,$sql);
        if($res === true)
        {
            echo"<h1>Thank You for Your Feedback!</h1>";
        }
        else
        {
            echo"Error: ";
        }
        mysqli_close($mysqli);
    }
}
?>
