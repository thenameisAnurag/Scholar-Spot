<?php
 session_start();
 if (!isset($_SESSION['SESSION_EMAIL'])) {
     header("Location: index_page.php");
     die();
 }
include 'config.php';
$username="";

$query = mysqli_query($conn, "SELECT * FROM users WHERE email='{$_SESSION['SESSION_EMAIL']}'");

if (mysqli_num_rows($query) > 0) {
    $row = mysqli_fetch_assoc($query);

    $username=$row['name'];
}
?>



<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- For Fonts  -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Fredericka+the+Great&family=Mulish&family=Potta+One&display=swap"
      rel="stylesheet"
    />

    <title>Scholar's Spot</title>

    <link rel="shortcut icon" href="Ullu_Eyes.png" type="image/x-icon" />

    <link rel="stylesheet" href="Home_login_page.css" />

  </head>
  <body>
    <header>
      <img id="Logo" src="Scholar_SpoT Logo.png" alt="" />

      <nav class="navigation">
        <a href="Home_login_page.php" target="_blank" class="nav-link">Home </a>
        <a href="Scholarships.php" class="nav-link">Scholarships</a>
        <a href="Schemes.html" class="nav-link">Schemes </a>
        <a href="About.html" class="nav-link">About us</a>
        <div class="user">
          <h3>Welcome <br><?php echo $username; ?></h3>
          <a href="logout.php"> <button class="btnlogin-popup">
          Logout <ion-icon name="log-out-outline"></ion-icon>
        </button></a>
       
      </div>
      </nav>
    </header>
    <div class="containerdeadline">
      <div class="ticker">
        <div class="title"><h4>DeadLines For Scholarship :</h4></div>
        <div class="deadline">
          <marquee
            behavior=""
            direction=""
            onmouseover="javascript:stop()"
            onmouseout="javascript:start()"
          >
            <p>
              Post-Matric Scholarships Scheme for Minorities Last Date is :
              26-06-2023
            </p>
          </marquee>
        </div>
      </div>
    </div>
    <!-- 
    <div class="search-container">
      <h1>Best Place For Scholar's</h1>
      <input
        id="searchbox"
        type="text"
        placeholder="Search Scholarships and Schemes"
      />
    </div> -->
    <!-- ////////////// -->
    <div class="Content">
      <div class="Main-content">
        <div class="frontpage">
          <div class="display1">
            <div class="display-part1">
              <h2>
                <img id="scholarhalf" src="Scholar SpoT half.png" alt="" />
                Scholarspot will help you to Find the Best Scholarships For You
                ....
              </h2>
              <div class="wrap">
                <div class="search">
                   <input type="text" class="searchTerm" placeholder="What are you looking for?">
                   <button type="submit" class="searchButton">
                    <ion-icon name="search"></ion-icon>
                  </button>
                </div>
             </div>
             <div class="click">
                <a href="model.php">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  Lets Go
                </a>
              </div>

            </div>
          </div>
          <div class="chatbot">
            <img id="botimage" src="ChatBot.png" alt="This is chatbot">
          </div>
          <div class="chatbotspace">
            <div class="chatbotcode">
              <div class="close">
                <ion-icon name="close-circle"></ion-icon>

              </div>
             

             <iframe src="http://localhost:8502" style="width: 100%; height: 70vh; border: none;"></iframe>
          </div>
        </div>
        </div>
      </div>
<!-- ///////////////////////////////////////////////// -->


            <!-- ////////////////////////// -->

      </div>
    <!-- </div> -->
<!-- ////////////----------WORKS-------------------////////// -->
  </div>
  <div class="works">
    <h1>How Scholars spot Works ?</h1>
    <div class="work1">
      <div class="part1">
        <h2>Register and Create Your Profile</h2>
        <ul>
          <li>Sign up with email id</li>
          <li>verify Your Email Adress</li>
          <li>login with email Id</li>
          <li>Find your most suitable scholarships</li>
        </ul>
      </div>
      <div class="part2">
        <img src="how_login.jpg" alt="" />
      </div>
    </div>
    <div class="work2">

      <div class="part1">
        <img src="notified.png" alt="" />
      </div>
      <div class="part2">
        <ul>
          <h2>Get notified for matching scholarships</h2>
          <li>
            Based on your profile you will receive matching scholarship
            email notifications
          </li>
          <li>
            Receive the deadline of scholarships based on Your Profile
          </li>
        </ul>
      </div>
    </div>
    <div class="work3">
      <div class="part1">
        <h2>Apply  Scholarships and schemes </h2>
        <ul>
          <li>You can directly apply for scholarships and schemes  </li>
          <li>Regularly monitor your email for Scholarspot notifications</li>
          <li>Respond to the questions 24 by 7</li>
        </ul>
      </div>
      <div class="part2">
        <img src="apply_scholarships.jpg" alt="" />
      </div>
    </div>
    </div>

    <!-- Footer Sction   -->

    <div class="footer">
      <h1>Scholar Spot</h1>
      <div class="footerstyle">
         <div class="about">
            <h4> Team G-13 Members </h4>
                <ul>
                    <li>Kshitij Guladhe</li>
                    <li>Anurag Mishra</li>
                    <li>Mayur Naikwade</li>
                    <li>ramvijay Yadav</li>
                </ul>
           
         </div>
         <div class="links">
            <ion-icon name="logo-instagram"></ion-icon>
            <ion-icon name="logo-facebook"></ion-icon>
            <ion-icon name="logo-linkedin"></ion-icon>
            <ion-icon name="logo-twitter"></ion-icon>

         </div>
         <div class="Services">
            <a href="#">Home</a>
            <a href="#">Scholarships</a>
            <a href="#">Schemes</a>
            <a href="#">About</a>
         </div>
      </div>
      <p>&copy; 2023 Scholar Spot. All rights reserved.</p>
   </div>

    </div>

    <script src="Home_login_page.js"></script>
    <script
      type="module"
      src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
    ></script>
    <script
      nomodule
      src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
    ></script>
  </body>
</html>
