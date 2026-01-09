<? $mod=menu01 ?>
<? $menu=3?>
<?
include('../header.php');
// 약관 정보 입력
if($_POST[tx_content]) {	

	$_POST[safeguard_tag] = "0";
	$_POST[safeguard] = $_POST['tx_content'];
	
	if( $db->cnt("cs_page", "where page_index='privacy'")) {If( $db->update("cs_page", "content='$_POST[safeguard]', tag='$_POST[safeguard_tag]' where page_index='privacy'")) { $tools->alertJavaGo("저장 완료 되었습니다.", "safeguard.php"); } else { $tools->errMsg('비상적으로 입력 되었습니다.'); }} 
	else { if( $db->insert("cs_page",  "content='$_POST[safeguard]', tag='$_POST[safeguard_tag]', page_index='privacy'") ) { $tools->alertJavaGo("저장 완료 되었습니다.", "safeguard.php"); } else { $tools->errMsg('비상적으로 입력 되었습니다.'); }}
} else {
	$tools->errMsg('경 고 !!!\n\n비정상적으로 접근했습니다.');
}
?>