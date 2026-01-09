<? $mod=menu03 ?>
<? $menu=1?>
<?
include('../header.php');
include($ROOT_DIR."/lib/style_class.php");

//$admin_stat = $db->object("cs_admin", "", "member_check, dc1, dc2, dc3");
$row = $db->object("cs_member", "where idx='$idx'");
//$total_point = $db->sum("cs_point", "where userid='$row->userid'", "point");
//$buy_goods_cnt = $db->cnt("cs_trade", "where order_userid='$row->userid' and trade_stat=4");
?>

<script language="JavaScript">
<!--
// 거래정보보기
function tradeView( mv_data ) {
	location.href='../order/trade_view.php?trade_data='+mv_data;
}

////  회원에게 메일 보내기 ///////////////////////////////////////////////////////////////////////////////
function userSendmailWinOpen(data) {
	window.open("../member/user_sendmail.php?user_mail="+data,"","scrollbars=no, width=484, height=500");
}
//-->
</script>

<div>
	<h3 class="page-header">회원 상세정보</h3>
</div>


			

	<table class="table table-bordered table-hover ">

			<tr>
				<th width="150">이 름</th>
				<td height="25"><?=$row->name;?></td>
			</tr>
			<tr>
				<th>아이디</th>
				<td><?=$row->userid;?></td>
			</tr>
			<tr>
				<th>이메일</th>
				<td><?=$row->email;?></td>
			</tr>
			<!-- <tr>
				<th>비밀번호</th>
				<td><?=$tools->openssl_decrypt($row->passwd);?></td>
			</tr> -->
			<tr>
				<th>생년월일</th>
				<td><?=$row->birth;?></td>
			</tr>
			<tr>
				<th>전화번호</th>
				<td><?=$row->tel;?></td>
			</tr>
			<tr>
				<th>휴대폰</th>
				<td><?=$row->phone;?></td>
			</tr>
			<tr>
				<th>우편번호</th>
				<td><?=$row->zip_new;?></td>
			</tr>
			<tr>
				<th>주 소</td>
				<td><?=$row->add1;?>&nbsp;<?=$row->add2;?></td>
			</tr>
			<tr>
				<th>이메일 수신여부</th>
				<td><?=$row->mailing;?></td>
			</tr>
			<tr>
				<th>로그인접속수</th>
				<td><?=number_format($row->connect);?>&nbsp;번</td>
			</tr>

	</table>
	
	<table width="100%">
		<tr>
			<td align="center">
				<a href="javascript:history.back()" class="btn btn-primary">뒤로가기</a>&nbsp;<a href="member_edit.php?idx=<?=$row->idx;?>" class="btn btn-primary">수정하기</a><br>
			</td>
		</tr>
	</table>

				


<? include('../footer.php');?>
