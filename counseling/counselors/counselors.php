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






<?php
// Define an array of counselors (this can be retrieved from a database in a real application)
$counselors = [
    [
        'id' => 1,
        'name' => 'John Doe',
        'specialties' => 'Depression, Anxiety, Relationship Counseling',
        'profile_picture' => 'counselor1.jpg',
    ],
    [
        'id' => 2,
        'name' => 'Jane Smith',
        'specialties' => 'Stress Management, Career Counseling',
        'profile_picture' => 'counselor2.jpg',
    ],
    // Add more counselors as needed
];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Our Counselors</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Our Counselors</h1>
    </header>
    <nav>
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="counselors.php">Counselors</a></li>
            <!-- Add more navigation links as needed -->
        </ul>
    </nav>
    <main>
        <section class="counselor-list">
            <?php foreach ($counselors as $counselor): ?>
                <div class="counselor">
                    <img src="<?php echo $counselor['profile_picture']; ?>" alt="<?php echo $counselor['name']; ?>">
                    <h2><?php echo $counselor['name']; ?></h2>
                    <p>Specializes in: <?php echo $counselor['specialties']; ?></p>
                    <a href="counselor_profile.php?id=<?php echo $counselor['id']; ?>">View Profile</a>
                </div>
            <?php endforeach; ?>
        </section>
    </main>
  
</body>
</html>
