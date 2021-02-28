<?php  
 $connect = mysqli_connect("localhost", "root", "", "bloomproject");  
 $query = "SELECT emotion, count(*) as number FROM usermoods GROUP BY emotion";  
 $result = mysqli_query($connect, $query);  
 ?>  
 <!DOCTYPE html>  
 <html>  
 <head>
	<meta charset="utf-8">
	<title>USER MOODS RESULTS</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="">
	<meta name="author" content="">
    <link href="../css/bootstrap-responsive.css" rel="stylesheet">
	<link href="../css/style.css" rel="stylesheet">
    <link href="../color/default.css" rel="stylesheet">
	<link rel="shortcut icon" href="../img/favicon.ico">
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
					<h1 class="brand"><a href="#">USER MOODS RESULTS</a></h1>
					<!-- navigation -->
					<nav class="pull-right nav-collapse collapse">
						<ul id="menu-main" class="nav">
                            <li><a title="team" href="../index.html">Home</a></li>
						</ul>
					</nav>
				</div>
			</div>
		</div>
    </div>


      <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>  
           <script type="text/javascript">  
           google.charts.load('current', {'packages':['corechart']});  
           google.charts.setOnLoadCallback(drawChart);  
           function drawChart()  
           {  
                var data = google.visualization.arrayToDataTable([  
                          ['emotion', 'Number'],  
                          <?php  
                          while($row = mysqli_fetch_array($result))  
                          {  
                               echo "['".$row["emotion"]."', ".$row["number"]."],";  
                          }  
                          ?>  
                     ]);  
                var options1 = {  
                      is3D:true,  
                      pieHole: 0.4  
                     };  

                var chart1 = new google.visualization.PieChart(document.getElementById('piechart'));  
                chart1.draw(data, options1);  
           }  
           </script> <br>
           <h3 style="padding-left: 7%; padding-top: 5%">3D Pie Chart of User Moods</h3> 
           <br>
           <div style="width:100%">  
                <br>  
                <div class="pchart" id="piechart" ></div>  
           </div> 
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
           
           </footer>

        <style>
            .pchart{
                width:100%;
                height:400px;
            }

            @media only screen and (max-width: 600px) {
                .pchart{
                    width:100%;
                    height:100%;
                }
            }
        </style>

        <script src="../js/jquery.js"></script>
	<script src="../js/jquery.scrollTo.js"></script>
	<script src="../js/jquery.nav.js"></script>
	<script src="../js/jquery.localScroll.js"></script>
	<script src="../js/bootstrap.js"></script>
	<script src="../js/jquery.prettyPhoto.js"></script>
	<script src="../js/isotope.js"></script>
	<script src="../js/jquery.flexslider.js"></script>
	<script src="../js/inview.js"></script>
	<script src="../js/animate.js"></script>
	<script src="../js/custom.js"></script>
      </body>  
 </html>  