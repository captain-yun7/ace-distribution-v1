<?
include('../../common.php'); 


// 파일 다운로드
if( $_GET[download] ) {
	$row	= $db->object( "cs_online", "where idx=$idx", "file" );
	$row->file = iconv("UTF-8", "EUC-KR", $row->file); //파일명이 한글인경우 변환
	$file = $row->file;
	$file_dir = "../../data/bbsData";
    $ftype = "application/octet-stream";
	if(eregi("(MSIE 5.0|MSIE 5.1|MSIE 5.5|MSIE 6.0)", $HTTP_USER_AGENT)){ 
		Header("Content-type: $ftype"); 
		Header("Content-Length: ".filesize("$file_dir/$row->file"));     
		Header("Content-Disposition: attachment;  filename=$file");   
		Header("Content-Transfer-Encoding: binary");   
		Header("Pragma: no-cache");   
		Header("Expires: 0");   
	} else { 
		Header("Content-type: file/unknown");     
		Header("Content-Length: ".filesize("$file_dir/$row->file"));     
		Header("Content-Disposition: attachment;  filename=$file");   
		Header("Content-Description: PHP3 Generated Data"); 
		Header("Pragma: no-cache"); 
		Header("Expires: 0"); 
	}
	if ($fp = fopen("$file_dir/$row->file", "rb")) { 
		if (!fpassthru($fp)) fclose($fp); 
		exit(); 
	}
} else {
	$tools->errMsg('경 고 !!!\n\n비정상적으로 접근했습니다.');
}
?>

<!-- 기존 다운로드
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
-->
