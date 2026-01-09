<? include "include/header.php"; ?>
<? include "lib/page_class.php"; ?>

    	<!-- main visual -->
        <article class="main_visual">
            <div id="slides">
                <div class="slide4"></div>
                <div class="slide5"></div>
                <div class="slide6"></div>
            </div>
        </article>
        <!-- //main visual -->
        
        <div id="content" class="main_cont">
            <!-- 공지사항 -->
            <article class="main_notice">
                <h2>공지사항</h2>
                <ul>
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
					<li><a href="/community/notice.php?bgu=view&bbs_data=<?=$bbs_data;?>"><?=$db->stripSlash($subject);?></a> <span class="date"><? echo substr($notice_row->reg_date,0,-9) ?></span></li>
<? } ?>
                    <!-- <li><a href="#">사무실 이전 공지드립니다.</a> <span class="date">2015.06.10</span></li>
                    <li><a href="#">베스트 제품 추천!</a> <span class="date">2015.05.30</span></li>
                    <li><a href="#">새로운 제품이 나왔습니다~</a> <span class="date">2015.05.01</span></li>
                    <li><a href="#">홈페이지 오픈 안내!</a> <span class="date">2015.04.28</span></li> -->
                </ul>
                <p class="btn_more"><a href="/community/notice.php">더보기<span> ▶</span></a></p>
            </article>
            <!-- //공지사항 -->
            
            <!-- 추천제품 -->
            <article class="main_product">
                <h2>추천제품</h2>
                <div id="jqb_object">	
                    <div class="jqb_slides">
<?
$query = "select * from cs_goods where display='1' and main_position='1' order by ranking asc, idx asc";
$rs = mysql_query($query);
while($row = mysql_fetch_array($rs)){

	$content = $tools->strCut_utf(strip_tags($row[content]), 110);
?>
						<div class="jqb_slide">
                        	<a href="/product/product_view.php?idx=<?=$row[idx]?>">
                            <span class="thumb_box"><img src="/data/goodsImages/<?=$row[images1]?>" width="74" height="109" alt=""></span>
                            <div class="txt">
                                <h3><?=$row[name]?></h3>
                                <span class="desc"><?=$content?></span>
                            </div>
                        	</a>
                        </div>
<? } ?>
                        <!-- <div class="jqb_slide">
                        	<a href="#">
                            <span class="thumb_box"><img src="images/product_thumb_img.gif" alt=""></span>
                            <div class="txt">
                                <h3>블로드 초콜릿 둘세 32%</h3>
                                <span class="desc">진한 비스킷 향과 함께 소금기있는 달콤한 맛과 크리미한 질감이 특징</span>
                            </div>
                        	</a>
                        </div>
                        <div class="jqb_slide">
                        	<a href="#">
                            <span class="thumb_box"><img src="images/product_thumb_img.gif" alt=""></span>
                            <div class="txt">
                                <h3>블로드 초콜릿 둘세 32%</h3>
                                <span class="desc">진한 비스킷 향과 함께 소금기있는 달콤한 맛과 크리미한 질감이 특징</span>
                            </div>
                        	</a>
                        </div> -->
                    </div>               
                    <div class="jqb_bar"> 
                        <div class="jqb_info"></div>
                        <div id="btn_next" class="jqb_btn jqb_btn_next"></div>
                        <div id="btn_pauseplay" class="jqb_btn jqb_btn_pause"></div>
                        <div id="btn_prev" class="jqb_btn jqb_btn_prev"></div>
                    </div>                
                </div>
            </article>
            <!-- //추천제품 -->
            
            <!-- 온라인 문의 -->
            <article class="main_inquiry">
            	<h2><sup>Online Inquiry </sup>온라인 문의</h2>
                <p class="txt">제품/주문관련 답변 드립니다.</p>
                <p class="btn_more"><a href="/inquiry/inquiry.php" title="MORE">MORE <span>></span></a></p>
            </article>
            <!-- //온라인 문의 -->
            
            <!-- main banner -->
            <article class="main_banner">
            	<dl class="m_b_1">
                	<a href="/community/recipe.php">
                	<dt>레시피</dt>
                    <dd>건강한빵, 쿠키 만들기</dd>
                    </a>
                </dl>
            	<dl class="m_b_2">
                	<a href="/community/q_a.php">
                	<dt>Q&amp;A</dt>
                    <dd>제품 관련 질문과 답변</dd>
                    </a>
                </dl>
            	<dl class="m_b_3">
                	<a href="/community/press.php">
                	<dt>보도자료</dt>
                    <dd>신문, 방송관련 기사</dd>
                    </a>
                </dl>
            	<dl class="m_b_4 brLast">
                	<a href="/about/location.php">
                	<dt>찾아오시는길</dt>
                    <dd>회사 연락처 및 약도 안내</dd>
                    </a>
                </dl>
            </article>
            <!-- //main banner -->
        </div>
<? include "include/footer.php"; ?>

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