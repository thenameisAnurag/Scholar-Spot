<?php
   include 'config.php';

   if (isset($_POST['submit'])) {
      $name = mysqli_real_escape_string($conn, $_POST['name']);
      $email = mysqli_real_escape_string($conn, $_POST['email']);
      $password = mysqli_real_escape_string($conn, $_POST['password']);
      $confirm_password = mysqli_real_escape_string($conn, $_POST['confirm-password']);
      
      if ($password === $confirm_password) {
         echo "Registration Successful";
         // Perform further actions like storing user data in the database
      } else {
         echo "Passwords do not match.";
      }
   } else {
      echo "Error: No form submitted.";
   }
?>
