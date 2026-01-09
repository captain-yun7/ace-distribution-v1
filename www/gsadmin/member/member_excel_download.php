<?
session_start();
include('../../common.php');
if( !$_SESSION[ADMIN_USERID] || !$_SESSION[ADMIN_PASSWD]) { $tools->alertJavaGo('경고! 잘못된 접근입니다\n\n로그인 하세요', '../index.php');}

	# URL를 파일명으로 지정.....
	$domain = str_replace( ".", "_", $HTTP_HOST );
	# 엑셀 생성되는 디비명
	$path = "member";

	Header("Content-type: application/vnd.ms-excel"); 
	Header("Content-Disposition: attachment; filename=" . $domain . "_" . $path . "_".date("Y-m-d").".xls"); 
	Header("Content-Description: PHP5 Generated Data"); 
	Header("Pragma: no-cache"); 
	Header("Expires: 0");
	header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
?>
<style>
.xTxt{mso-number-format:"\@";}
td{font-size:11px;}
.xTxtF{color:red;}
</style>
<table width=1000 cellpadding=3 cellspacing=0 border=1 bordercolor='#BDBEBD' style='border-collapse: collapse'>
<Tr align=center height=30 bgcolor="#EFEFEF">
	<td width=100>No</td>
	<td width=60>아이디</td>
	<td>회원레벨</td>
	<td width=70>이름</td>
	<td width=80>전화번호</td>
	<td width=120>메일주소</td>
	<td width=120>주민번호</td>
	<td>우편번호</td>
	<td width=200>주소</td>
	<td width=120>가입일</td>
	<td>추천인</td>
	<td>접속수</td>
<?
	# 해당 Query 및 데이터 처리 부분을 넣으시면됩니다
	$rs = $db->select("cs_member", "order by idx asc");

	$intN = 1;
	while( $row = mysql_fetch_array( $rs ) ) {
		$tmpN = str_pad( $intN, 5, "0", STR_PAD_LEFT );

		if( $row['level'] == "2" ) :
			$row['level'] = "특별회원";
		elseif( $row['level'] == "1" ) :
			$row['level'] = "일반회원";
		endif;
?>
<tr height=25 valign=middle bgcolor='#FFFFFF' valign=top>
	<td class='xTxt'><?=$tmpN?></td>
	<td><?=$row['userid']?></td>
	<td><?=$row['level']?></td>
	<td><?=$row['name']?></td>
	<td><?=$row['tel1']?>-<?=$row['tel2']?>-<?=$row['tel3']?></td>
	<td><?=$row['email']?></td>
	<td class='xTxt'><?=$row['jumin1']?>-<?=$row['jumin2']?></td>
	<td><?=$row['zip1']?>-<?=$row['zip2']?></td>
	<td><?=$row['add1']?> <?=$row['add2']?></td>
	<td class='xTxt'><?=$row['register']?></td>
	<td><?=$row['recomid']?></td>
	<td><?=$row['connect']?></td>
<?		$intN++;
	}

	mysql_free_result( $rs );													?>
</table>