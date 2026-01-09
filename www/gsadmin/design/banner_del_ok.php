<? $mod=menu07 ?>
<? $menu = "02"; ?>
<? include('../header.php'); 

if($_GET[idx]) {
	// 넘어온 idx 로 삭제 레코드를 검색한다.
	$row = $db->object("cs_banner", "where idx=$_GET[idx]");
	// 파일 삭제
	if( $row->banner_images) { @unlink("../../data/designImages/".$row->banner_images); }
	if( $db->delete("cs_banner", "where idx=$_GET[idx]") ) { $tools->javaGo("banner.php"); }
} else {
	$tools->errMsg('경 고 !!!\n\n비정상적으로 접근했습니다.');
}
?>
