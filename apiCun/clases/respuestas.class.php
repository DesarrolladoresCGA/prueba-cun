<?php
class respuestas{
    public $response = [
        'status' => 'ok',
        'resul' => array()
    ];

    //mostrar mensaje de error de solicitud o método no permitido
    public function error_405(){
        $this->response['status'] = "error";

        //mensajes de error
        $this->response['result'] = array(
            "error_id" => "405",
            "error_msg" => "Método no permitido"
        );
        return $this->response; // Updated variable name
    }

    //mostrar mensaje de error datos incorrectos
    public function error_200($string = "Datos incorrectos"){
        $this->response['status'] = "error";

        //mensajes de error
        $this->response['result'] = array(
            "error_id" => "200",
            "error_msg" => $string   
        );
        return $this->response; // Updated variable name
    }

    //mostrar mensaje de error de solicitud o método no permitido
    public function error_400(){
        $this->response['status'] = "error";

        //mensajes de error
        $this->response['result'] = array(
            "error_id" => "400",
            "error_msg" => "Datos enviados incompletos o con formato incorrecto"
        );
        return $this->response; // Updated variable name
    }

    //mostrar mensaje de error de token no se ha guardado
    public function error_500($string = "Error del servidor"){
        $this->response['status'] = "error";

        //mensajes de error
        $this->response['result'] = array(
            "error_id" => "500",
            "error_msg" => $string   
        );
        return $this->response; // Updated variable name
    }
}

?>