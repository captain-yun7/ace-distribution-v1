<? $mod=menu07 ?>
<? $menu = "02"; ?>
<? include('../header.php'); 
$_GET=&$HTTP_GET_VARS;
$_POST=&$HTTP_POST_VARS;
$_FILES=&$HTTP_POST_FILES;

if( $_POST[title] ) {	
	// 넘어온 상품 정보 쿼리
	$row=$db->object("cs_banner", "where idx='$_POST[idx]'");
	$_POST[title] = $db->stripSlash ( $_POST[title] );
	$_POST[title] = $db->addSlash ( $_POST[title] );
	if( $_POST[display] == 0 ) {
		$_POST[content] = $db->stripSlash ( $_POST[content] );
		$_POST[content] = $db->addSlash ( $_POST[content] );
		$_POST[link_url] = "";
		$_POST[banner_images] = "";
		@unlink("../../data/designImages/".$row->banner_images); $banner_images="";
	} else if( $_POST[display] == 1 ) {
		$_POST[content] = "";
		if( $_FILES[banner_images][size] > 0 ) {
			@unlink("../../data/designImages/".$row->banner_images); $banner_images="";
			if( !strstr($_FILES[banner_images][type], 'image')) { $tools->errMsg('이미지 파일만 등록 가능합니다.'); }
			if( $_FILES[banner_images][size] > 1024*1024*4) { $tools->errMsg('업로드 용량 초과입니다\\n\\n4메가 까지 업로드 가능합니다'); }
			$EXT_TMP = explode( ".", $_FILES[banner_images][name]);
			$banner_images = 'BANNER_'.time().".".$EXT_TMP[1];
			if( !@move_uploaded_file( $_FILES[banner_images][tmp_name], "../../data/designImages/".$banner_images )) { $tools->errMsg('파일 업로드 에러'); } else { @unlink($_FILES[banner_images][tmp_name]); } 
		} else {
			$banner_images=$row->banner_images;
		}
		$_POST[content] = "";
	}

	// 디비 입력
	$sql="display='$_POST[display]', status='$_POST[status]', title='$_POST[title]', link_url='$_POST[link_url]', target='$_POST[target]', banner_images='$banner_images', content='$_POST[content]' where idx=$_POST[idx]";
	if( $db->update("cs_banner", $sql) ) { $tools->alertJavaGo('베너 수정 되었습니다.', 'banner.php'); } else { @unlink("../../data/designImages/".$banner_images); $tools->errMsg('비상적으로 입력 되었습니다.');}
} else {
	$tools->errMsg('경 고 !!!\n\n비정상적으로 접근했습니다.');
}
?>
