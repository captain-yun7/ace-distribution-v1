<?php
##-------------------------------------------------------------------##
##                           파일명 및 설명
##-------------------------------------------------------------------##
##  파일이름 : function.php
##  파일설명 : 사용자 정의 함수
##-------------------------------------------------------------------##

#--------------------------------------------------------------------##
##	데이터베이스 연결함수
#--------------------------------------------------------------------##
$DB_Connect= mysql_connect("$Host","$DBUser","$DBUser_Pass") || die("데이터베이스 연결 실패");
$Result = mysql_select_db("$Database");
if(!$Result){
   echo "데이터 베이스 연결 에러입니다.";
   exit;
}

#--------------------------------------------------------------------##
##	메세지를 보내고 url 로 페이지 이동 (메타태그로)
#--------------------------------------------------------------------##
function metaGo($url,$message){
	global $PHP_SELF,$HTTP_REFERER;
    if ($message) {
        echo"
			<script language='javascript'>
			window.alert('$message');
			</script>
		";
    }
	echo"<meta http-equiv='refresh' content='0; URL=$url'>";
	exit;
} // end func

#--------------------------------------------------------------------##
##	메세지를 보내고 뒤로 이동
#--------------------------------------------------------------------##
function goBack($message,$where='-1'){
	echo"
		<script language='javascript'>
		window.alert('$message');
		history.go($where);
		</script>
	";
	exit;
} // end func

#--------------------------------------------------------------------##
##	메세지를 보내고 현재창 닫기
#--------------------------------------------------------------------##
function closeWin($message){
	echo"
		<script language='javascript'>
		window.alert('$message');
		window.close(self);
		</script>
	";
	exit;
} // end func

#--------------------------------------------------------------------##
##	현재창 바로닫기
#--------------------------------------------------------------------##
function closeWin2(){
	echo"
		<script language='javascript'>
		window.close(self);
		</script>
	";
	exit;
} // end func

#--------------------------------------------------------------------##
##	부모창에 URL 을 보내고 메세지를 띄운후 현재창 닫기
#--------------------------------------------------------------------##
function goNclose($message,$URL){
	global $PHP_SELF,$HTTP_REFERER;
	echo"
		<script language='javascript'>
		opener.location.href='$URL';
		window.alert('$message');
		window.close(self);
		</script>
	";
	exit;
} // end func

#--------------------------------------------------------------------##
##	메일보내기
#--------------------------------------------------------------------##
function mailing($Mail_Name,$Mail_From,$Mail_To,$Mail_Subject,$Mail_Contents){
	$Mail_Header = "from:$Mail_Name<$Mail_From>\nreply-to:$Mail_Name<$Mail_From>\n";
	$Mail_Header .= "Content-Type: text/html;charset=EUC-KR";
	@mail($Mail_To,$Mail_Subject,$Mail_Contents,$Mail_Header);
} // end func

#--------------------------------------------------------------------##
##	특수문자가 포함될경우 슬래쉬 첨가
#--------------------------------------------------------------------##
function addSlash($str){
    $str=trim($str);
	$str=addslashes($str);
	return trim($str);
} // end func

#--------------------------------------------------------------------##
##	슬래쉬 삭제
#--------------------------------------------------------------------##	
function stripSlash($str){
	$str=stripslashes($str);
	return trim($str);
} // end func

#--------------------------------------------------------------------##
##	글자수가 지정 이상일경우 글자 자르기
#--------------------------------------------------------------------##	

