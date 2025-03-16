<?php
if (file_exists("../../clases/conexion/conexion.php")) {

    require_once("../../clases/conexion/conexion.php");
    require_once("../../clases/respuestas.class.php");

} elseif (file_exists("../clases/conexion/conexion.php")) {

    require_once("../clases/conexion/conexion.php");
    require_once("../clases/respuestas.class.php");
}

    class admin extends conexion{

        function traerPokemos($numPagina){

            $offset = ($numPagina - 1) * 6;

            $query = "SELECT * FROM public.pokemons  ORDER BY ".'"id_pokemon"'." DESC  LIMIT 6 OFFSET $offset";
            $datos = parent::obtenerDatos($query);
         
         
            if(count($datos) > 0){

                $queryC = "SELECT * FROM public.pokemons ";
                $datosC = parent::obtenerDatos($queryC);
                $totalC = count($datosC);
                $paginas = ceil($totalC / 6);

                $array = array(
                    "status"  => 200,
                    "registros" => $totalC, 
                    "paginas" => $paginas,
                    "datos" => $datos,
                    "mensaje" => "consulta Exitosa"
                );

                return $array;
            }else{
                $array = array(
                    "status"  => 404,
                    "mensaje" => "No ahy registros",
                );

                return $array;
            }

           
       
        }

        function traerPokemonPorId($id){

            $query = "SELECT * FROM public.pokemons WHERE ".'"id_pokemon"'." ='$id' ";
            $datos = parent::obtenerDatos($query);
         
         
            if(count($datos) > 0){

                $array = array(
                    "status"  => 200,
                    "datos" => $datos,
                    "mensaje" => "consulta Exitosa"
                );

                return $array;
            }else{
                $array = array(
                    "status"  => 404,
                    "mensaje" => "No hay registros",
                );

                return $array;
            }

           
       
        }


        public function crearNuevoPokemon($json){

            $_respuestas = new respuestas;
            $_conexion = new conexion;

           $datos = json_decode($json,true);

            $image      =$datos['image'];
            $name       =$datos['name'];
            $group      =$datos['group'];
            $type       =$datos['type'];
            $slot       =$datos['slot'];
            $fechaHoy   = date("Y-m-d-H-i-s");

            $nameImage     = "f1-" . $name . $fechaHoy . ".PNG" ;
            $imgRes = $this->procesarImanges($image,$nameImage);

            $resp = $_conexion-> guardarDatos("INSERT INTO public.pokemons( ".'"name"'.", ".'"group"'.", ".'"type"'.", ".'"slot"'.", ".'"image"'.") VALUES ('$name', '$group', '$type', '$slot', '$nameImage')");

            $array = array(
                'status'  => 200,
                'res'  => $resp,
                'mensaje' => "pokemon guardado con exito"
            );

            return $array;
        }

        function editarPokemon($json){
            $_respuestas = new respuestas;
            $_conexion = new conexion;

            $datos = json_decode($json,true);

            $id     = $datos['id'];
            $name   = $datos['name'];
            $group  = $datos['group'];
            $type   = $datos['type'];
            $slot   = $datos['slot'];
            $image  = $datos['image'];

            $fechaHoy   = date("Y-m-d-H-i-s");

            if($image ==""){

                $query = "UPDATE public.pokemons SET  ".'"name"'."= '$name', ".'"group"'."='$group', ".'"type"'."='$type', ".'"slot"'."='$slot' WHERE ".'"id_pokemon"'." = '$id'";
                $resp = parent::guardarDatos($query);

                
                $array = array(
                    'status'  => 200,
                    'res'  => $resp,
                    'mensaje' => "pokemon actualizado con exito"
                );

                return $array;
            }else{

                $nameImage     = "f1-" . $name . $fechaHoy . ".PNG" ;
                $imgRes = $this->procesarImanges($image,$nameImage);
    
                $query = "UPDATE public.pokemons SET  ".'"name"'."= '$name', ".'"group"'."='$group', ".'"type"'."='$type', ".'"slot"'."='$slot', ".'"image"'."='$nameImage' WHERE ".'"id_pokemon"'." = '$id'";
                $resp = parent::guardarDatos($query);

                $array = array(
                    'status'  => 200,
                    'res'  => $resp,
                    'mensaje' => "pokemon actualizado con exito"
                );

                return $array;
            }


        }

        public function eliminarPokemon($idPokemon){

            $id  = trim($idPokemon, "'\""); 

            $query  = "DELETE FROM public.pokemons WHERE ".'"id_pokemon"'." ='$id'";
            $res    = parent::obtenerDatos($query);

            $array = array(
                'status' => 200,
                'res'    => $res,
                'mensaje'=> "Pokémon eliminado con exito"
            );
            return $array;
        }

                
        public function procesarImanges($img,$nombre){

            $direccion = $_SERVER['DOCUMENT_ROOT'] . "/apiCun/img/pokemons/";
            // Create the folder if it doesn't exist
            if (!is_dir($direccion)) {
                mkdir($direccion, 0777, true);
            }
            
            $partes =  explode(";base64",$img);
            $extencion = explode('/',mime_content_type($img))[1];
            $imagen_base64 = base64_decode($partes[1]);
            //$file = $direccion . uniqid() . "." . $extencion;
            $file = $direccion . $nombre;
            file_put_contents($file,$imagen_base64);
            $nuevaDirecion = str_replace('\\','/',$file);
            return $nuevaDirecion;


            
        }

    }

    ?>