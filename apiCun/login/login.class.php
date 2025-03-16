<?php

if (file_exists("../../clases/conexion/conexion.php")) {

    require_once("../../clases/conexion/conexion.php");
    require_once("../../clases/respuestas.class.php");

} elseif (file_exists("../clases/conexion/conexion.php")) {

    require_once("../clases/conexion/conexion.php");
    require_once("../clases/respuestas.class.php");
}

    class login extends conexion{

        public function post($json){
            
            $_respuestas = new respuestas;
            $_conexion = new conexion;

           $datos = json_decode($json,true);

                $usuario   = $datos['usuario'];
                $pasword   = $datos['password'];

                  
                $queryUsuaro = "SELECT * FROM public.users WHERE ". '"user"'." = '$usuario'";
                //return $query;
                $dataUsuario = parent::obtenerDatos($queryUsuaro);
                /*$array = array(
                    "status" => 400,
                    "mensaje" => $dataUsuario
                );

                return $array;*/

                if(count($dataUsuario) > 0){
                    $queryContra = "SELECT ".'"id","user"'." FROM public.users  WHERE ".'"user"'." = '$usuario' AND ".'"password" '." = '$pasword'";
                    $dataContra = parent::obtenerDatos($queryContra);
                    if(count($dataContra) > 0){
                        $datos = parent::obtenerDatos($queryContra);

                        $token = $this->generarToken();

                        $tokeyQuery = "UPDATE public.users SET ".'"token"'." ='$token' WHERE ".'"user"'." ='$usuario'";
                        $tokeyUpdate = parent::guardarDatos($tokeyQuery);

                        $array = array(
                            "status" => 200,
                            "datos" => $datos,
                            "token" => $token
                        );
                        return $array;

                    }else{
                        $array = array(
                            "status" => 400,
                            "mensaje" => "Contraseña incorrecta",
                        );
                        return $array;
                    }
                }else{
                    $array = array(
                        "status" => 404,
                        "mensaje" => "El usuario no existe",
                    );
                    return $array;
                }
                

 
        }

        public function getComprobarToken($json){

            $datos = explode(",", $json);

            $token = $datos[0];
            $idUser= $datos[1];

 
            $query = "SELECT ".'"token"'." FROM public.users WHERE ".'"id"'." ='$idUser'";
            $datos = json_encode(parent::obtenerDatos($query)); 
            $row   = json_decode($datos,true);

            $tokenDB = $row[0]['token'];

            if($token == $tokenDB){
                return 200;
            }else{
                return 400;
            }

        }

        function obtenerToken($idUser){
            $query = "SELECT ".'"token"'." FROM public.users WHERE ".'"id"'." ='$idUser'";
            $datos = parent::obtenerDatos($query);

            if(count($datos) > 0){
                $array = array (
                    'status' => 200,
                    'datos' => $datos
                );

                return $array;
            }else{
                $array = array (
                    'status' => 404,
                    'mensaje' => "Error no se encontro token"
                );

                return $array;
            }

           
          
        }

        function generarToken($longitud = 32) {
            return bin2hex(random_bytes($longitud));
        }
        
       
}

?>