function subject_cut( $String, $Length, $EndMark='..' ){
if( strlen( $String ) <= $Length ) return $String;
for( $i=0; $i<strlen( $String ); $i++ ){
if( ord( substr( $String, $i-1, $i ) ) > 128 ) {
$i++;
$Length++;
}
if( $i >= $Length )
return substr( $String, 0, $Length ).$EndMark; 
}
return $String;
}
function text_cut( $String, $Length, $EndMark='..' ){
if( strlen( $String ) <= $Length ) return $String;
for( $i=0; $i<strlen( $String ); $i++ ){
if( ord( substr( $String, $i-1, $i ) ) > 128 ) {
$i++;
$Length++;
}
if( $i >= $Length )
return substr( $String, 0, $Length ).$EndMark; 
}
return $String;
}
#--------------------------------------------------------------------##
##	공지사항 불러오기
#--------------------------------------------------------------------##
function notice_listing($limit,$text_limit=25){
	global 	$Host,$DBUser,$DBUser_Pass,$Database,$Notice_Table;
	$DB_Connect= mysql_connect("$Host","$DBUser","$DBUser_Pass") || die("데이터베이스 연결에 실패하였습니다.");
	$list_que = "select * from $Notice_Table order by wdate DESC limit $limit";
	$result_list=mysql_db_query($Database,$list_que);
	$total=mysql_affected_rows();

	if ($total<$limit){
		$loop_count = $total;
	}else{
		$loop_count = $limit;
	}

	for($i=0; $i<$loop_count; $i++){		
		$row_list = mysql_fetch_array($result_list);
		$subject = $row_list[subject];
		$subject = stripslashes($subject);
		$subject=subject_cut($subject,$text_limit);
		$wdate = date("Y/m/d",$row_list[wdate]);
		$wdate = date("m.d",$row_list[wdate]);

		echo"<tr>
		<td> <font color='silver'>[$wdate] - </font>
		<a href=\"javascript:Notice_View('$row_list[no]')\"> $subject </a>
		</td>
		</tr>";

	}
} // end func

