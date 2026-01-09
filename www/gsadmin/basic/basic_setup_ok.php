<? $mod=menu01 ?>
<? $menu=1?>
<?include ("../header.php");?>
<?

	// 디비입력 쿼리
	$sql="admin_userid='$_POST[admin_userid]', admin_passwd='$_POST[admin_passwd]', shop_name='$_POST[shop_name]', shop_email='$_POST[shop_email]', shop_domain='$_POST[shop_domain]', shop_url='$_POST[shop_url]', spam_text='$_POST[spam_text]', title='$_POST[title]', meta_desc='$_POST[meta_desc]', meta_keyw='$_POST[meta_keyw]', link_cano='$_POST[link_cano]', meta_author='$_POST[meta_author]'";
	
	// 디비입력
	if( $db->cnt("cs_admin", "")) { if( $db->update("cs_admin", $sql) ) { $tools->alertJavaGo("저장 완료 되었습니다.", "basic_setup.php"); } else { $tools->errMsg('비상적으로 입력 되었습니다.'); }} 
	else { if( $db->insert("cs_admin", $sql) ) { $tools->alertJavaGo("저장 완료 되었습니다.", "basic_setup.php"); } else { $tools->errMsg('비상적으로 입력 되었습니다.'); }}
 //else {
	//$tools->errMsg('경 고 !!!\n\n비정상적으로 접근했습니다.');
//}
?>