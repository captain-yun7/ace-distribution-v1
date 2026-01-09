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
					<?
					$page_row = $db->object("cs_page", "where page_index='privacy'");

					$content = $page_row->content;
					$content = str_replace("<P>","",$content);
					$content = str_replace("</P>","<br/>",$content);
					$content = str_replace("<p>","",$content);
					$content = str_replace("</p>","<br/>",$content);
					$content = $tools->strHtml($content);

					echo $content;
					?>
					</div>
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
					<?
					$page_row = $db->object("cs_page", "where page_index='agreement'");

					$content = $page_row->content;
					$content = str_replace("<P>","",$content);
					$content = str_replace("</P>","<br/>",$content);
					$content = str_replace("<p>","",$content);
					$content = str_replace("</p>","<br/>",$content);
					$content = $tools->strHtml($content);

					echo $content;
					?>
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