#--------------------------------------------------------------------##
##	최근 게시물 불러오기
#--------------------------------------------------------------------##	
function board_listing($board_dir,$boardid,$limit,$return_type,$text_limit=25,$td_type1,$td_type2='<td>'){
	global 	$Host,$DBUser,$DBUser_Pass,$Database;
	$DB_Connect= mysql_connect("$Host","$DBUser","$DBUser_Pass") || die("데이터베이스 연결에 실패하였습니다.");
	$list_que = "select * from $boardid where idx='1' order by main limit $limit";
	$result_list=mysql_db_query($Database,$list_que);
	$total=mysql_affected_rows();

	if ($total<$limit){
		$loop_count = $total;
	}else{
		$loop_count = $limit;
	}

	for($i=0; $i<$loop_count; $i++){		
			$row_list = mysql_fetch_array($result_list);
			$subject = $row_list[subject];
			$subject = stripslashes($subject);
			$subject=subject_cut($subject,$text_limit);
			$wdate = date("Y.m.d",$row_list[wdate]);
			$depth = $row_list[depth];

			$board_que = "select newmark from  mshop3_board_info where boardid = '$boardid'";
			$result_board = mysql_query($board_que);
			$Board_Info_row = mysql_fetch_array($result_board);

			if(($Board_Info_row[newmark]*86400+$row_list[wdate])>mktime()){
				$new_img="<img src=/images/main_qa_title_new.gif align=absmiddle>";
			}else{
				$new_img='';
			}
			$kk = $total - $i;

			if($return_type==1){
					echo"<tr style=\"padding-top:5;\">
															<td><img src=\"/images/main_qa_title_icon.gif\" width=\"7\" height=\"7\" border=\"0\" align=\"absmiddle\"><a href=\"$board_dir/index.php?boardid=$boardid&mode=view&no=$row_list[no]\" OnFocus=\"this.blur()\">$subject</a>$new_img</td>
															<td><img src=\"/image/blank.gif\" width=\"1\" height=\"1\" border=\"0\" align=\"absmiddle\">[$wdate]</td>
														</tr>";
			}elseif($return_type==2){
				if($i%2==1){
					echo"<tr>
					$td_type1 [$wdate]
					<a href='$board_dir/index.php?boardid=$boardid&mode=view&no=$row_list[no]'><font color='#000000'>$subject</font></a>
					</td>
					</tr>";
				}else{
					echo"<tr>
					$td_type2 [$wdate]
					<a href='$board_dir/index.php?boardid=$boardid&mode=view&no=$row_list[no]'><font color='#000000'>$subject</font></a>
					</td>
					</tr>";
				}
			}elseif($return_type==6){
					echo"<tr><td height=22 width=6%><img src=../_images/main_commu_icon.gif width=24 height=8></td><td>";
					if($depth){
						echo"<b>re</b>: ";
					}
					echo"
					<a href='$board_dir/index.php?boardid=$boardid&mode=view&no=$row_list[no]'>$subject</a>
					</td>
					</tr>
					";
			}elseif($return_type==5){
				if($i%2==1){
					echo"<tr>
					$td_type1
					";
					if($depth){
						echo"<b>re</b>: ";
					}
					echo"
					<a href='$board_dir/index.php?boardid=$boardid&mode=view&no=$row_list[no]'><font color='#FFFFFF'>$subject</font></a>
					</td>
					</tr>
					";
				}else{
					echo"<tr>
					$td_type2
					";
					if($depth){
						echo"<b>re</b>: ";
					}
					echo"
					<a href='$board_dir/index.php?boardid=$boardid&mode=view&no=$row_list[no]'><font color='#FFFFFF'>$subject</font></a>
					</td>
					</tr>
					";
				}
			}				
	}
} // end func
#--------------------------------------------------------------------##
##	카트에 넣기
#--------------------------------------------------------------------##
$cart_time = mktime();
function cart_add($good_no,$type,$quantity,$option_no,$option_a,$option_b){
	global $Cart_Table,$Session_ID,$cart_time;
	$select_que = "select count(No) from $Cart_Table where (Session_ID='$Session_ID' and No ='$good_no') and (Option_A='$option_a' and Option_B='$option_b') and Option_No='$option_no'";
	$result_select = mysql_query($select_que);
	$total = @mysql_result($result_select,0,0);

	if($total<1){//기존에 담겨진것이 없으면 인서트
		$que = "insert into $Cart_Table values(
			'$Session_ID',
			'$good_no',
			'$type',
			'$quantity',
			'$option_no',
			'$option_a',
			'$option_b',
			'$cart_time'
		)";
		$result = mysql_query($que);
	}else{//기존에 담겨진 것이 있다면 모디파이
		$que = "update $Cart_Table set		
			Quantity=Quantity+'$quantity'
			where (Session_ID='$Session_ID' and No ='$good_no') and (Option_A='$option_a' and Option_B='$option_b') and Option_No='$option_no'
		";
		$result = mysql_query($que);
	}
}
#--------------------------------------------------------------------##
##	카트에서 수정
#--------------------------------------------------------------------##
function cart_edit($good_no,$quantity,$option_no,$option_a,$option_b){
	global $Cart_Table,$Session_ID,$cart_time;
	$que = "update $Cart_Table set		
		Quantity='$quantity',
		Option_A='$option_a',
		Option_B='$option_b',
		Date='$cart_time'
		where (Session_ID='$Session_ID' and No ='$good_no') and (Option_A='$option_a' and Option_B='$option_b') and Option_No='$option_no'
	";
	$result = mysql_query($que);
}
#--------------------------------------------------------------------##
##	카트에서 삭제
#--------------------------------------------------------------------##
function cart_delete($good_no,$option_no,$option_a,$option_b){
	global $Cart_Table,$Session_ID,$cart_time;
	$que = "delete from $Cart_Table 
		where (Session_ID='$Session_ID' and No ='$good_no') and (Option_A='$option_a' and Option_B='$option_b') and Option_No='$option_no'";
	$result = mysql_query($que);
}

#--------------------------------------------------------------------##
##	은행 계좌 관련 함수
#--------------------------------------------------------------------##
// 은행 리스트를 셀렉트 폼으로
function bank_list(){
	global $Bank_Table;
	$que = "select * from $Bank_Table";
	$result = mysql_query($que);
	$total = mysql_affected_rows();
	for($i=0;$i<$total;$i++){
		$row = mysql_fetch_array($result);
		echo "<option value='$row[No]'>$row[Bank] : $row[Account] : $row[Name]</option>\n";
	}
}

// 어떤 은행인지 찾기
function what_bank($No){
	global $Bank_Table;
	$que = "select * from $Bank_Table where No='$No'";
	$result = mysql_query($que);
	$row = mysql_fetch_array($result);
	return array ($row[Bank],$row[Account],$row[Name]);
}

