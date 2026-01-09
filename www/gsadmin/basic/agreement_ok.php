<? $mod=menu01 ?>
<? $menu=2?>
<?
include('../header.php');
// 약관 정보 입력
if($_POST[tx_content]) {	

	$_POST[agreement_tag] = "0";
	$_POST[agreement] = $_POST['tx_content'];
	
	if( $db->cnt("cs_page", "where page_index='agreement'")) {If( $db->update("cs_page", "content='$_POST[agreement]', tag='$_POST[agreement_tag]' where page_index='agreement'")) { $tools->alertJavaGo("저장 완료 되었습니다.", "agreement.php"); } else { $tools->errMsg('비상적으로 입력 되었습니다.'); }} 
	else { if( $db->insert("cs_page",  "content='$_POST[agreement]', tag='$_POST[agreement_tag]', page_index='agreement'") ) { $tools->alertJavaGo("저장 완료 되었습니다.", "agreement.php"); } else { $tools->errMsg('비상적으로 입력 되었습니다.'); }}
} else {
	$tools->errMsg('경 고 !!!\n\n비정상적으로 접근했습니다.');
}
?>