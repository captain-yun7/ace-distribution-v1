<? include "./include/dtd.php"; ?>
<? include "./include/header.php"; ?>
<? include "../lib/page_class.php"; ?>

	<article class="main_visual">
		<div id="slides">
			<div class="slide1">
				<div class="img-box">
					<img src="./images/main_visual_001.jpg" alt="">
				</div>
			</div>
			<div class="slide2">
				<div class="img-box">
					<img src="./images/main_visual_002.jpg" alt="">
				</div>
			</div>
			<div class="slide3">
				<div class="img-box">
					<img src="./images/main_visual_003.jpg" alt="">
				</div>
			</div>
		</div>
	</article>
	<div class="area-padding-m">
		<article class="main-notice main-con">
			<div class="main-con-top">
				<h2>공지사항</h2>
				<a href="/mobile/community/notice.php" class="more-btn">더보기<i class="xi-caret-up-min"></i></a>
			</div>
			<ul class="notice-list">

<?
	$code="notice";
	$bbs_admin_stat = $db->object("cs_bbs", "where code='$code'");
	$notice_result		= $db->select("cs_bbs_data", "where code='$code'  order by ref desc, re_step ASC LIMIT 5" );
	while( $notice_row = @mysql_fetch_object($notice_result)) {
			$subject				=		$tools->strHtmlNo($tools->strCut_utf($notice_row->subject, 40));
			$new_check			=		$bbs_admin_stat->new_check;
			
			if( $new_check ) {	$new_img			=		$page->bbsNewImg( $notice_row->reg_date, $bbs_admin_stat->new_mark, "&nbsp;&nbsp;<img src='./../images/new3.gif'>" ); }
			$bbs_data = $tools->encode("idx=".$notice_row->idx."&startPage=".$startPage."&listNo=".$listNo."&table=".$table."&code=".$code."&search_item=".$search_item."&search_order=".$search_order);
?>                   
					<li>
						<a href="/mobile/community/notice.php?bgu=view&bbs_data=<?=$bbs_data;?>">
						<em><?=$db->stripSlash($subject);?></em>
						<span class="date"><? echo substr($notice_row->reg_date,0,-9) ?></span>
						</a> 
					</li>
<? } ?>

				
			</ul>
		</article>
		<article class="main-con-list main-con">
			<ul>
				<li>
					<a href="/mobile/community/recipe.php">
						<div class="list-txt">
							<h3 class="list-tit">레시피</h3>
							<p class="sub-tit">건강한빵, 쿠키 만들기</p>
						</div>
						<div class="icon-box">
							<img src="./images/main_icon01.png" alt="">
						</div>
					</a>
				</li>
				<li>
					<a href="/mobile/community/qna.php">
						<div class="list-txt">
							<h3 class="list-tit">Q&A</h3>
							<p class="sub-tit">제품 관련 질문과 답변</p>
						</div>
						<div class="icon-box">
							<img src="./images/main_icon02.png" alt="">
						</div>
					</a>
				</li>
				<li>
					<a href="/mobile/community/press.php">
						<div class="list-txt">
							<h3 class="list-tit">보도자료</h3>
							<p class="sub-tit">신문, 방송관련 기사</p>
						</div>
						<div class="icon-box">
							<img src="./images/main_icon03.png" alt="">
						</div>
					</a>
				</li>
				<li>
					<a href="/mobile/about/location.php">
						<div class="list-txt">
							<h3 class="list-tit">찾아오시는길</h3>
							<p class="sub-tit">회사 연락처 및 약도 안내</p>
						</div>
						<div class="icon-box">
							<img src="./images/main_icon04.png" alt="">
						</div>
					</a>
				</li>
			</ul>
		</article>
		<article class="main-inquiry main-con">
			<div class="inquiry-banner">
				<h2>
					<sup>Online Inquiry</sup>
					온라인문의
				</h2>
				<p class="txt">제품/주문관련 답변 드립니다.</p>
				<a href="/mobile/inquiry/inquiry.php" class="inquiry-btn"><em>MORE</em><span></span></a>
			</div>
		</article>
		<article class="main-pro main-con">
			<div class="main-con-top">
				<h2>추천제품</h2>
				<div class="jqb_bar"> 
                        <div id="btn_prev" class="jqb_btn jqb_btn_prev"></div>
				    <div id="btn_next" class="jqb_btn jqb_btn_next"></div>                        
                    </div>
			</div>
			<div id="jqb_object">	
                    <div class="jqb_slides">