#--------------------------------------------------------------------##
##	벤더 관련 함수
#--------------------------------------------------------------------##
// 벤더 리스트를 셀렉트 폼으로
function vendor_list(){
	global $Vendor_Table;
	$que = "select * from $Vendor_Table";
	$result = mysql_query($que);
	$total = mysql_affected_rows();
	for($i=0;$i<$total;$i++){
		$row = mysql_fetch_array($result);
		echo "<option value='$row[No]'>$row[Name]</option>\n";
	}
}

// 어떤 벤더인지 찾기
function what_vendor($No){
	global $Vendor_Table;
	$que = "select * from $Vendor_Table where No='$No'";
	$result = mysql_query($que);
	$row = mysql_fetch_array($result);
	return array ($row[No],$row[Name]);
}
#--------------------------------------------------------------------##
##	브랜드 관련 함수
#--------------------------------------------------------------------##
// 벤더 리스트를 셀렉트 폼으로
function brand_list(){
	global $brand_Table;
	$que = "select * from $brand_Table";
	$result = mysql_query($que);
	$total = mysql_affected_rows();
	for($i=0;$i<$total;$i++){
		$row = mysql_fetch_array($result);
		echo "<option value='$row[No]'>$row[Name]</option>\n";
	}
}

// 어떤 벤더인지 찾기
function what_brand($No){
	global $brand_Table;
	$que = "select * from $brand_Table where No='$No'";
	$result = mysql_query($que);
	$row = mysql_fetch_array($result);
	return array ($row[No],$row[Name]);
}
#--------------------------------------------------------------------##
##	마데 관련 함수
#--------------------------------------------------------------------##
// 벤더 리스트를 셀렉트 폼으로
function made_list(){
	global $made_Table;
	$que = "select * from $made_Table";
	$result = mysql_query($que);
	$total = mysql_affected_rows();
	for($i=0;$i<$total;$i++){
		$row = mysql_fetch_array($result);
		echo "<option value='$row[No]'>$row[Name]</option>\n";
	}
}

// 어떤 벤더인지 찾기
function what_made($No){
	global $made_Table;
	$que = "select * from $made_Table where No='$No'";
	$result = mysql_query($que);
	$row = mysql_fetch_array($result);
	return array ($row[No],$row[Name]);
}
#--------------------------------------------------------------------##
##	이벤트 팝업 함수
#--------------------------------------------------------------------##
/*
function popup_window(){
	global $Event_Table;
	$que = "select * from $Event_Table where showit='y' order by no DESC limit 1";
	$result = mysql_query($que);
	$total = mysql_affected_rows();
    $row = mysql_fetch_array($result);
		if($total>0){
			echo "
			<script language=\"JavaScript\" type=\"text/JavaScript\">
			<!--
			function openBrWindow(theURL,winName,features) { //v2.0
			  var getCookie = document.cookie;
			  if ( getCookie.indexOf('popup') < 0 ) {
				  window.open(theURL,winName,features);
			  }
			}
			//-->
			</script>
			<body onload=\" openBrWindow('./event_window.php?no=$row[no]','','width=10, height=10, scrollbars=auto');\"></body>
			";
		}
}
*/

function popup_window(){
	global $Event_Table;
	$que = "select * from $Event_Table where showit='y' order by no DESC";
	$result = mysql_query($que);
	$total = mysql_affected_rows();
    
	for($e=1; $e<=$total; $e++){
		$row = mysql_fetch_array($result);
		if($total>0){
			echo "
			<script language=\"JavaScript\" type=\"text/JavaScript\">
			<!--
			function openBrWindow(theURL,winName,features) { //v2.0
			  var getCookie = document.cookie;
			  if ( getCookie.indexOf('popup$e') < 0 ) {
				  window.open(theURL,winName,features);
			  }
			}
			//-->
			</script>
			<img src=../images/ghost.gif width=0 height=0 onload=\" openBrWindow('./event_window.php?no=$row[no]&etype=$e','','width=10, height=10, scrollbars=yes');\">
			";
		}
	}
}

