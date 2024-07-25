<?php
include('connection.php');
if(isset($_POST['reg_user']))
{
$doctorname = $_POST['DoctorName'];
$email = $_POST['email'];
$contact = $_POST['contact'];
$service = $_POST['service'];
$name = $_POST['Name'];
$password = $_POST['password'];
if(mysqli_connect_errno())
{
	echo"connection failed.";
	exit();
}
else
{
	$sql = "INSERT INTO doctor VALUES ('".$doctorname."','".$email."','".$contact."','".$service."','".$name."','".$password."')";
	$res = mysqli_query($mysqli,$sql);
	if($res === true)
	{
		echo"record inserted successfully.";
	}
	else
	{
		echo"could not insert record.";
	}
	//mysqli_free_result($res);
	mysqli_close($mysqli);
}
}
?>