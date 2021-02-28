<!DOCTYPE HTML>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>USER FEEDBACK</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="">
	<meta name="author" content="">
	<link href="css/bootstrap-responsive.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
	<link href="color/default.css" rel="stylesheet">
	<link rel="shortcut icon" href="img/favicon.ico">
</head>


<body>

 <!-- navbar -->
 <div class="navbar-wrapper">
		<div class="navbar navbar-inverse navbar-fixed-top">
			<div class="navbar-inner">
				<div class="container">
					<!-- Responsive navbar -->
					<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>
				</a>
					<h1 class="brand"><a href="#">THANK YOU</a></h1>
					<!-- navigation -->
					<nav class="pull-right nav-collapse collapse">
						<ul id="menu-main" class="nav">
							<li><a title="team" href="index.html">Home</a></li>
						</ul>
					</nav>
				</div>
			</div>
		</div>
    </div>

	<h3 class="res">Thank You for the Response</h3>
	<img src="img/feedback.gif" class="feedimg">
	<div>
<?php
$userFeedbacks = $_POST['userFeedbacks'];

if(!empty($userFeedbacks)){
	$host = "localhost";
	$dbUsername="root";
	$dbPassword="";
	$dbname="bloomproject";

	$conn = new mysqli($host,$dbUsername,$dbPassword,$dbname);

	if(mysqli_connect_error()){
		die('Connect Error('.mysqli_connect_error().')'.mysqli_connect_error());

	}else{
		$INSERT = "INSERT Into feedbacks(userFeedbacks) values(?)";
			$stmt = $conn->prepare($INSERT);
			$stmt->bind_param("s",$userFeedbacks);
			$stmt->execute();
		
		$stmt->close();
		$conn->close();
	}

}else{
	echo "All field are required";
	die();
	
}

?>
</div>



<br><br><br>
    <footer>
		<div class="container">
			<div class="row">
				<div class="span6 offset3">
					<ul class="social-networks">
						<li><a href = "mailto: chatbotse2020@gmail.com"><i class="icon-circled icon-bgdark icon-envelope icon-3x"></i></a></li>
						
					</ul>
					<p class="copyright">
						&copy;  All rights reserved.
						<div class="credits">
							Designed by Team BLOOM</a>
						</div>
					</p>
				</div>
			</div>
        </div>
        
		<!-- ./container -->
	</footer>
	<a href="#" class="scrollup"><i class="icon-angle-up icon-square icon-bgdark icon-2x"></i></a>

    <script src="js/jquery.js"></script>
	<script src="js/jquery.scrollTo.js"></script>
	<script src="js/jquery.nav.js"></script>
	<script src="js/jquery.localScroll.js"></script>
	<script src="js/bootstrap.js"></script>
	<script src="js/jquery.prettyPhoto.js"></script>
	<script src="js/isotope.js"></script>
	<script src="js/jquery.flexslider.js"></script>
	<script src="js/inview.js"></script>
	<script src="js/animate.js"></script>
	<script src="js/custom.js"></script>
	<script src="contactform/contactform.js"></script>

</body>

</html>