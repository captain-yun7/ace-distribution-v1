<? $mod=menu09 ?>
<? $menu=1 ?>
<?
include("../header.php");
include($ROOT_DIR."/lib/page_class.php");
$_GET=&$HTTP_GET_VARS;
$_POST=&$HTTP_POST_VARS;
?>
<?

for($i=0;$i<count($check);$i++) {

	$query = "delete from cs_online where idx='$check[$i]'";
	mysql_query($query);
	
}	
	
	mysql_close();
	
	echo ("<meta http-equiv='Refresh' content='0; URL=online_list.php?start=$start&key=$key&keyfield=$keyfield'>");
	
?>