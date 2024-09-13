
<?php
   //Import PHPMailer classes into the global namespace
   //These must be at the top of your script, not inside a function
   use PHPMailer\PHPMailer\PHPMailer;
   use PHPMailer\PHPMailer\SMTP;
   use PHPMailer\PHPMailer\Exception;

   //Load Composer's autoloader
     //Load Composer's autoloader
     require 'vendor/autoload.php';



include 'config.php';

$msg = ""; // Define $msg variable

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
   $name = mysqli_real_escape_string($conn, $_POST['name']);
   $email = mysqli_real_escape_string($conn, $_POST['email']);
   $password = mysqli_real_escape_string($conn, $_POST['password']);
   $confirm_password = mysqli_real_escape_string($conn, $_POST['confirm-password']);
   $code = mysqli_real_escape_string($conn, md5(rand()));

   if (mysqli_num_rows(mysqli_query($conn, "SELECT * FROM users WHERE email='{$email}'")) > 0) {
      $msg = "<div class='alert alert-danger'>{$email} - This email address has been already exists.</div>";
  } else {
   if ($password === $confirm_password) {
      $sql = "INSERT INTO users (name, email, password, code) VALUES ('{$name}', '{$email}', '{$password}', '{$code}')";
      $result = mysqli_query($conn, $sql);

      if ($result) {

      echo "<div style='display: none;'>";
      
      //Create an instance; passing `true` enables exceptions
      $mail = new PHPMailer(true);

      try {
         //Server settings
         $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
         $mail->isSMTP();                                            //Send using SMTP
         $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
         $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
         $mail->Username   = 'scholarspot89@gmail.com';                     //SMTP username
         $mail->Password   = 'wkqxmkyaehjubqir';                               //SMTP password
         $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
         $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

         //Recipients
         $mail->setFrom('scholarspot89@gmail.com');
         $mail->addAddress( $email);

         

         //Content
         $mail->isHTML(true);                                  //Set email format to HTML
         $mail->Subject = 'no reply';
         $mail->Body    = 'Here is the verification link <b><a href="http://localhost/final_project/?verification='.$code.'">http://localhost/final_project/?verification='.$code.'</a></b>';

         $mail->send();
         echo 'Message has been sent';
      } catch (Exception $e) {
         echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
      }
      echo "</div>";
         $msg = "<div class='alert alert-info'> We've send a verification link on your email address .</div>";
       }else {
         $msg = "<div class='alert alert-danger'> Something went wrong.</div>";
       }
      } else {
         $msg = "<div class='alert alert-daanger'> Password and Confirm password do not match </div>";
      }

  
  }
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
   <link href="https://fonts.googleapis.com/css2?family=Fredericka+the+Great&family=Mulish&family=Potta+One&display=swap" rel="stylesheet" />
   <title>Scholar's Spot</title>
   <link rel="shortcut icon" href="Ullu_Eyes.png" type="image/x-icon" />
   <link rel="stylesheet" href="home_page.css" />