#--------------------------------------------------------------------##
##	관리자 모드 환경설정 변경 함수
#--------------------------------------------------------------------##
function write_config ($t_Path,$t_Product_Dir,$t_Shop_Main_URL,$t_Site_Name,$t_Admin_Email,$t_Board_Path,$t_up_dir_name,$t_Pay_Agent,$t_Pay_Agent_ID,$t_Pay_Agent_Pass,$t_Card_Redirect,$t_Sub_Good_Division,$t_Default_Mileage,$t_Free_Shipping_Price,$t_Send_Mail_Term){
	global $Path;
	$source_config = $Path . '/lib/_source_config.php';
	$tmp_config = $Path . '/lib/_tmp_config.php';
	$config_file = $Path . '/lib/config.php';
	$fp=fopen($source_config,"r");
	$fs=filesize($source_config);
	//변환
	$str_tmp=fread($fp,$fs);
	$str = str_replace('{Path}',$t_Path,$str_tmp);
	$str = str_replace('{Product_Dir}',$t_Product_Dir,$str);
	$str = str_replace('{Shop_Main_URL}',$t_Shop_Main_URL,$str);
	$str = str_replace('{Site_Name}',$t_Site_Name,$str);
	$str = str_replace('{Admin_Email}',$t_Admin_Email,$str);
	$str = str_replace('{Board_Path}',$t_Board_Path,$str);
	$str = str_replace('{up_dir_name}',$t_up_dir_name,$str);
	$str = str_replace('{Pay_Agent}',$t_Pay_Agent,$str);
	$str = str_replace('{Pay_Agent_ID}',$t_Pay_Agent_ID,$str);
	$str = str_replace('{Pay_Agent_Pass}',$t_Pay_Agent_Pass,$str);
	$str = str_replace('{Card_Redirect}',$t_Card_Redirect,$str);
	$str = str_replace('{Sub_Good_Division}',$t_Sub_Good_Division,$str);
	$str = str_replace('{Default_Mileage}',$t_Default_Mileage,$str);
	$str = str_replace('{Free_Shipping_Price}',$t_Free_Shipping_Price,$str);
	$str = str_replace('{Send_Mail_Term}',$t_Send_Mail_Term,$str);
	fclose($fp);
	// 쓰기
	if(file_exists($tmp_config))
	{
		$fp=fopen($tmp_config,"r");
		$filename_write=fread($fp,1000);
		fclose($fp);
	}	
	$filename_write=$str;
	$fp=fopen($tmp_config,"w");
	fwrite($fp,$filename_write);
	fclose($fp);

	`rm -f $config_file`;
	`cp $tmp_config $config_file`;

	`chmod 707 $config_file`; // 보드아이디_tmp 퍼미션변경
}
#--------------------------------------------------------------------##
##	위시리스트 관련 함수
#--------------------------------------------------------------------##
// 1. 위시리스트에 담기
function add_wish($Good_Code,$Sesion_ID){
	global $Shop_Main_URL,$Good,$Wish_List_Table;
	$now_time = mktime();
	$select_que = "select Name,Vendor from $Good where Code='$Good_Code'";
	$result_que = mysql_query($select_que);
	$select_row = mysql_fetch_array($result_que);

	$select_dup_que = "select count(Good_Code) from $Wish_List_Table where Wish_ID='$Sesion_ID' and Good_Code='$Good_Code'";
	$result_dup = mysql_query($select_dup_que);
	@$count_dup = mysql_result($result_dup,0,0);

	if(!$count_dup){
		$que = "insert into $Wish_List_Table values(
			'$Good_Code',
			'$select_row[Name]',
			'$select_row[Vendor]',
			'$Sesion_ID',
			'$now_time'
		)";
		$result = mysql_query($que);
		if($result){		
			@metaGo($Shop_Main_URL.'/html/wish_list.php');
		}else{
			goBack('위시리스트에 담는도중 에러가 발생하였습니다.\\n\\n개발사에 문의하여 주십시요.','-1');
		}
	}else{
		@metaGo($Shop_Main_URL.'/html/wish_list.php');
	}
}
// 2. 위시리스트에서 삭제
function del_wish($Good_Code,$Sesion_ID){
	global $Shop_Main_URL,$Good,$Wish_List_Table;

	$que = "delete from $Wish_List_Table where Wish_ID='$Sesion_ID' and Good_Code='$Good_Code'";
	$result = mysql_query($que);
	if($result){
		@metaGo($Shop_Main_URL.'/html/wish_list.php');
	}else{
		goBack('위시리스트에서 삭제하는 도중 에러가 발생하였습니다.\\n\\n개발사에 문의하여 주십시요.','-1');
	}
}
// 3. 위시리스트 비우기
function clear_wish($Sesion_ID){
	global $Shop_Main_URL,$Good,$Wish_List_Table;

	$que = "delete from $Wish_List_Table where Wish_ID='$Sesion_ID'";
	$result = mysql_query($que);
	if($result){
		@metaGo($Shop_Main_URL.'/html/wish_list.php');
	}else{
		goBack('위시리스트에서 삭제하는 도중 에러가 발생하였습니다.\\n\\n개발사에 문의하여 주십시요.','-1');
	}
}
#--------------------------------------------------------------------##
##	카테고리 리스트
#--------------------------------------------------------------------##
function category_show($CatNo){
	global $Category;
	if (!$CatNo) {//카테고리번호가 없으면 루트카테고리를 선택함
		goBack('카테고리번호가 존재하지 않습니다.');
	}else{
		//Cat_No(카테고리번호) 에서 카테고리 코드와 카테고리깊이를 찾음
		$select_que = "select * from $Category where Cat_No='$CatNo'";
		$result_select = mysql_query($select_que);
		$affected_rows = mysql_affected_rows();
		if(!$affected_rows){
			goBack('선택하신 카테고리번호는 존재하지 않습니다.');
		}
		$select_row = mysql_fetch_array($result_select);
		$select_code = $select_row[Cat_Code];
		$tmp_select_code = explode("/",$select_code);
		$tmp_code = $tmp_select_code[0] . "/"; //첫번째 코드만 사용
		$category_content = stripslashes($select_row[Cat_Content]);

		//해당 하위 카테고리를 선택
		$list_que = "select Cat_No,Cat_Code,Cat_Name from $Category where Cat_Code like '$tmp_code%' and Cat_Depth='1' order by Cat_Sort";
		$result_list = mysql_query($list_que);
		$total = mysql_affected_rows();
	}
	if($total>0){
		for($i=0; $i<$total; $i++){		
			$row = mysql_fetch_array($result_list);
			echo "
			<tr>
			<td height='22'>&nbsp;<img src='./$skin_name/images/sub_arrow_gray.gif align=absmiddle>
			<a href=./catalog.php?CatNo=$row[Cat_No]&Sort=$Sort>$row[Cat_Name]</a>
			</td>
			</tr>
			<tr height=1>
			<td background='./$skin_name/images/sub_line_dot.gif></td>
			</tr>
			";

		}
	}
}

