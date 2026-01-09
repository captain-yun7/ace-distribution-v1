<? $mod=menu06 ?>
<? include('../header.php'); 
$_GET=&$HTTP_GET_VARS;
$_POST=&$HTTP_POST_VARS;

if( $_POST[page_index] ) {	
	$_POST[title] = $db->stripSlash ( $_POST[title] );
	//$_POST[content] = $db->stripSlash ( $_POST[content] );
	$_POST[title] = $db->addSlash ( $_POST[title] );
	//$_POST[content] = $db->addSlash ( $_POST[content] );
	// 디비 입력
	$_POST[content] = $tx_content;
	$sql="page_index='$_POST[page_index]', title='$_POST[title]', tag='$_POST[tag]', content='$_POST[content]' where idx='$_POST[idx]'";
	if( $db->update("cs_page", $sql)) { $tools->alertJavaGo('페이지가 수정 되었습니다.', 'page.php'); } else { $tools->errMsg('비상적으로 입력 되었습니다.');}
} else {
	$tools->errMsg('경 고 !!!\n\n비정상적으로 접근했습니다.');
}
?>
