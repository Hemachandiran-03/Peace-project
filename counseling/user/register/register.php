<?php
include('connection.php');
if(isset($_POST['reg_user']))
{
$fname = $_POST['firstName'];
$lname = $_POST['lastName'];
$email = $_POST['email'];
//$dob = date('m-d-Y', strtotime($_POST['dob']));
$dob= date($_POST['dob']);
$country = $_POST['country'];
$contact = $_POST['contactnumber'];
$username = $_POST['UserName'];
$password = $_POST['password'];
$cpassword = $_POST['cpassword'];
if(mysqli_connect_errno())
{
	echo"connection failed.";
	exit();
}
else
{
	$sql = "INSERT INTO user VALUES ('".$fname."','".$lname."','".$email."','".$dob."','".$country."','".$contact."','".$username."','".$password."','".$cpassword."')";
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