#--------------------------------------------------------------------##
##	서브 카테고리 리스트 (하위 카테고리 리스트)
#--------------------------------------------------------------------##
function sub_category_show($CatNo,$Seperate){
	global $Category;
	//Cat_No(카테고리번호) 에서 카테고리 코드와 카테고리깊이를 찾음
	$select_que = "select * from $Category where Cat_No='$CatNo'";
	$result_select = mysql_query($select_que);
	$affected_rows = mysql_affected_rows();
	if(!$affected_rows){
		goBack('선택하신 카테고리번호는 존재하지 않습니다.');
	}
	$select_row = mysql_fetch_array($result_select);
	$select_depth = $select_row[Cat_Depth]+1;
	$select_code = $select_row[Cat_Code];
	$category_content = stripslashes($select_row[Cat_Content]);

	//해당 하위 카테고리를 선택
	$list_que = "select Cat_No,Cat_Code,Cat_Name from $Category where Cat_Code like '$select_code%' and Cat_Depth='$select_depth' order by Cat_Sort";
	$result_list = mysql_query($list_que);
	$total = mysql_affected_rows();

	if($select_depth>1){	
		if($total>0){
			for($i=0; $i<$total; $i++){		
				$row = mysql_fetch_array($result_list);
				echo "
				<a href=./catalog.php?CatNo=$row[Cat_No]&Sort=$Sort>$row[Cat_Name]</a>";
				if(($total-$i-1)!=0)echo" $Seperate ";//가로로 카테고리가 표시되게 할때 해줌
			}
		
		}
		
	}
}

