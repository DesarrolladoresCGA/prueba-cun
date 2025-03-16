<?php
    require_once('login.class.php');
    require_once('../clases/respuestas.class.php');

    $_respuestas = new respuestas;
    $login = new login;

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Method: POST');
    header('Access-Control-Allow-Headers: token, Content-Type');

  
    if($_SERVER['REQUEST_METHOD'] == "POST"){
        //resivir datos enviados
        $idUser = file_get_contents("php://input");

        //enviamos los datoa al manejador
        $token = $login->obtenerToken($idUser);

        //devolvemos una respuesta
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods:POST');
        header('Access-Control-Allow-Headers: Content-Type,token');

        
       
        echo(json_encode($token)); 
    } 
    
?>
