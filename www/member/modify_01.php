<?
$oneNum = "1";
$twoNum = "0";
?>
<? include "../include/header.php"; ?>
<?
if($_SESSION[USERID]==""){ $tools->javaGo("/member/login.php"); exit; }
$mem_row = $db->object("cs_member","where userid='$_SESSION[USERID]'");
?>

<article class="member-wrapper">
	<!--  MODIFY 01  -->
	<div class="member-tab-list-con"><!-- 필요하지 않으면 삭제 -->
		<ul>
			<li class="selected"><a href="./modify_01.php">회원정보수정</a></li>
			<li><a href="./member_out.php">회원탈퇴</a></li>
		</ul>
	</div>
	<div class="member-con-inner">
		<div class="member-form-con-txt">
			<strong>회원정보수정</strong>
			<p>정보를 안전하게 보호하기 위해 비밀번호를 다시한번 입력해주세요</p>
		</div>
		<form name="join_form" method="post" action="./modify_02.php">
			<article class="member-form-con">
				<ul class="form-list">
					<li><input type="text" class="form-input" name="userid" title="아이디" value="<?=$mem_row->userid?>" readonly=""></li>
					<li><input type="password" class="form-input" name="passwd" placeholder="비밀번호를 입력해주세요" title="비밀번호" onKeypress="if(event.keyCode ==13){sendit();return;}"></li>
				</ul>
				<div class="cm-btn-controls">
					<button class="btn-style01" type="button" onclick="sendit();">수정하기</button>
					<a href="/" class="btn-style02">취소</a>
				</div>
			</article>
		</form>
	</div>
	<!-- //  MODIFY 01  -->
</article>

<script type="text/javascript">
<!--
function sendit() {
	var f=document.join_form;
	if(f.passwd.value=="") {
		alert("비밀번호를 입력해 주세요.");
		f.passwd.focus();
	} else {
		f.submit();
	}
}
//-->
</script>


<? include "../include/footer.php"; ?>