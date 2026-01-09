<?
$oneNum = "5";
$twoNum = "0";
?>
<? include "../include/dtd.php"; ?>
<? include "../include/header.php"; ?>


<article class="member-wrapper">
	<!--  PWD/SEARCH  -->
	<!-- <div class="member-tab-list-con">
		<ul>
			<li><a href="./id_search.php">아이디 찾기</a></li>
			<li class="selected"><a href="./pwd_search.php">비밀번호 찾기</a></li>
		</ul>
	</div> -->
	<div class="member-con-inner">
		<div class="member-form-con-txt">
			<strong>비밀번호 찾기</strong>
			<p>가입시 입력한 아이디와 이메일 주소를 정확히 기입해 주세요.<br>비밀번호 찾기를 누르면 <b>가입 시 등록된 메일로 비밀번호가 전송</b>됩니다.</p>
		</div>
		<form name="pwd_search_form" method="post" action="pwd_search_ok.php">
			<article class="member-form-con">
				<ul class="form-list">
					<li><input type="text" class="form-input" name="name" placeholder="이름을 입력해주세요" title="이름"></li>
					<li><input type="text" class="form-input" name="email" placeholder="이메일을 입력해주세요" title="이메일"></li>
					<li><input type="text" class="form-input" name="userid" placeholder="아이디를 입력해주세요" title="아이디"></li>
				</ul>
				<div class="cm-btn-controls ">
					<button class="btn-style01" type="button" onclick="pwd_search();">비밀번호 찾기</button>
					<a href="./id_search.php" class="btn-style03">아이디 찾기</a>
					<a href="./login.php" class="btn-style03">로그인</a>
				</div>
			</article>
		</form>
	</div>
	<!-- //  PWD/SEARCH  -->
</article>

<script type="text/javascript">
<!--
function pwd_search() {
	var f=document.pwd_search_form;
	if(f.name.value=="") {
		alert("이름을 입력해 주세요.");
		f.name.focus();
	} else if(f.email.value=="") {
		alert("이메일주소를 입력해 주세요.");
		f.email.focus();
	} else if(f.userid.value=="") {
		alert("아이디를 입력해 주세요.");
		f.userid.focus();
	} else {
		f.submit();
	}
}
//-->
</script>


<? include "../include/footer.php"; ?>