<?
$page_num = "10";
$sub_num = "01";
$page_section = "member";
$sub_section = "login";
$page_info = "회원서비스";
$sub_info = "로그인";
include $_SERVER["DOCUMENT_ROOT"]."/lib/config.php";
include "../lib/config.php";
$sub_description = ""; // 페이지 설명(서브페이지) *필요시 사용
include "../lib/sub.php";
include $_SERVER["DOCUMENT_ROOT"].$site_directory."/include/dtd.php";
?>


<? include $_SERVER["DOCUMENT_ROOT"].$site_directory."/include/top.php"; ?>
	<article class="member-wrapper">
		<form name="login_form" method="post" action="./login_ok.php">
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
					<article class="member-form-short-sns-con clearfix">
						<h5 class="short-sns-tit">SNS 로그인</h5>
						<div class="short-sns-list-con">
							<ul class="clearfix">
								<li><button style="background-color:#3b5997" title="페이스북 계정 로그인"><i class="xi-facebook"></i></button></li>
								<li><button style="background-color:#2db400" title="네이버 계정 로그인"><i class="xi-naver"></i></button></li>
								<li><button style="background-color:#ea4235" title="구글 계정 로그인"><i class="xi-google"></i></button></li>
								<li><button style="background-color:#f9c700" title="카카오 계정 로그인"><i class="xi-kakaotalk"></i></button></li>
							</ul>
						</div>
					</article>
				</article>
			</div>
		</form>
	</article>	
	<br><br>
	<!-- Style02 -->
	<form name="login_form" method="post" action="./login_ok.php">
		<input type="hidden" name="login" value="1">
		<article class="member-con-inner-sns">
			<div class="member-con-inner clearfix">
				<article class="member-form-con">
					<strong class="form-tit">회원 로그인</strong>
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
							<label for="saveId"><em class="check-icon"><i class="xi-check-min"></i></em><strong>아이디 저장</strong></label>
						</span>
					</p>
					<div class="cm-btn-controls cm-btn-long-controls">
						<button type="button" class="btn-style01" onClick="loginCheck();">로그인</button>
					</div>
					<div class="form-box-list">
						<a href="./id_search.php">아이디 찾기</a><a href="./pwd_search.php">비밀번호 찾기</a><a href="./join_01.php">회원가입</a>
					</div>
				</article>
				<article class="member-form-con">
					<strong class="form-tit">간편계정으로 로그인</strong>
					<!-- <p class="member-form-sub-txt">SNS 계정을 이용해서 로그인합니다.</p> -->
					<ul class="sns-login-list">
						<li><span class="sns-icon"><i class="xi-facebook"></i></span><button style="background-color:#3b5997">페이스북 계정 로그인</button></li>
						<li><span class="sns-icon"><i class="xi-naver"></i></span><button style="background-color:#2db400">네이버 계정 로그인</button></li>
						<li><span class="sns-icon"><i class="xi-google"></i></span><button style="background-color:#ea4235">구글 계정 로그인</button></li>
						<li><span class="sns-icon"><i class="xi-kakaotalk"></i></span><button style="background-color:#f9c700;">카카오 계정 로그인</button></li>
					</ul>
				</article>
			</div>
		</article>
	</form>

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

<? include $_SERVER["DOCUMENT_ROOT"].$site_directory."/include/bottom.php"; ?>