#--------------------------------------------------------------------##
##	서브 카테고리 리스트2 (하위 카테고리 리스트) -> 0단계 카테고리를 눌렀을때 1단계와 2단계까지만 보여줌
#--------------------------------------------------------------------##
function sub_category_show2($CatNo,$Seperate){
	global $Category;
	//Cat_No(카테고리번호) 에서 카테고리 코드와 카테고리깊이를 찾음
	$select_que = "select * from $Category where Cat_No='$CatNo'";
	$result_select = mysql_query($select_que);
	$affected_rows = mysql_affected_rows();
	if(!$affected_rows){
		goBack('선택하신 카테고리번호는 존재하지 않습니다.');
	}
	$select_row = mysql_fetch_array($result_select);
	$select_depth = $select_row[Cat_Depth]+1;
	$select_code = $select_row[Cat_Code];
	$category_content = stripslashes($select_row[Cat_Content]);

	//해당 하위 카테고리를 선택
	$list_que = "select Cat_No,Cat_Code,Cat_Name from $Category where Cat_Code like '$select_code%' and Cat_Depth = 1 order by Cat_Sort";
	$result_list = mysql_query($list_que);
	$total = mysql_affected_rows();
	
	echo "
	<table cellspacing='1' cellpadding='3' width='100%' bgcolor='#B5B6B5' border='0'>
	";
	if($total>0){
		for($i=0; $i<$total; $i++){
			$row = mysql_fetch_array($result_list);
			echo "<tr><td width='100' align=right bgcolor='#3366FF'>
				<a href=./catalog.php?CatNo=$row[Cat_No]&Sort=$Sort><font color='#FFFFFF'>$row[Cat_Name]</a></a>
			</td><td bgcolor='#FFFFFF'>";
			//1단계카테고리의 하위 카테고리를 구함
			$list_que2 = "select Cat_No,Cat_Code,Cat_Name from $Category where Cat_Code like '$row[Cat_Code]%' and Cat_Depth = 2 order by Cat_Sort";
			$result_list2 = mysql_query($list_que2);
			$total2 = mysql_affected_rows();
			
			for($j=0; $j<$total2; $j++){
			$row2 = mysql_fetch_array($result_list2);
				echo "<a href=./catalog.php?CatNo=$row2[Cat_No]&Sort=$Sort>$row2[Cat_Name]</a>";
				if(($total2-$j-1)!=0)echo" $Seperate ";//가로로 카테고리가 표시되게 할때 해줌
			}
			
			echo "</td></tr>";			
		}
	
	}else{//2단계 카테고리일 경우
		//현재 2단계 카테고리의 상위 카테고리를 선택해서 다시 불러옴
		$t_select_code = explode("/",$select_code);
		for($t_i=0;$t_i<2;$t_i++){
			$now_code .= $t_select_code[$t_i] . "/";
		}		
		
		$list_que = "select Cat_No,Cat_Code,Cat_Name from $Category where Cat_Code like '$now_code%' and Cat_Depth = 1 order by Cat_Sort";
		$result_list = mysql_query($list_que);		
		$row = mysql_fetch_array($result_list);

		echo "<tr><td width='100' align=right bgcolor='#3366FF'>
			<a href=./catalog.php?CatNo=$row[Cat_No]&Sort=$Sort><font color='#FFFFFF'>$row[Cat_Name]</a></a>
		</td><td bgcolor='#FFFFFF'>";
		//1단계카테고리의 하위 카테고리를 구함
		$list_que2 = "select Cat_No,Cat_Code,Cat_Name from $Category where Cat_Code like '$row[Cat_Code]%' and Cat_Depth = 2 order by Cat_Sort";
		$result_list2 = mysql_query($list_que2);
		$total2 = mysql_affected_rows();
			
		for($j=0; $j<$total2; $j++){
		$row2 = mysql_fetch_array($result_list2);
			if($row2[Cat_No]==$CatNo){
				echo "<b><a href=./catalog.php?CatNo=$row2[Cat_No]&Sort=$Sort>$row2[Cat_Name]</a></b>";
			}else{
				echo "<a href=./catalog.php?CatNo=$row2[Cat_No]&Sort=$Sort>$row2[Cat_Name]</a>";
			}
			if(($total2-$j-1)!=0)echo" $Seperate ";//가로로 카테고리가 표시되게 할때 해줌
		}
		
		echo "</td></tr>";			
	}
		
	echo "</table>";
}

