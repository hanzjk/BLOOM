<?php

	$host = "localhost";
	$dbUsername="root";
	$dbPassword="";
	$dbname="bloomproject";

	$conn = new mysqli($host,$dbUsername,$dbPassword,$dbname);
 
	if(mysqli_connect_error()){
		die('Connect Error('.mysqli_connect_error().')'.mysqli_connect_error());

	}else{
    if(isset($_POST['emotion'])){
     // echo "jk";
      $emotion=mysqli_real_escape_string($conn,$_POST['emotion']); 
      echo $emotion;
      echo "in";
    }

    $sql = "INSERT INTO usermoods (emotion) VALUES ('$emotion')";
    
			if($conn->query($sql) === TRUE){
        echo "Saved";
      }
      else{
        echo "Error: ". $sql . "<br>".$conn->error;
      }
		
    $conn->close();
  }

?>
