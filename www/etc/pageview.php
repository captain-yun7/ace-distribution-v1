<? include('../include/head.inc.php');?>
<?
	$_GET=&$HTTP_GET_VARS;

	if($_GET[url]) {
		$pageview_stat = $db->object("cs_page", "where page_index='$_GET[url]'");
		if($pageview_stat->tag) {
			$content = $pageview_stat->content;
			$title = $pageview_stat->title;
		} else {
			$content = $tools->strHtml($pageview_stat->content);
			$title = $pageview_stat->title;
		}
	} else {
		$tools->errMsg('잘못된 접근입니다');
	}
?>
<!-- Header Start -->
<? include('../include/header.php');?>
<!-- Header End -->

<!-- 현재위치 경로표시 시작 -->
<span class="location"><a href="/">HOME</font></a>&nbsp;&nbsp;>&nbsp;&nbsp;<?=$title;?></span>
<!-- 현재위치 경로표시 종료 -->
<br>
				<!-- 내용 출력 -->
				<table width="630" cellpadding="0" cellspacing="0" border="0" class="menu">
					<tr>
						<td class="menu"><?=$content;?></td>
					</tr>
				</table><br>
<!-- Footer Start -->
<? include('../include/footer.php');?>
<!-- Footer End -->
