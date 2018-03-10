<?php

include("include.php");



// Create return JSON
$rtn = "{ \"status\" : \"##status##\" , \"limit\" : \"##limit##\" , \"message\" : \"##message##\" , \"identifier\" : \"" . getServerIP() . "\" }";



// Get DB connection
$con = getDBConnection();


checkdberror();



// Collect parameters from $_GET or $_POST
$userid = getParam("UserId");



// Check for errors
$errmsg = "";
if ($userid == "") {
	$errmsg .= "Missing userId parameter; ";
}
if ($errmsg != "") {
	$rtn = str_replace("##status##" , "error" , $rtn);
	$rtn = str_replace("##message##" , $errmsg , $rtn);
	
	echo $rtn;
	die('');
}




// Decode user into registrant_id and email
$decoded_user = decodeUser($userid);

$email = $decoded_user[1];
$dbid = $decoded_user[0];







// Try to give user bonus entry if they haven't received it yet
$query=
 " UPDATE `Registrants`  SET bonus_sweepstakes_entry = 'true' WHERE email = ? AND id = ? AND bonus_sweepstakes_entry = 'false' ";


$stmt = $con->prepare($query);

$stmt->bind_param('ss',
        $email,
        $dbid
);

$stmt->execute();

$stmt->store_result();



// Get number of rows affected; If 1 row was affected, then the user received their entry; If 0 rows were affected, user already received their entry for today.
$rows = $stmt->affected_rows;

if ($rows == 0) {
        $limit = "OVER_LIMIT";
} else {
        $limit = "OK";
}

$stmt->close();










// Create JSON output and return
$rtn = str_replace("##status##" , "success" , $rtn);
$rtn = str_replace("##message##" , "" , $rtn);
$rtn = str_replace("##limit##" , $limit , $rtn);
echo $rtn;




?>
