<?php
  $name = $_POST['Name'];
  $company = $_POST['Company'];
  $phone = $_POST['Phone'];
  $email = $_POST['Email'];
  $wish = $_POST['Wish'];

  $name = htmlspecialchars($name);
  $company = htmlspecialchars($company);
  $phone = htmlspecialchars($phone);
  $email = htmlspecialchars($email);
  $wish = htmlspecialchars($wish);
  $name = urldecode($name);
  $company = urldecode($company);
  $phone = urldecode($phone);
  $email = urldecode($email);
  $wish = urldecode($wish);
  $name = trim($name);
  $company = trim($company);
  $phone = trim($phone);
  $email = trim($email);
  $wish = trim($wish);
  
  if(mail("frizzzbe@yandex.ru", "Request", "Name: ".$name.". \nCompany: ".$company.". \nPhone: ".$phone.". \nE-mail: ".$email.". \nWish: ".$wish ,"From: someone@boppan.org \r\n")) {
    header('Location: index.html');
  }
?>