<?
$query = "select * from cs_goods where display='1' and main_position='1' order by ranking asc, idx asc";
$rs = mysql_query($query);
while($row = mysql_fetch_array($rs)){

	$content = $tools->strCut_utf(strip_tags($row[content]), 110);
?>
						<div class="jqb_slide">
                        	<a href="/mobile/product/product_view.php?idx=<?=$row[idx]?>">
                            <span class="thumb_box"><img src="/data/goodsImages/<?=$row[images1]?>" width="74" height="109" alt=""></span>
                            <div class="txt">
                                <h3><?=$row[name]?></h3>
                                <span class="desc"><?=$content?></span>
                            </div>
                        	</a>
                        </div>
<? } ?>
                    </div>               
                                    
               </div>
			<!-- <ul class="pro-list">
				<li>
					<a href="">
						<span class="img-box">
							<img src="./images/pro_img01.jpg" alt="">
						</span>
						<span class="pro-txt-con">
							<strong class="pro-tit">블로드 초콜릿 둘세 32%</strong>
							<em class="pro-txt">진한 비스킷 향과 함께 소금기있는 달콤한 맛 크리미한 질감이 특징</em>
						</span>
					</a>
				</li>
				<li>
					<a href="">
						<span class="img-box">
							<img src="./images/pro_img01.jpg" alt="">
						</span>
						<span class="pro-txt-con">
							<strong class="pro-tit">블로드 초콜릿 둘세 32%</strong>
							<em class="pro-txt">진한 비스킷 향과 함께 소금기있는 달콤한 맛 크리미한 질감이 특징</em>
						</span>
					</a>
				</li>
				<li>
					<a href="">
						<span class="img-box">
							<img src="./images/pro_img01.jpg" alt="">
						</span>
						<span class="pro-txt-con">
							<strong class="pro-tit">블로드 초콜릿 둘세 32%</strong>
							<em class="pro-txt">진한 비스킷 향과 함께 소금기있는 달콤한 맛 크리미한 질감이 특징</em>
						</span>
					</a>
				</li>
			</ul>
			<div class="pro-nav"> 
			    <div id="btn_prev" class="pro_btn pro_btn_prev"></div>
			    <div id="btn_next" class="pro_btn pro_btn_next"></div>	    
			</div> -->
		</article>
		
		
	</div>
<? include "./include/footer.php"; ?>
<? include "./include/scripts.php"; ?>

<?
//////////////////////////////////////////////////////////////// 메인 접속정보및 팝업 소스 S /////////////////////////////////////////////////////////////////////////////
// 접속정보 입력
$db->insert("cs_connect", "ip='$_SERVER[REMOTE_ADDR]', url='$_SERVER[HTTP_REFERER]', register=now()");