</head>
<body>
   <header>
      <img id="Logo" src="Scholar_SpoT Logo.png" alt="" />
      <nav class="navigation">
         <a href="index.html" target="_blank" class="nav-link">Home</a>
         <a href="Scholarships.html" class="nav-link">Scholarships</a>
         <a href="Schemes.html" class="nav-link">Schemes</a>
         <a href="About.html" class="nav-link">About us</a>
         <button class="btnlogin-popup">
            Login
            <ion-icon name="person-circle-outline"></ion-icon>
         </button>
      </nav>
   </header>
   <div class="containerdeadline">
      <div class="ticker">
         <div class="title">
            <h4>Deadlines For Scholarship:</h4>
         </div>
         <div class="deadline">
            <marquee behavior="scroll" direction="left" onmouseover="this.stop();" onmouseout="this.start();">
               <p>Post-Matric Scholarships Scheme for Minorities Last Date is: 26-06-2023</p>
            </marquee>
         </div>
      </div>
   </div>
   <div class="Content">
      <div class="Main-content">
         <div class="frontpage">
            <div class="display1">

               <div class="display-part1">
               <h4><?php echo $msg; ?></h4>
              
                  <h2>
                     
                     <img id="scholarhalf" src="Scholar SpoT half.png" alt="" />
                     Scholarspot will help you find the Best Scholarships For You....
                  </h2>
               </div>
               <div class="display-part2">
                  <h2>Why Login And Register ?</h2>
                  <ul>
                     <li>You Can Use Scholarspot wisely and useful</li>
                     <li>You Can Find the scholarship which is eligible For You </li>
                     <li>Our Chatbot can help You with related questions </li>
                   
                  </ul>
               </div>
            </div>
         </div>
      </div>
      <div class="backimage">

      <!-- ************** LOGIN FORM **************** */ -->
         <div class="wrapper">
            <span class="close-icon">
               <ion-icon name="close-outline"></ion-icon>
            </span>
            <div class="form-box login">
               <div id="logopic"></div>
               <h2>Login</h2>
               <form action="#">
                  <div class="input-box">
                     <span class="icon">
                        <ion-icon name="mail"></ion-icon>
                     </span>
                     <input type="email" name="login_email" id="" required />
                     <label>Email</label>
                  </div>
                  <div class="input-box">
                     <span class="icon">
                        <ion-icon name="lock-closed"></ion-icon>
                     </span>
                     <input name="login_password" type="password" required />
                     <label>Password</label>
                  </div>
                  <div class="remember-forget">
                     <label><input type="checkbox" />Remember Me</label>
                     <a href="#">Forgot password?</a>
                  </div>
                  <button name="login_submit" type="submit" class="btn">Login</button>
                  <div class="login-register">
                     <p>
                        Don't have an Account?
                        <a href="#" class="register-link">Register</a>
                     </p>
                  </div>
               </form>
            </div>
            <!-- *******************************************  Registration form ******************************** -->
            <div class="form-box register">
               <h2>Registration</h2>
               <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">

                  <div class="input-box">
                     <span class="icon">
                        <ion-icon name="person-circle"></ion-icon>
                     </span>
                     <input name="name" type="text" value="<?php if (isset($_POST['submit'])) { echo $name; } ?>" required />
                     <label>Name</label>
                  </div>
                  <div class="input-box">
                     <span class="icon">
                        <ion-icon name="mail"></ion-icon>
                     </span>
                     <input name="email" type="email"  value="<?php if (isset($_POST['submit'])) { echo $email; } ?>" required />
                     <label>Email</label>
                  </div>
                  <div class="input-box">
                     <span class="icon">
                        <ion-icon name="lock-closed"></ion-icon>
                     </span>
                     <input name="password" type="password" required />
                     <label>Password</label>
                  </div>
                  <div class="input-box">
                     <span class="icon">
                        <ion-icon name="lock-closed"></ion-icon>
                     </span>
                     <input name="confirm-password" type="password" required />
                     <label>Confirm Password</label>
                  </div>
                  <div class="remember-forget">
                     <label><input type="checkbox" required />I agree to the terms and conditions</label>
                  </div>
                  <button name="submit" type="submit" class="btn">Register</button>
                  <div class="login-register">
                     <p>
                        Already have an Account?
                        <a href="#" class="login-link">Login</a>
                     </p>
                  </div>
               </form>
            </div>
         </div>
      </div>
   </div>
   <div class="works">
      <h1>How Scholars spot Works?</h1>
      <div class="work1">
         <div class="part1">
            <h2>Register and Create Your Profile</h2>
            <ul>
               <li>Sign up with your email ID</li>
               <li>Verify Your Email Address</li>
               <li>Login with your email ID</li>
               <li>Find the most suitable scholarships for you</li>
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
               <li>Based on your profile, you will receive matching scholarship email notifications</li>
               <li>Receive deadlines of scholarships based on your profile</li>
            </ul>
         </div>
      </div>
      <div class="work3">
         <div class="part1">
            <h2>Apply for Scholarships and Schemes</h2>
            <ul>
               <li>You can directly apply for scholarships and schemes</li>
               <li>Regularly monitor your email for Scholarspot notifications</li>
               <li>Respond to any questions 24/7</li>
            </ul>
         </div>
         <div class="part2">
            <img src="apply_scholarships.jpg" alt="" />
         </div>
      </div>
   </div>
   <div class="footer">
      <h1>Scholar Spot</h1>
      <div class="footerstyle">
         <div class="about">
            <h4><b>G13 Group</b><br>Pimpri Chinchwad College Of Engineering, Pune<br>Maharashtra, India</h4>
            <a href="#">Links</a>
         </div>
         <div class="Services">
            <a href="#">Home</a>
            <a href="#">Scholarships</a>
            <a href="#">About</a>
         </div>
      </div>
   </div>
   <script src="index.js"></script>
   <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
   <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
</body>
</html>