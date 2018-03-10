<?php

include("include.php");


// Create return JSON
$rtn = "{ \"status\" : \"##status##\" , \"userid\" : \"##userid##\" , \"message\" : \"##message##\" , \"registeredtoday\" : \"##registeredtoday##\" , \"bonusentry\" : \"##bonusentry##\" , \"identifier\" : \"" . getServerIP() . "\" }";


// Get DB connection
$con = getDBConnection();


checkdberror();





// Collect parameters from $_GET or $_POST
$firstname = getParam("FirstName");
$lastname = getParam("LastName");
$email = getParam("Email");
$phone = getParam("HomePhone");
$address1 = getParam("Address1");
$address2 = getParam("Address2");
$city = getParam("City");
$state = getParam("State");
$zip = getParam("Zip");
$optin = getParam("Optin");



// Check for errors
$errmsg = "";
if ($firstname == "") {
	$errmsg .= "Missing FirstName parameter; ";
}
if ($lastname == "") {
	$errmsg .= "Missing LastName parameter; ";
}
if ($email == "") {
	$errmsg .= "Missing Email parameter; ";
}
if ($phone == "") {
	$errmsg .= "Missing Phone parameter; ";
}
if ($address1 == "") {
	$errmsg .= "Missing Address1 parameter; ";
}
if ($city == "") {
	$errmsg .= "Missing City parameter; ";
}
if ($state == "") {
	$errmsg .= "Missing State parameter; ";
}
if ($zip == "") {
	$errmsg .= "Missing ZIP parameter; ";
}
if ($optin == "") {
	$errmsg .= "Missing Optin parameter; ";
}
if ($errmsg != "") {
	$rtn = str_replace("##status##" , "error" , $rtn);
	$rtn = str_replace("##message##" , $errmsg , $rtn);
	
	echo $rtn;
	die('');
}




// See if this user (based on email address) has already signed up within the past 24 hours
$query=
 " SELECT * FROM `Registrants`  WHERE email = ? AND creation_date > DATE_SUB(NOW(), INTERVAL 24 HOUR)  LIMIT 1 ";

$stmt = $con->prepare($query);

$stmt->bind_param('s',
        $email
);


$stmt->execute();

$stmt->store_result();

$rows = $stmt->affected_rows;



// If there was data returned, this means that the user has registered in the last 24 hours
if ($rows > 0) {

	//
	// User has registered in the last 24 hours
	//

	$registered_today = "true";


	// Check to see if the user has received a bonus entry today



	// Convert db result into Array
	$results = getArrayFromDBResult($stmt);


	// Get registrant_id and bonus_entry result
	$registrant_id = $results[0]["id"];
	$bonus_entry = $results[0]["bonus_sweepstakes_entry"];
	


} else {

	//
	// User has NOT registered in the last 24 hours
	//

	$registered_today = "false";
	$bonus_entry = "false";

	$stmt->free_result();



	// Insert user into database
	$query=
	 " INSERT INTO `Registrants` (
	 	`firstname`, 
	 	`lastname`, 
	 	`email`, 
	 	`phone`,
	 	`address1`, 
	 	`address2`, 
	 	`state`, 
	 	`zip`, 
	 	`city`,
	 	`optin`,
	 	`sweepstakes_entry`,
	 	`bonus_sweepstakes_entry`,
	 	`charity_entry`
		)
	  VALUES 
	  (? , ? , ? , ? , ? , ? , ? , ? , ? , ? , 'true' , 'false' , 'true' ) ";


	$stmt = $con->prepare($query);

	$stmt->bind_param('ssssssssss', 
		$firstname , 
		$lastname , 
		$email , 
		$phone,
		$address1 ,
		$address2 ,
		$state , 
		$zip ,
		$city , 
		$optin 
	);

	$stmt->execute();


	// Get user's registrant_id
	$registrant_id = $stmt->insert_id;



}


$stmt->close();
    

















// Encode user for cookie
$encoded_user = encodeUser( $registrant_id , $email );




// Create JSON output and return
$rtn = str_replace("##status##" , "success" , $rtn);
$rtn = str_replace("##message##" , "" , $rtn);
$rtn = str_replace("##userid##" , $encoded_user , $rtn);
$rtn = str_replace("##registeredtoday##" , $registered_today , $rtn);
$rtn = str_replace("##bonusentry##" , $bonus_entry , $rtn);


echo $rtn;




?>
