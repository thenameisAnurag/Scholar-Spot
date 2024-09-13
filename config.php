<?php
$conn = mysqli_connect("localhost:3307","root","","Login");
if (!$conn) {
    echo "Error connecting";
    # code...
}