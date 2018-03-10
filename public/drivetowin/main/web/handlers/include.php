<?php

header('Access-Control-Allow-Origin: *');


#ini_set('display_errors',1);
#error_reporting(E_ALL|E_STRICT);
ini_set('error_log','script_errors.log');
#ini_set('log_errors','On');
#ini_get('display_errors');

date_default_timezone_set('America/Los_Angeles');


include ("environment.php");
//try {
	//include ($_SERVER["DOCUMENT_ROOT"] . "/../db.config");
//} catch (Exception $e) {

//}



$lcaseGET = array_change_key_case($_GET, CASE_LOWER);
$lcasePOST = array_change_key_case($_POST, CASE_LOWER);



function getServerIP() {
	return str_replace("10.0." , "" , $_SERVER['SERVER_ADDR']);
}



function getParam($paramName) {

	global $con , $lcaseGET , $lcasePOST;

	$paramName = strtolower($paramName);

	$value = isset($lcaseGET[$paramName]) ? $lcaseGET[$paramName] : '';

	if ($value == "") {
		$value = isset($lcasePOST[$paramName]) ? $lcasePOST[$paramName] : '';
	}

	$value = $con->real_escape_string($value);

	return $value;

}


function getDBConnection() {
	global $db_servername , $db_username , $db_password , $db_database;

	if ( strpos(strtolower($_SERVER['HTTP_HOST']) , "hondadrivetowin") === FALSE ) {
		return new mysqli('127.0.0.1', 'root', '' , 'HondaClassic');
	} else {
		return new mysqli($db_servername, $db_username, $db_password , $db_database);
	}

}



function checkdberror() {

	global $con,$rtn;
	if ($con->connect_errno) {
        $rtn = str_replace("##status##" , "error" , $rtn);
        $rtn = str_replace("##message##" , "Could not connect: " . $con->connect_error , $rtn);

        echo $rtn;
        header("HTTP/1.1 500 Internal Server Error");
        die('');
	}


}





function getArrayFromDBResult($stmt) {

	$meta = $stmt->result_metadata();

	while ($field = $meta->fetch_field()) {
  		$parameters[] = &$row[$field->name];
	}

	call_user_func_array(array($stmt, 'bind_result'), $parameters);

	while ($stmt->fetch()) {
  		foreach($row as $key => $val) {
    		$x[$key] = $val;
  		}
  		$results[] = $x;
	}

	return $results;


}




function encodeUser($id , $email) {

	return base64_encode($id . "|" . $email);

}


function decodeUser($encodedStr) {

	$data = base64_decode($encodedStr);

	$exploded = explode( "|" , $data);

	return array ( $exploded[0] , $exploded[1] );

}

?>
