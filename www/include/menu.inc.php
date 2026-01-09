<table border="0" cellpadding="3" cellspacing="0" id="menu" width="100%">
	<tr align="center">
		<td class="menu"><a href="../index.php">HOME</a></td>
		<td class="menu" width="5">|</td>
		<td class="menu"><? if($_SESSION[USERID]) {?><a href="../member/login_ok.php?logout=1">로그아웃</a><? }else{?><a href="../member/login.php">로그인</a><?}?></td>
		<td class="menu" width="5">|</td>
		<td class="menu"><? if($_SESSION[USERID]) {?><a href="../member/my_member_edit.php">정보변경</a><? }else{?><a href="../member/join.php">회원가입</a><?}?></td>
		<td class="menu" width="5">|</td>
		<td class="menu"><a href="javascript:openIdpass();">ID/PW찾기</a></td>
		<td class="menu" width="5">|</td>
		<td class="menu"><a href="../product/product_powersearch.php">상세검색</a></td>
		<td class="menu" width="5">|</td>
		<td class="menu"><a href="../member/mypage.php">MYPAGE</a></td>
		<td class="menu" width="5">|</td>
		<td class="menu"><a href="../online/online01.php">온라인신청</a></td>
		<td><!-- 상품검색 include --><? include('../include/search.inc.php');?></td>
	</tr>
</table>