//=======       POPUP 창 설정 ==========================================================
$popup_result = $db->select("cs_popup", "");
$now_time=time();
$left = 80;
while($popup_row=@mysql_fetch_object($popup_result)) {
?>
<? if($popup_row->kind==0){ ?>
<?
	if( $_COOKIE['POPUP_COOKIE_'.$popup_row->idx] != 'NO' ) {
		if($popup_row->start_day <=$now_time && $popup_row->end_day >= $now_time) {
			$popup_row->height=$popup_row->height+24;
			echo"<script> window.open('/etc/popup.php?idx=$popup_row->idx','$popup_row->idx','scrollbars=no,width=$popup_row->width,height=$popup_row->height,top=$popup_row->tops,left=$popup_row->lefts'); </script>";	

			$left = $left + $popup_row->width;

		}
	}
?>

<? } else { ?>

<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.0/themes/base/jquery-ui.css" /> 
<script src="http://code.jquery.com/ui/1.10.0/jquery-ui.js"></script>

<!-- 레이어POPUP 시작-->
<?
	if( $_COOKIE['POPUP_COOKIE_'.$popup_row->idx] != 'done' ) {
		if($popup_row->start_day <=$now_time && $popup_row->end_day >= $now_time) {
			$popup_row->height=$popup_row->height+24;
?>


<!--레이어팝업-->

<script language="JavaScript">

function setcookie<?=$popup_row->idx?>( name, value, expirehours ) {
var todayDate = new Date();
todayDate.setHours( todayDate.getHours() + expirehours );
document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

function closeWin<?=$popup_row->idx?>() {
if ( document.notice_form<?=$popup_row->idx?>.chkbox.checked ){
	<? if($popup_stat->live==0) {?>
		setcookie<?=$popup_row->idx?>( "POPUP_COOKIE_<?=$popup_row->idx?>", "done" , 1 );
	<?} else if($popup_stat->live==1) {?>
		setcookie<?=$popup_row->idx?>( "POPUP_COOKIE_<?=$popup_row->idx?>", "done" , 365 );
	<?}?>
}

document.all['divpop<?=$popup_row->idx?>'].style.display = "none";

}

</script>

 <!--레이어팝업 끝-->

<script>
$(document).ready(function() {
  $("#divpop<?=$popup_row->idx?>").draggable();
});
</script> 


<div id="divpop<?=$popup_row->idx?>" class="ui-widget-content" style="width:<?=$popup_row->width?>px; height:<?=$popup_row->height?>px; position:absolute; left:<?=$popup_row->lefts?>px; top:<?=$popup_row->tops?>px; z-index:1000; visibility:hidden;">
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="1" bgcolor="black">
<tr>
	<td>
	<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="white">
	  <tr>
		<td width="100%" height="100%" valign="top"><? if($popup_row->display==0) {?><?=$tools->strHtml($popup_row->content);?><?} else if($popup_row->display==1) {?><? if($popup_row->link_url) {?><a href="http://<?=$popup_row->link_url;?>"><img src='../data/designImages/<?=$popup_row->popup_images;?>' border='0'></a><?} else {?><img src='../data/designImages/<?=$popup_row->popup_images;?>' border='0'><?}?><?}?></td>
	  </tr>
	  <tr>
		<td height="2" bgcolor="D6D7D6"></td>
	  </tr>
	<form name="notice_form<?=$popup_row->idx?>">
	  <tr>
		<td height="20" align="right" bgcolor="D6D7D6" class="menu" valign="bottom"><input type=checkbox name="chkbox" onclick="closeWin<?=$popup_row->idx?>();"><? if($popup_row->live==0) {?>
	오늘 하루 이창을 열지 않음<?} else if($popup_row->live==1) {?>이창은 다시는 띄우지 않음<?}?>&nbsp;&nbsp;<a href="javascript:closeWin<?=$popup_row->idx?>();"><img src="../images/bt_pop_close.gif" width="60" height="19" align="absbottom" border="0"></a>&nbsp;</td>
	  </tr>
	  <tr>
		<td height="2" bgcolor="D6D7D6"></td>
	  </tr>
	  </form>
	</table>
	</td>
</tr>
</table>
</div>

<script language="Javascript">
cookiedata = document.cookie;  
if ( cookiedata.indexOf("maindiv<?=$popup_row->idx?>=done") < 0 ){    
    document.all['divpop<?=$popup_row->idx?>'].style.visibility = "visible";
    }
    else {
        document.all['divpop<?=$popup_row->idx?>'].style.visibility = "hidden";
}
</script>

<?
	$left = $left + $popup_row->width;

		}
	}
//=====================================================================================
?>

<!-- 레이어POPUP 끝-->

<? } ?>

<?
}
//////////////////////////////////////////////////////////////// 메인 접속정보및 팝업 소스 E /////////////////////////////////////////////////////////////////////////////
?>