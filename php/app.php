<?php

    $name = strip_tags(htmlspecialchars($_POST["name"]));
    $company = strip_tags(htmlspecialchars($_POST["company"]));
    $phone = strip_tags(htmlspecialchars($_POST["phone"]));
    $email = strip_tags(htmlspecialchars($_POST["mail"]));
    $lang = strip_tags(htmlspecialchars($_POST["lang"]));

    if($name != "") {
        require("class.phpmailer.php");
        $mail = new PHPMailer();
        
        $mail->CharSet = "UTF-8";
        $mail->From = $address; //adres naszego konta 
        $mail->FromName = $email;//nagďż˝ďż˝wek From 
        $mail->SetLanguage("pl", "phpmailer/language/"); 
    
        $text_body = "Wiadomość od: ".$name."\nFirma: ".$company."\nmail: ".$email."\nTel.: ".$phone;
        $mail->Subject = "Prośba o kontakt w sprawie Aukcji Online. Od firmy ".$company." Wysłał: ".$name;
        $mail->Body = $text_body; 
        
        if($lang == "pl") {
            $mail->AddAddress("doradztwo@logintegra.com");
        } else {
            $mail->AddAddress("sales@logintegra.com");
        }
    
        if(!$mail->Send()) { 
        echo "failed"; 
        echo $mail->ErrorInfo."<br>"; 
    
        } else {
            echo "success";
        }
        $mail->ClearAddresses();
        $mail->ClearAttachments();
    }

    $name = "";
    $company = "";
    $phone = "";
    $email = "";
    $lang = "";


?>