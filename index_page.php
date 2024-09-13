
<?php
session_start();

if (isset($_SESSION['SESSION_EMAIL'])) {
    header("Location: Home_login_page.php");
    die();
}

include 'config.php';
$msg = "";
$verificationmsg="";


 

if (isset($_GET['verification']) && mysqli_num_rows(mysqli_query($conn, "SELECT * FROM users WHERE code='{$_GET['verification']}'")) > 0) {
    $query = mysqli_query($conn, "UPDATE users SET code='' WHERE code='{$_GET['verification']}'");

    if ($query) {
        $verificationmsg = "<div class='alert alert-success'>Account verification has been successfully completed.</div>";
    }else {
      $verificationmsg = "<div class='alert alert-danger'>Something Went wrong with your account.</div>";
    }
}

    // THis is correct code 

    if (isset($_POST['submit'])) {
      $email = mysqli_real_escape_string($conn, $_POST['email']);
      $password = mysqli_real_escape_string($conn, $_POST['password']);
    
      $sql = "SELECT * FROM users WHERE email='{$email}' AND password='{$password}'";
      $result = mysqli_query($conn, $sql);
    
      if (mysqli_num_rows($result) === 1) {
        $row = mysqli_fetch_assoc($result);
    
        if (empty($row['code'])) {
          $_SESSION['SESSION_EMAIL'] = $email;
          header("Location: Home_login_page.php");
        } else {
          $msg = "<div class='alert alert-info'>First verify your account and try again.</div>";
        }
      } else {
        $msg = "<div class='alert alert-danger'>Email or password do not match.</div>";
      }
    }
?>


<!-- Rest of your HTML code -->

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

    <link rel="stylesheet" href="home_page.css" />

  </head>
  <body>
    <header>
      <img id="Logo" src="Scholar_SpoT Logo.png" alt="" />

      <nav class="navigation">
        <a href="index.html" target="_blank" class="nav-link">Home </a>
        <a href="Scholarships.html" class="nav-link">Scholarships</a>
        <a href="Schemes.html" class="nav-link">Schemes </a>
        <a href="About.html" class="nav-link">About us</a>
        <button class="btnlogin-popup">
          Login <ion-icon name="person-circle-outline"></ion-icon>
        </button>
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
            <h4><?php echo $verificationmsg; ?></h4>
            <h4><?php echo $msg; ?></h4>
              <h2>
                <img id="scholarhalf" src="Scholar SpoT half.png" alt="" />
                Scholarspot will help you to Find the Best Scholarships For You
                ....
              </h2>
            </div>
            <div class="display-part2">
              <h2>Most Search Scholarships</h2>
              <ul>
                <a href="#"> <li>Scholarship 1</li> </a>
                <a href="#"> <li>Scholarship 1</li> </a>
                <a href="#"> <li>Scholarship 1</li> </a>
                <a href="#"> <li>Scholarship 1</li> </a>
                <a href="#"> <li>Scholarship 1</li> </a>
              </ul>
            </div>
          </div>
        </div>
      </div>
<!-- ///////////////////////////////////////////////// -->


            <!-- ////////////////////////// -->
      
        <div class="backimage">
          <div class="wrapper">
            <span class="close-icon">
              <ion-icon name="close-outline"></ion-icon
            ></span>

            <div class="form-box login">
              <div id="logopic"></div>
              <h2>Login</h2>
              <form action="" method="post">
                <div class="input-box">
                  <span class="icon">
                    <ion-icon name="mail"></ion-icon>
                  </span>
                <input name="email" type="email" id="" required>
                  <label>Email</label>
                </div>
                <div class="input-box">
                  <span class="icon"
                    ><ion-icon name="lock-closed"></ion-icon
                  ></span>
                  <input name="password" type="password" required />
                  <label>Password</label>
                </div>
                <div class="remember-forget">
                  <label><input type="checkbox" />Remember Me </label>
                  <a href="#">Forgot password ?</a>
                </div>
                <button type="submit" name="submit" class="btn">Login</button>
                <div class="login-register">
                  <p>
                    Don't have an Account ?
                    <a href="#" class="register-link">Register</a>
                  </p>
                </div>
              </form>
            </div>

            <!--     
                 For Registration -->
            <div class="form-box register">
              <h2>Registration</h2>
              <form action="#">
                <div class="input-box">
                  <span class="icon">
                    <ion-icon name="person-circle"></ion-icon>
                  </span>
                  <input type="text" required />
                  <label>UserName</label>
                </div>
                <div class="input-box">
                  <span class="icon">
                    <ion-icon name="mail"></ion-icon>
                  </span>
                  <input type="mail" required />
                  <label>Email</label>
                </div>

                <div class="input-box">
                  <span class="icon"
                    ><ion-icon name="lock-closed"></ion-icon
                  ></span>
                  <input type="password" required />
                  <label>Password</label>
                </div>
                <div class="input-box">
                  <span class="icon"
                    ><ion-icon name="lock-closed"></ion-icon
                  ></span>
                  <input type="password" required />
                  <label>Confirm Password</label>
                </div>
                <div class="remember-forget">
                  <label
                    ><input type="checkbox" />I agree to the terms and
                    conditions
                  </label>
                </div>
                <button type="submit" class="btn">Register</button>
                <div class="login-register">
                  <p>
                    Already have an Account ?
                    <a href="#" class="login-link">Login</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
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
      <h2>Why Login And Register ?</h2>
                  <ul>
                     <li>You Can Use Scholarspot wisely and useful</li>
                     <li>You Can Find the scholarship which is eligible For You </li>
                     <li>Our Chatbot can help You with related questions </li>
                   
                  </ul>
      </div>
      <div class="part2">
        <img src="apply_scholarships.jpg" alt="" />
      </div>
    </div>
    </div>

    <!-- Footer Sction   -->

    <div class="footer">

 
      <h1>Scholar Spot </h1>
      <div class="footerstyle">

   
      <div class="about">
        <h4> <b>G13 Group </b><br> Pimpri Chinchwad College Of Engineering , Pune  <br> Maharashtra , India</h4>
        <a href="">Links </a>
      </div>
      <div class="Services">
        <a href="">Home </a>
        <a href="">Scholarships  </a>
        <a href=""> About  </a>
      </div>
    </div>

    </div>

    <script src="index.js"></script>
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
