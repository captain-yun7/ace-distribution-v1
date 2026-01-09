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
	<div class="member-tab-list-con"><!-- 필요하지 않으면 삭제 -->
		<ul>
			<li><a href="./modify_01.php">회원정보수정</a></li>
			<li class="selected"><a href="./member_out.php">회원탈퇴</a></li>
		</ul>
	</div>
	<div class="member-con-inner member-tab-con-inner"><!-- 탭이 안들어갈 경우 member-tab-con-inner 삭제 -->
		<div class="member-form-con-txt">
			<strong>회원탈퇴</strong>
			<p>그동안 홈페이지를 이용해주셔서 감사합니다. <br>회원정보 확인 후 탈퇴가 완료됩니다.</p>
		</div>
		<form method="post" action="./member_exit_ok.php" name="exit_form">	
		<article class="member-form-con">
			<strong class="form-tit">회원정보 확인</strong>
			<ul class="form-list">
				<li><input type="text" class="form-input" value="<?=$mem_row->userid?>" readonly disabled></li>
				<li><input type="password" class="form-input" name="passwd" placeholder="비밀번호를 입력해주세요" title="비밀번호"></li>
			</ul>
			<div class="cm-btn-controls">
				<button type="button" class="btn-style01" onClick="sendit();">회원탈퇴</button>
				<a href="/" class="btn-style02">취소</a>
			</div>
		</article>
		</form>
	</div>

</article>

<script type="text/javascript">
<!--
function sendit() {
	var form=document.exit_form;
	if(form.passwd.value==""){
		alert("비밀번호를 입력해 주세요.");
		form.passwd.focus();
	} else {
		ans = confirm("정말로 탈퇴 하시겠습니까?");
		if(ans==true){
		form.submit();
		}
	}
}	
//-->
</script>

<? include "../include/footer.php"; ?>