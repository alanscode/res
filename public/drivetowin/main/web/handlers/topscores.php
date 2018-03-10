<?php

include("include.php");



//order top 5 scores in array 
//return what the player ranked based on timescore
//$rtn = "{ \"status\" : \"OK\", \"topscores\" : [ \"1:25\":\"CRV\", \"2:24\":\"HRV\", \"3:22\":\"RPA\", \"4:33\":\"CCC\", \"5:44\":\"DDD\" ], \"ranked\": 320, \"timescore\": \"" . $timescore ."\" }";


// Create return JSON
$rtn = "{ \"status\" : \"##status##\", \"message\" : \"##message##\" , \"topscores\" : [ ##topscores## ], \"ranked\": ##ranked##, \"timescore\": \"##timescore##\" }";



// Get DB connection
$con = getDBConnection();


checkdberror();




// Collect parameters from $_GET or $_POST
$timescore = getParam("TimeScore");



// Check for errors
$errmsg = "";
if ($timescore == "") {
	$errmsg .= "Missing TimeScore parameter; ";
}
if ($errmsg != "") {
	$rtn = str_replace("##status##" , "error" , $rtn);
	$rtn = str_replace("##message##" , $errmsg , $rtn);
	
	echo $rtn;
	die('');
}





// Get all scores from database
$query=
 " SELECT * FROM HighScores ORDER BY time_store ASC ";


$stmt = $con->prepare($query);

$stmt->execute();

$stmt->store_result();



$results = getArrayFromDBResult($stmt);



$stmt->close();







// Get user's place on the high score list
// This won't scale very well; It might make more sense to change it to a binary search or something
$count = 0;
$ranked = "";
foreach ($results as $value) {
	if ($value["time_store"] > $timescore) {
		$ranked = $count+1;
		break;
	}
	$count++;
}
if ($ranked == "") {
	$ranked = count($results) + 1;
}





// Return top 5 high scores
// If user ranked in the top 5, only return 4 since they're one of them
$num_to_return = 5;

if ($ranked < 6) {
	$num_to_return = 4;
}

$highscore_string = "";
$count = 0;
foreach ($results as $value) {
	$highscore_string .= ",{ \"score\": \"" . $value["time_store"] . "\" , \"initial\": \"" . $value["initials"] . "\" }";
	$count++;
	if ($count > ($num_to_return - 1)) {
		break;
	}
}
$highscore_string = substr($highscore_string , 1);










// Create JSON output and return
$rtn = str_replace("##status##" , "success" , $rtn);
$rtn = str_replace("##message##" , "" , $rtn);
$rtn = str_replace("##topscores##" , $highscore_string , $rtn);
$rtn = str_replace("##timescore##" , $timescore , $rtn);
$rtn = str_replace("##ranked##" , $ranked , $rtn);



echo $rtn;




?>
