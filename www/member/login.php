<?
$oneNum = "1";
$twoNum = "0";
?>
<? include "../include/header.php"; ?>

<article class="member-wrapper">
	<form name="login_form" method="post" action="./login_ok.php">
	<input type="hidden" name="login_go" value="<?=$_SERVER['HTTP_REFERER']?>">
		<input type="hidden" name="login" value="1">
		<div class="member-con-inner">
			<article class="member-form-con">
				<div class="member-form-con-txt">
					<strong>로그인</strong>
				</div>
				<!-- 아이콘 타이틀이 있을때 -->
				<ul class="form-list-icon">
					<li>
						<i class="material-icons"></i><input type="text" class="login-input" name="userid" placeholder="아이디를 입력하세요" title="아이디" onKeypress="if(event.keyCode ==13){loginCheck();return;}" value="<?=$_COOKIE[cookie_id]?>">
					</li>
					<li>
						<i class="material-icons"></i><input type="password" class="login-input" name="passwd" placeholder="비밀번호를 입력하세요" title="비밀번호" onKeypress="if(event.keyCode ==13){loginCheck();return;}">
					</li>
				</ul>
				<!-- // -->
				<p class="id-save-btn">
					<span class="custom-check-item">
						<input type="checkbox" class="save-check" name="rem" id="saveId" value="y" <? if($_COOKIE[cookie_id]){ echo "checked"; } ?>>
						<label for="saveId"><strong>아이디 저장</strong></label>
					</span>
				</p>
				<div class="cm-btn-controls cm-btn-long-controls">
					<button type="button" class="btn-style01" onClick="loginCheck();">로그인</button>
				</div>
				<div class="form-box-list">
					<a href="./id_search.php">아이디 찾기</a><a href="./pwd_search.php">비밀번호 찾기</a><a href="./join_01.php">회원가입</a>
				</div>
			</article>
		</div>
	</form>
</article>
<script type="text/javascript">
<!--
function loginCheck() {
	var f=document.login_form;
	if(f.userid.value=="") {
		alert("아이디를 입력해 주세요.");
		f.userid.focus();
	} else if(f.passwd.value=="") {
		alert("비밀번호를 입력해 주세요.");
		f.passwd.focus();
	} else {
		f.submit();
	}
}
//-->
</script>

<? include "../include/footer.php"; ?>