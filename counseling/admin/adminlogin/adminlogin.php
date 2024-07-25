<?php
include('connection.php');
$username = $_POST['user'];
$password = $_POST['pass'];
if(mysqli_connect_errno())
{
    echo"connection failed";
    exit();
}
else
{
    $sql = "SELECT password FROM admin WHERE username='$username'";
    $res = mysqli_query($mysqli ,$sql);
    $row = mysqli_fetch_array($res);
    if(!$row)
    {
        echo "<script>alert('Username does not exist')</script>";
    }
    else
    {
        if($row[0] != $password){
            echo "<script>alert('Invalid password')</script>";
        }
        else{
            echo "<script>alert('Successfully logged in')</script>";
        }
    }
    mysqli_close($mysqli);
}
?>

