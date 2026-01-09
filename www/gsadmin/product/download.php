<? 
$filename = explode("/",$file);
if(strstr($HTTP_USER_AGENT, "MSIE 5.5")) { 
header("Content-Type: doesn/matter"); 
header("Content-Disposition: filename=$filename[2]"); 
header("Content-Transfer-Encoding: binary"); 
header("Pragma: no-cache"); 
header("Expires: 0"); 
} 
else { 
Header("Content-type: file/unknown"); 
Header("Content-Disposition: attachment; filename=$filename[2]"); 
Header("Content-Description: PHP3 Generated Data"); 
header("Pragma: no-cache"); 
header("Expires: 0"); 
} 

if (is_file("$file")) { 
$fp = fopen("$file", "r"); 
if (!fpassthru($fp)) 
fclose($fp);



}
?> 