#--------------------------------------------------------------------##
##	카테고리 컨텐츠 (카테고리 컨텐츠 표시)
#--------------------------------------------------------------------##
function category_contents($CatNo){
	global $Category;
	$select_que = "select Cat_Content from $Category where Cat_No='$CatNo'";
	$result = mysql_query($select_que);
	$category_content = mysql_result($result,0,0);
	$category_content = stripslashes($category_content);
	echo $category_content;
}
#----------------------- 주민번호 체크 ---------------
function check_jumin($jumin) {


$weight='234567892345'; // 자리수 weight 지정
$len=strlen($jumin);$sum = 0;
$message="주민번호가 틀립니다2."; 
if($len<>13) 
{ goBack($message,$where='-1');
}

for($i=0; $i<12; $i++) { $sum=$sum+(substr($jumin,$i,1)*substr($weight,$i,1)); }
$rst=$sum%11; $result=11-$rst;
if($result==10) $result=0; elseif($result==11) $result = 1;
$ju13 = substr($jumin,12,1);
$message="주민번호가 틀립니다3."; 
if ($result <> $ju13)
{ goBack($message,$where='-1');
}

return true;
}
//////////////////////////////////////////////////////////////
////   이미지 확장자 검사                       /////////
/////////////////////////////////////////////////////////////

function img_ex($img_name){ 
		if(!strcmp($img_name,"htm") || !strcmp($img_name,"html") || !strcmp($img_name,"phtml") ||  !strcmp($img_name,"php") || !strcmp($img_name,"php3") || !strcmp($img_name,"php4") ||  !strcmp($img_name,"inc") || !strcmp($img_name,"pl") || !strcmp($img_name,"cgi") || !strcmp($img_name,"txt")){
			goBack('허용되지 않은 파일 확장자 입니다.1');		
		}
		
}

//////////////////// 왼쪽 상단 최고 이미지 구하기 ///////////////////
function now_code_img ($CatNo,$Category){
		$where_que = "select * from $Category where Cat_No='$CatNo'";
		$result_where = mysql_query($where_que);
		$affected_where = mysql_affected_rows();
		$where_row = mysql_fetch_array($result_where);
		$where_depth = $where_row[Cat_Depth]+1;
		$now_code = $where_row[Cat_Code];
		$top_img = explode("/", $now_code);
 echo  $top_img[0];
}

function now_code_img2($CatNo,$Category){
		$where_que = "select * from $Category where Cat_No='$CatNo'";
		$result_where = mysql_query($where_que);
		$affected_where = mysql_affected_rows();
		$where_row = mysql_fetch_array($result_where);
		$where_depth = $where_row[Cat_Depth]+1;
		$now_code = $where_row[Cat_Code];
		$top_img = explode("/", $now_code);
 return $top_img[0];
}
 /////////////////////////////////////////////////////////////////////

//////////////////////////////// 편집기 보기 ///////////////////
function edit_view($No){
	global 	$Host,$DBUser,$DBUser_Pass,$Database,$edit_Table;
	$DB_Connect= mysql_connect("$Host","$DBUser","$DBUser_Pass") || die("데이터베이스 연결에 실패하였습니다.");
	$list_que = "select * from $edit_Table  where No = '$No'";
	$result_list=mysql_db_query($Database,$list_que);
	$row = mysql_fetch_array($result_list);
	$Subject = stripSlashes($row[subject]);
	$Contents = stripSlashes($row[contents]);
	
	$Contents = stripslashes($Contents);
	$Contents = preg_replace("/@@(.*?)@@/i","<!--@@\\1@@-->",$Contents);
	$Contents = str_replace('<P>','',$Contents);
	$Contents = str_replace('</P>','<br>',$Contents);

	echo"$Contents";
}
	
	/////////////////////////////////////////

?>