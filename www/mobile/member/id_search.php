<?
$oneNum = "5";
$twoNum = "0";
?>
<? include "../include/dtd.php"; ?>
<? include "../include/header.php"; ?>



<article class="member-wrapper">
	<!--  ID/SEARCH  -->
	<!-- <div class="member-tab-list-con">
		<ul>
			<li class="selected"><a href="./id_search.php">아이디 찾기</a></li>
			<li><a href="./pwd_search.php">비밀번호 찾기</a></li>
		</ul>
	</div> -->
	<div class="member-con-inner ">
		<div class="member-form-con-txt">
			<strong>아이디 찾기</strong>
			<p>가입시 입력한 이름과 이메일 주소를 통해 <br>아이디를 찾을 수 있습니다.</p>
		</div>
		<form name="id_search_form" method="post" action="id_search_check.php">
			<article class="member-form-con">
				<ul class="form-list">
					<li><input type="text" class="form-input" name="name" placeholder="이름을 입력해주세요" title="이름" onKeypress="if(event.keyCode ==13){id_search();return;}"></li>
					<li><input type="text" class="form-input" name="email" placeholder="이메일을 입력해주세요" title="이메일" onKeypress="if(event.keyCode ==13){id_search();return;}"></li>
				</ul>
				<div class="cm-btn-controls">
					<button class="btn-style01" type="button" onclick="id_search();">아이디 찾기</button>
					<a href="./pwd_search.php" class="btn-style03">비밀번호 찾기</a>
				</div>
			</article>
		</form>
	</div>
	<!-- //  ID/SEARCH  -->
</article>

<script type="text/javascript">
<!--
function id_search() {
	var f=document.id_search_form;
	if(f.name.value=="") {
		alert("이름을 입력해 주세요.");
		f.name.focus();
	} else if(f.email.value=="") {
		alert("이메일주소를 입력해 주세요.");
		f.email.focus();
	} else {
		f.submit();
	}
}
//-->
</script>



<? include "../include/footer.php"; ?>