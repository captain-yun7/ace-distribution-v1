<? $mod=menu04 ?>
<? $menu=2?>
<?
include('../header.php');
$mv_data=$_POST[goods_data];
$goods_data=$tools->decode( $_POST[goods_data] );

if($_POST[code] ) {

	// 관리자 기본설정을 가져온다
//	$admin_row = $db->object("cs_admin", "", "point_basic");

	// 넘어온 상품 정보 쿼리
	$row=$db->object("cs_goods", "where idx='$goods_data[idx]'");

if($_POST[part_code]){
	$dh_1cha=$db->cnt("cs_part","where part1_code='$_POST[part_code]'");
	$dh_2cha=$db->cnt("cs_part","where part2_code='$_POST[part_code]'");
	$dh_3cha=$db->cnt("cs_part","where part3_code='$_POST[part_code]'");

	if($dh_1cha){//1차카테고리의 코드가 존재할경우.
		$dh=$db->object("cs_part","where part1_code='$_POST[part_code]'");
		$part_idx=$dh->idx;
	}else if($dh_2cha){//2차카테고리의 코드가 존재할경우.
		$dh=$db->object("cs_part","where part2_code='$_POST[part_code]'");
		$part_idx=$dh->idx;
	}else if($dh_3cha){//3차카테고리의 코드가 존재할경우.
		$dh=$db->object("cs_part","where part3_code='$_POST[part_code]'");
		$part_idx=$dh->idx;
	}
}else{
	$part_idx = $goods_data[part_idx];
}


	// 따음표 체크
	$_POST[name]				= $db->stripSlash ( $_POST[name] );
	//$_POST[company]			= $db->stripSlash ( $_POST[company] );
	if( $_POST[option_check] ==1) 	{ $_POST[option1_name]	= $db->stripSlash ( $_POST[option1_name] );}
	if( $_POST[option_check] ==2) 	{ $_POST[option1_name]	= $db->stripSlash ( $_POST[option1_name] ); $_POST[option2_name]	= $db->stripSlash ( $_POST[option2_name] );}

	$_POST[name]				= $db->addSlash ( $_POST[name] );
	//$_POST[company]			= $db->addSlash ( $_POST[company] );
	if( $_POST[option_check] ==1) 	{ $_POST[option1_name]	= $db->addSlash ( $_POST[option1_name] );}
	if( $_POST[option_check] ==2) 	{ $_POST[option1_name]	= $db->addSlash ( $_POST[option1_name] ); $_POST[option2_name]	= $db->addSlash ( $_POST[option2_name] );}
	//$_POST[content] = $tx_content;

	// 수량 체크
	if( !$_POST[number]) { $_POST[number]=0;}
	if( !$_POST[unlimit]) { $_POST[unlimit]=0;}

	// 포인트에 값이 없을 경우에는 관리자의 기본 포인트를 사용합니다.
	if( !$_POST[point] ) { $_POST[point]=$admin_row->point_basic; }

	// 중량 배송을 사용하지 않을 경우
	if( !$_POST[box] ) { $_POST[box]=0; }

	// 옵션 체크 ( 구분자 : && )
	if( $_POST[option_check] == 0 ) {						// 사용안함
		$_POST[hidden_option1_data] = "";
		$_POST[hidden_option2_data] = "";
	} else if( $_POST[option_check] == 1 ) {			// 하나 사용
		$_POST[hidden_option1_data]	= $db->addSlash ( $_POST[hidden_option1_data] );
		$_POST[hidden_option2_data] = "";
	} else if( $_POST[option_check] == 2 ) {			// 두개 사용
		$_POST[hidden_option1_data]	= $db->addSlash ( $_POST[hidden_option1_data] );
		$_POST[hidden_option2_data]	= $db->addSlash ( $_POST[hidden_option2_data] );
	}
$udate = date("YmdHis");
	// 상품 이미지 등록
	if( $_POST[images1_check] == 1 && $_POST[images2_check] == 1 ) {
		if( $_FILES[images1][size] > 0 ) {
			if( $_FILES[images1][size] > 1024*1024*4) { $tools->errMsg("업로드 용량 초과입니다\\n\\n4메가 까지 업로드 가능합니다"); exit(); }
			$images1name = explode(".",$images1_name);
			$images1 = 'GOODS1_'.$_POST[code].$udate.".".$images1name[1];
			if( !@move_uploaded_file( $_FILES[images1][tmp_name], "../../data/goodsImages/".$images1 )) { $tools->errMsg("파일 업로드 에러"); } else { @unlink($_FILES[images1][tmp_name]); }
		} else {
			$images1=$_POST[hidden_images1];
		}
		if( $_FILES[images2][size] > 0 ) {
			if( $_FILES[images2][size] > 1024*1024*4) { $tools->errMsg("업로드 용량 초과입니다\\n\\n4메가 까지 업로드 가능합니다"); exit(); }
			$images2name = explode(".",$images2_name);
			$images2 = 'GOODS2_'.$_POST[code].$udate.".".$images2name[1];
			if( !@move_uploaded_file( $_FILES[images2][tmp_name], "../../data/goodsImages/".$images2 )) { $tools->errMsg("파일 업로드 에러"); } else { @unlink($_FILES[images2][tmp_name]); }
		} else {
			$images2=$_POST[hidden_images2];
		}
	} else {
		$tools->errMsg("등록할 이미지를 선택 하세요");
		exit();
	}

	// 추가 상품 이미지 등록
	if( $_POST[add_images_check] ) {
		if( $_POST[add_images1_check]) {
			if( $_FILES[add_images1][size] > 0 ) {
				if( $_FILES[add_images1][size] > 1024*1024*4) { $tools->errMsg("업로드 용량 초과입니다\\n\\n4메가 까지 업로드 가능합니다"); exit(); }
				$add1 = explode(".",$add_images1_name);
				$add_images1 = 'ADD_GOODS1_'.$_POST[code].$udate.".".$add1[1];
				if( !@move_uploaded_file( $_FILES[add_images1][tmp_name], "../../data/goodsImages/".$add_images1 )) { $tools->errMsg("파일 업로드 에러"); } else { @unlink($_FILES[add_images1][tmp_name]); }
				@unlink("../../data/goodsImages/".$row->add_images1);
			} else {
				$add_images1=$_POST[hidden_add_images1];
			}
		} else {
			@unlink("../../data/goodsImages/".$row->add_images1);
			$add_images1="";
		}
		if( $_POST[add_images2_check]) {
			if( $_FILES[add_images2][size] > 0 ) {
				if( $_FILES[add_images2][size] > 1024*1024*4) { $tools->errMsg("업로드 용량 초과입니다\\n\\n4메가 까지 업로드 가능합니다"); exit(); }
				$add2 = explode(".",$add_images2_name);
				$add_images2 = 'ADD_GOODS2_'.$_POST[code].$udate.".".$add2[1];
				if( !@move_uploaded_file( $_FILES[add_images2][tmp_name], "../../data/goodsImages/".$add_images2 )) { @unlink("../../data/goodsImages/".$add_images1); $tools->errMsg("파일 업로드 에러"); } else { @unlink($_FILES[add_images2][tmp_name]); }
				@unlink("../../data/goodsImages/".$row->add_images2);
			} else {
				$add_images2=$_POST[hidden_add_images2];
			}
		} else {
			@unlink("../../data/goodsImages/".$row->add_images2);
			$add_images2="";
		}
		if( $_POST[add_images3_check]) {
			if( $_FILES[add_images3][size] > 0 ) {
				if( $_FILES[add_images3][size] > 1024*1024*4) { $tools->errMsg("업로드 용량 초과입니다\\n\\n4메가 까지 업로드 가능합니다"); exit(); }
				$add3 = explode(".",$add_images3_name);
				$add_images3 = 'ADD_GOODS3_'.$_POST[code].$udate.".".$add3[1];
				if( !@move_uploaded_file( $_FILES[add_images3][tmp_name], "../../data/goodsImages/".$add_images3 )) { @unlink("../../data/goodsImages/".$add_images1); @unlink("../../data/goodsImages/".$add_images2); $tools->errMsg("파일 업로드 에러"); } else { @unlink($_FILES[add_images3][tmp_name]); }
				@unlink("../../data/goodsImages/".$row->add_images3);
			} else {
				$add_images3=$_POST[hidden_add_images3];
			}
		} else {
			@unlink("../../data/goodsImages/".$row->add_images3);
			$add_images3="";
		}
		if( $_POST[add_images4_check]) {
			if( $_FILES[add_images4][size] > 0 ) {
				if( $_FILES[add_images4][size] > 1024*1024*4) { $tools->errMsg("업로드 용량 초과입니다\\n\\n4메가 까지 업로드 가능합니다"); exit(); }
				$add4 = explode(".",$add_images4_name);
				$add_images4 = 'ADD_GOODS4_'.$_POST[code].$udate.".".$add4[1];
				if( !@move_uploaded_file( $_FILES[add_images4][tmp_name], "../../data/goodsImages/".$add_images4 )) { @unlink("../../data/goodsImages/".$add_images1); @unlink("../../data/goodsImages/".$add_images2); @unlink("../../data/goodsImages/".$add_images3); $tools->errMsg("파일 업로드 에러"); } else { @unlink($_FILES[add_images4][tmp_name]); }
				@unlink("../../data/goodsImages/".$row->add_images4);
			} else {
				$add_images4=$_POST[hidden_add_images4];
			}
		} else {
			@unlink("../../data/goodsImages/".$row->add_images4);
			$add_images4="";
		}
		if( $_POST[add_images5_check]) {
			if( $_FILES[add_images5][size] > 0 ) {
				if( $_FILES[add_images5][size] > 1024*1024*4) { $tools->errMsg("업로드 용량 초과입니다\\n\\n4메가 까지 업로드 가능합니다"); exit(); }
				$add5 = explode(".",$add_images5_name);
				$add_images5 = 'ADD_GOODS5_'.$_POST[code].$udate.".".$add5[1];
				if( !@move_uploaded_file( $_FILES[add_images5][tmp_name], "../../data/goodsImages/".$add_images5 )) { @unlink("../../data/goodsImages/".$add_images1); @unlink("../../data/goodsImages/".$add_images2); @unlink("../../data/goodsImages/".$add_images3); @unlink("../../data/goodsImages/".$add_images4); $tools->errMsg("파일 업로드 에러"); } else { @unlink($_FILES[add_images5][tmp_name]); }
				@unlink("../../data/goodsImages/".$row->add_images5);
			} else {
				$add_images5=$_POST[hidden_add_images5];
			}
		} else {
			@unlink("../../data/goodsImages/".$row->add_images5);
			$add_images5="";
		}
	} else {
		$add_images1="";
		$add_images2="";
		$add_images3="";
		$add_images4="";
		$add_images5="";
		@unlink("../../data/goodsImages/".$row->add_images1);
		@unlink("../../data/goodsImages/".$row->add_images2);
		@unlink("../../data/goodsImages/".$row->add_images3);
		@unlink("../../data/goodsImages/".$row->add_images4);
		@unlink("../../data/goodsImages/".$row->add_images5);
	}

	// 상품 첨부파일
	if( $_POST[file_check] == 1 ) {
		if( $_FILES[goods_file][size] > 0 ) {
			$EXT_CHECK = array("php", "php3", "htm", "html", "cgi", "perl");	// 업로드 파일 제한 확장자 추가 가능
			if( !strstr( $_FILES[goods_file][name], ".")) { $tools->errMsg( strtoupper("확장자가 없는 ".$_FILES[goods_file][name])." 은 업로드 할수 없습니다." ); } else if( $EXT_TMP = explode( ".", $_FILES[goods_file][name])) { foreach ($EXT_CHECK as $value) { if( strstr( $value, strtolower($EXT_TMP[1]))) { $tools->errMsg( strtoupper($EXT_TMP[1])." 은 업로드 할수 없습니다." );}}}
			if( $_FILES[goods_file][size]  > 1024*1024*4) { $tools->errMsg("업로드 용량 초과입니다\\n\\n4메가 까지 업로드 가능합니다"); exit(); }
			$goods_file_name	= time()."&&".$_FILES[goods_file][name];
			if( !@move_uploaded_file($_FILES[goods_file][tmp_name], "../../data/goodsImages/".$goods_file_name) ) { $tools->errMsg("파일 업로드 에러"); } else { @unlink("../../data/goodsImages/".$row->goods_file); @unlink($_FILES[goods_file][tmp_name]);}
		} else {
			$goods_file_name=$_POST[hidden_goods_file];
		}
	} else {
		 $goods_file_name 	= "";
	}




// 파일업로드1-1
	if($simage2_del=="y"){
		$file = "none";
		$sfile_name = "";
	} else {
		if( $_FILES[file][size] > 0 ) {
			@unlink( "../../data/upload/".$product->file );
			$EXT_CHECK = array("php", "php3", "htm", "html", "cgi", "perl");	// 업로드 파일 제한 확장자 추가 가능
			if( $EXT_TMP = explode( ".", $_FILES[file][name])) {	 foreach ($EXT_CHECK as $value) { if( strstr( $value, strtolower($EXT_TMP[1]))) { $tools->errMsg( strtoupper($EXT_TMP[1])." 은 업로드 할수 없습니다." ); } }	}
			if( $_FILES[file][size]  > 1024*1024*20) { $tools->errMsg("업로드 용량 초과입니다\\n\\n20메가 까지 업로드 가능합니다"); exit(); }
			$file	= time().".".$EXT_TMP[1];
			$sfile_name = $_FILES[file][name];
			if( !@move_uploaded_file($_FILES[file][tmp_name], "../../data/upload/".$file) ) { $tools->errMsg("파일 업로드 에러"); } else { @unlink($_FILES[file][tmp_name]);	}
		} else {
			$file 	= $s_image2;
			$sfile_name 	= $sfileName;
		}
	}





//카달로그 파일 종료
	//$body = addslashes($_POST[Contents]);

$sql = "part_idx='$part_idx', display='$_POST[display]', code='$_POST[code]', name='$_POST[name]',company='$_POST[company]', youtong='$_POST[youtong]', bogan='$_POST[bogan]', boxip='$_POST[boxip]', old_price='$_POST[old_price]', shop_price='$_POST[shop_price]', unlimit='$_POST[unlimit]', number='$_POST[number]', point='$_POST[point]', box='$_POST[box]', option_check='$_POST[option_check]', option1_name='$_POST[option1_name]', option1_part='$_POST[hidden_option1_data]', option2_name='$_POST[option2_name]', option2_part='$_POST[hidden_option2_data]',images1='$images1', images2='$images2', add_images1='$add_images1', add_images2='$add_images2', add_images3='$add_images3', add_images4='$add_images4', add_images5='$add_images5', new_mark='$_POST[new_mark]', hit_mark='$_POST[hit_mark]', goods_file='$goods_file_name', tag='$_POST[tag]', content='$_POST[content]', register=now(), zzim='$_POST[zzim]' where idx=$goods_data[idx]";

	if( $db->update("cs_goods", $sql) ) { $tools->alertJavaGo("수정 하였습니다.","product_list.php?goods_data=$mv_data"); } else { $tools->errMsg('비상적으로 입력 되었습니다.');}

} else {
	$tools->errMsg('경 고 !!!\n\n비정상적으로 접근했습니다.');
}
?>
