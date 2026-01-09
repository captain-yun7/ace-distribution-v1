<?
$oneNum = "1";
$twoNum = "0";
?>


<? include "../include/header.php"; ?>

<article class="member-wrapper">
	<article id="joinContent">
		<aside id="processBarCon" class="join-process-bar-con">
			<ol>
				<li class="current">
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
				<li>
					<span class="process-icon"><i class="xi-check-min"></i></span>
					<dl>
						<dt>STEP 03</dt>
						<dd>가입완료</dd>
					</dl>
				</li>
			</ol>
		</aside>
		<!--  JOIN STEP 01  -->
		<form name="join_form"action="./join_02.php" method="post">
			<div class="join-step-con">
				<h3 class="join-tit">개인정보처리방침</h3>
				<div class="join-step-inner-con">
					<div class="join-agreement-con editor">
					<div><a href="https://www.privacy.go.kr/a3sc/per/inf/perInfStep02.do" target="_blank">https://www.privacy.go.kr/a3sc/per/inf/perInfStep02.do </a></div><div><br></div><div>이 주소로 들어가셔서 맞춤형 개인정보 처리방침을 만들어서 등록하세요.</div><br><br/>					</div>
					<p class="agree-txt">
						<span class="custom-check-item">
							<input type="checkbox" id="agree1" name="agree1">
							<label for="agree1"><strong><em class="essential-icon">*</em>동의합니다.</strong></label>
						</span>
					</p>
				</div>
			</div>
			<div class="join-step-con">
				<h3 class="join-tit">서비스 이용약관</h3>
				<div class="join-step-inner-con">
					<div class="join-agreement-con editor">
					'ooo' 은 (이하 '회사'는) 고객님의 개인정보를 중요시하며, "정보통신망 이용촉진 및 정보보호"에 관한 법률을 준수하고 있습니다.<br>
					회사는 개인정보취급방침을 통하여 고객님께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다..<br><br>

					회사는 개인정보취급방침을 개정하는 경우 웹사이트 공지사항(또는 개별공지)을 통하여 공지할 것입니다..<br><br>

					ο 본 방침은 : oooo 년 oo 월 oo 일 부터 시행됩니다..<br><br>
				</div>
					<p class="agree-txt">
						<span class="custom-check-item">
							<input type="checkbox" id="agree2" name="agree2">
							<label for="agree2"><strong><em class="essential-icon">*</em>동의합니다. </strong></label>
						</span>
					</p>
				</div>
			</div>
			<div class="cm-btn-controls">
				<button class="btn-style01" type="button" onclick="sendit();">동의</button><a href="/" class="btn-style02">취소</a>
			</div>
		</form>
		<!--  JOIN STEP 01  -->		
	</article>
</article>

<script type="text/javascript">
<!--
function sendit(){
	var f=document.join_form;
	if(f.agree1.checked==false){
		alert("개인정보처리방침에 동의하지 않으셨습니다.");
		f.agree1.focus();
	}else if(f.agree2.checked==false){
			alert("이용약관에 동의하지 않으셨습니다.");
		f.agree2.focus();
	} else {
		f.submit();
	}
}
//-->
</script>

<? include "../include/footer.php"; ?>