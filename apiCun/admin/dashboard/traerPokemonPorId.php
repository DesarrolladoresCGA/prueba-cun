<?php
require_once('../admin.class.php');
require_once('../../login/login.class.php');
require_once('../../clases/respuestas.class.php');

$_respuestas = new respuestas;
$login       = new login;
$admin       = new Admin;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Method: POST,GET');
header('Access-Control-Allow-Headers: token, Content-Type');



if ($_SERVER['REQUEST_METHOD'] == "POST") {

    $headers       = getallheaders();
    $tokenRecibido = $headers['token'];

    $respuesta     = $login->getComprobarToken($tokenRecibido);

    if ($respuesta == 200) {

        $id = file_get_contents("php://input");

        //enviamos los datoa al manejador
        $respuesta = $admin->traerPokemonPorId($id);

        //devolvemos una respuesta
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Method: POST');
        header('Access-Control-Allow-Headers: token, Content-Type');


        echo (json_encode($respuesta));
    }else{
        $arrar = array(
            'status' => 400,
            'mensanje' => 'No tiene Autorización para hacer la accion'
        );

        
        echo (json_encode($arrar));
    }

}
