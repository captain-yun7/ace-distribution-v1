<? $mod=menu04 ?>
<? $menu=3?>
<?
include('../header.php');

if( $_POST[part1_code] && $_POST[part2_code]  && $_POST[part3_code] ) {	
	
	// 카테고리 순위 설정
	$part3_row = $db->row("cs_part", "where part_index = '$_POST[hidden_part_index]'", "max(part_ranking)");
	if( $part3_row[0] ) {	$part_ranking = $part3_row[0] +1; } else { $part_ranking = 1; }

	// 따음표 체크
	if($_POST[part_name]) { $_POST[part_name] = $db->addSlash ( $_POST[part_name] );}
	if($_POST[part1_code]) { $_POST[part1_code]= $db->addSlash ( $_POST[part1_code] );}
	if($_POST[part2_code]) { $_POST[part2_code]= $db->addSlash ( $_POST[part2_code] );}
	if($_POST[part3_code]) { $_POST[part3_code]= $db->addSlash ( $_POST[part3_code] );}
	if($_POST[title_html_code]) { $_POST[title_html_code] = $db->addSlash ( $_POST[title_html_code] );}

	// 타이틀 출력 방식( 미출력 = 0, IMAGES = 1, HTML Code = 2 )
	if( $_POST[title_display_check] == 1 ) {
		if( $_FILES[title_display_images][size] > 0 ) {
			if( !strstr($_FILES[title_display_images][type], 'image') ) { $tools->errMsg("이미지 파일만 등록 가능합니다."); exit(); }
			if( $_FILES[title_display_images][size] > 1024*1024*4) { $tools->errMsg("업로드 용량 초과입니다\\n\\n4메가 까지 업로드 가능합니다"); exit(); }
			$title_display_images = 'TITLE_'.$_POST[part3_code];
			if( !@move_uploaded_file( $_FILES[title_display_images][tmp_name], "../../data/designImages/".$title_display_images )) { $tools->errMsg("파일 업로드 에러"); } else { @unlink($_FILES[title_display_images][tmp_name]); } 
		} else {
			$tools->errMsg("이미지를 등록해 주세요");
		}
	}

	$_POST[title_html_code] = $tx_content;

	// 디비 입력
	$sql="part_name='$_POST[part_name]', part1_code='$_POST[part1_code]', part2_code='$_POST[part2_code]', part3_code='$_POST[part3_code]', part_index='$_POST[hidden_part_index]', part_ranking='$part_ranking', goods_cnt='$_POST[goods_cnt]', part_display_check='$_POST[part_display_check]', part_display_item='$_POST[part_display_item]', title_display_check='$_POST[title_display_check]', title_display_images='$title_display_images', title_html_code='$_POST[title_html_code]'";
	if( $db->insert("cs_part", $sql) ) { $tools->alertMetaGo("3차 카테고리 등록 되었습니다.", "category_list.php"); } else { @unlink("../../data/designImages/".$list_display_images1); @unlink("../../data/designImages/".$list_display_images2);  @unlink("../../data/designImages/".$title_display_images); $tools->errMsg('비상적으로 입력 되었습니다.');}
} else {
	$tools->errMsg('경 고 !!!\n\n비정상적으로 접근했습니다.');
}
?>
