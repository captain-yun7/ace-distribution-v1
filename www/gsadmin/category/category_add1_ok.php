<? $mod=menu03 ?>
<? $menu=3?>
<?
include("../header.php");

if($_POST[part1_code] ) {		
	// 카테고리 순위 설정
	$part1_row = $db->row("cs_part", "", "max(part_ranking)");
	if( $part1_row[0] ) { $part_ranking = $part1_row[0] +1; } else { $part_ranking = 1; }

	// 따음표 체크
	if($_POST[part_name]) { $_POST[part_name] = $db->addSlash ( $_POST[part_name] );}
	if($_POST[part1_code]) { $_POST[part1_code]= $db->addSlash ( $_POST[part1_code] );}
	if($_POST[title_html_code]) { $_POST[title_html_code] = $db->addSlash ( $_POST[title_html_code] );}

	// 카테고리 목록 출력 방식( TEXT = 0, IMAGES = 1, IMAGES ON OFF = 2 )
	if( $_POST[list_display_check] == 1 ) {
		if( $_FILES[list_display_images1][size] > 0 ) {
			if( !strstr($_FILES[list_display_images1][type], 'image') ) { $tools->errMsg("이미지 파일만 등록 가능합니다."); exit(); }
			if( $_FILES[list_display_images1][size] > 1024*1024*4) { $tools->errMsg("업로드 용량 초과입니다\\n\\n4메가 까지 업로드 가능합니다"); exit(); }
			$list_display_images1 = 'PART1_'.$_POST[part1_code];
			if( !@move_uploaded_file( $_FILES[list_display_images1][tmp_name], "../../data/designImages/".$list_display_images1 )) { $tools->errMsg("파일 업로드 에러"); } else { @unlink($_FILES[list_display_images1][tmp_name]); } 
			$list_display_images2 = "";
		} else {
			$tools->errMsg('등록할 이미지를 선택 하세요');
			exit();
		}
	}else if( $_POST[list_display_check] == 2 ) {
		if( $_FILES[list_display_images1][size] > 0 ) {
			if( !strstr($_FILES[list_display_images1][type], 'image') || !strstr($_FILES[list_display_images2][type], 'image') ) { $tools->errMsg("이미지 파일만 등록 가능합니다."); exit(); }
			if( $_FILES[list_display_images1][size] > 1024*1024*4) { $tools->errMsg("업로드 용량 초과입니다\\n\\n4메가 까지 업로드 가능합니다"); exit(); }
			$list_display_images1 = 'PART1_'.$_POST[part1_code];
			if( !@move_uploaded_file( $_FILES[list_display_images1][tmp_name], "../../data/designImages/".$list_display_images1 )) { $tools->errMsg("파일 업로드 에러"); } else { @unlink($_FILES[list_display_images1][tmp_name]); } 
		} else {
			$tools->errMsg('등록할 이미지를 선택 하세요');
			exit();
		}
		if( $_FILES[list_display_images2][size] > 0 ) {
			if( $_FILES[list_display_images2][size] > 1024*1024*4) { $tools->errMsg("업로드 용량 초과입니다\\n\\n4메가 까지 업로드 가능합니다"); exit(); }
			$list_display_images2 = 'PART2_'.$_POST[part1_code];
			if( !@move_uploaded_file( $_FILES[list_display_images2][tmp_name], "../../data/designImages/".$list_display_images2 )) { $tools->errMsg("파일 업로드 에러"); } else { @unlink($_FILES[list_display_images2][tmp_name]); } 
		} else {
			@unlink("../../data/designImages/".$list_display_images1);
			$tools->errMsg('등록할 이미지를 선택 하세요');
			exit();
		}
	} else if( $_POST[list_display_check] == 0 ) { $list_display_images1 = ""; $list_display_images2 = ""; }

	// 타이틀 출력 방식( 미출력 = 0, IMAGES = 1, HTML Code = 2 )
	if( $_POST[title_display_check] == 0 ) {
		$title_display_images = "";
		$_POST[title_html_code] = "";
	} else if( $_POST[title_display_check] == 1 ) {
		if( $_FILES[title_display_images][size] > 0 ) {
			if( !strstr($_FILES[title_display_images][type], 'image') ) { $tools->errMsg("이미지 파일만 등록 가능합니다."); exit(); }
			if( $_FILES[title_display_images][size] > 1024*1024*4) { $tools->errMsg("업로드 용량 초과입니다\\n\\n4메가 까지 업로드 가능합니다"); exit(); }
			$title_display_images = 'TITLE_'.$_POST[part1_code];
			if( !@move_uploaded_file( $_FILES[title_display_images][tmp_name], "../../data/designImages/".$title_display_images )) { $tools->errMsg("파일 업로드 에러"); } else { @unlink($_FILES[title_display_images][tmp_name]); } 
		}
		$_POST[title_html_code] = "";
	} else if( $_POST[title_display_check] == 2 ) {
		$title_display_images = "";
	}

	
	$_POST[title_html_code] = $tx_content;

	// 디비 입력
	$sql="part_name='$_POST[part_name]', part1_code='$_POST[part1_code]', part_index='$_POST[hidden_part_index]', part_ranking='$part_ranking', list_display_check='$_POST[list_display_check]', list_display_images1='$list_display_images1', list_display_images2='$list_display_images2', goods_cnt='$_POST[goods_cnt]', part_display_check='$_POST[part_display_check]',  part_low_check='$_POST[part_low_check]', part_display_item='$_POST[part_display_item]', title_display_check='$_POST[title_display_check]', title_display_images='$title_display_images', title_html_code='$_POST[title_html_code]'";



	if( $db->insert("cs_part", $sql) ) { 
		$tools->alertMetaGo("1차 카테고리 등록 되었습니다.", "category_list.php");
	} else { 
		@unlink("../../data/designImages/".$list_display_images1);
		@unlink("../../data/designImages/".$list_display_images2);
		@unlink("../../data/designImages/".$title_display_images);
		$tools->errMsg('비상적으로 입력 되었습니다.');}
} else {
	$tools->errMsg('경 고 !!!\n\n비정상적으로 접근했습니다.');
}
?>
