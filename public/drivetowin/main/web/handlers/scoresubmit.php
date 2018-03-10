<?php



include("include.php");






// Create return JSON
$rtn = "{ \"status\" : \"success\" , \"message\" : \"##message##\" }";



// Get DB connection
$con = getDBConnection();


checkdberror();




// Collect parameters from $_GET or $_POST
$userid = getParam("UserId"); //might be null if they never submitted form in sweepstakes
$initials = getParam("Initials");
$timescore = getParam("TimeScore");



// Check for errors
$errmsg = "";
//if ($userid == "") {
//	$errmsg .= "Missing UserId parameter; ";
//}
if ($initials == "") {
	$errmsg .= "Missing Initials parameter; ";
}
if ($timescore == "") {
	$errmsg .= "Missing TimeScore parameter; ";
}
if ($timescore < "00:31") {
	$errmsg .= "Unauthenticated score detected; ";
}

if ($errmsg != "") {
	$rtn = str_replace("##status##" , "error" , $rtn);
	$rtn = str_replace("##message##" , $errmsg , $rtn);

	echo $rtn;
	die('');
}






// Decode user into registrant_id and email

if($userid != ""){
  $decoded_user = decodeUser($userid);

  $email = $decoded_user[1];
  $dbid = $decoded_user[0];
}





// Insert score into database
	$query=
	 " INSERT INTO `HighScores` (
	 	`registrant_id`,
	 	`initials`,
	 	`time_store`
		)
	  VALUES
	  (? , ? , ? ) ";


	$stmt = $con->prepare($query);

	$stmt->bind_param('sss',
		$dbid ,
		$initials ,
		$timescore
	);

	$stmt->execute();








// Create JSON output and return
$rtn = str_replace("##status##" , "success" , $rtn);
$rtn = str_replace("##message##" , "" , $rtn);



echo $rtn;




?>
