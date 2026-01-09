<?
$page_num = "10";
$sub_num = "02";
$page_section = "member";
$sub_section = "join_02";
$page_info = "회원서비스";
$sub_info = "회원가입";
include $_SERVER["DOCUMENT_ROOT"]."/lib/config.php";
include "../lib/config.php";
$sub_description = ""; // 페이지 설명(서브페이지) *필요시 사용
include "../lib/sub.php";
include $_SERVER["DOCUMENT_ROOT"].$site_directory."/include/dtd.php";
?>


<? include $_SERVER["DOCUMENT_ROOT"].$site_directory."/include/top.php"; ?>
<article class="member-wrapper">
	<article id="joinContent">
		<aside id="processBarCon" class="join-process-bar-con">
			<ol>
				<li>
					<span class="process-icon"><i class="xi-document"></i></span>
					<dl>
						<dt>STEP 01</dt>
						<dd>약관동의</dd>
					</dl>
				</li>
				<li>
					<span class="process-icon"><i class="xi-pen-o"></i></span>
					<dl>
						<dt>STEP 02</dt>
						<dd>정보입력</dd>
					</dl>
				</li>
				<li class="current">
					<span class="process-icon"><i class="xi-check-min"></i></span>
					<dl>
						<dt>STEP 03</dt>
						<dd>가입완료</dd>
					</dl>
				</li>
			</ol>
		</aside>
		<div class="member-con-inner">
			<article class="join-finish-con">
				<span class="join-finish-icon"><i class="xi-check-min"></i></span>
				<p class="join-finish-txt">
					회원가입이 완료되었습니다.<br>
	 
					가입하신 <strong>아이디</strong>와 <strong>비밀번호</strong>로 로그인이 가능합니다.
				</p>
				<div class="cm-btn-controls">
					<a href="./login.php" class="btn-style01">로그인</a>
					<a href="/" class="btn-style03">메인으로</a>
				</div>
			</article>
		</div>
	</article>
</article>



<? include $_SERVER["DOCUMENT_ROOT"].$site_directory."/include/bottom.php"; ?>