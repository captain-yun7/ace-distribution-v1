<? include($ROOT_DIR."/lib/page_class.php");?>
<?
$mv_data	= $_GET[bbs_data];
$bbs_data	= $tools->decode( $_GET[bbs_data] );
if( $_GET[idx] )					{ $idx = $_GET[idx]; }											else { $idx = $bbs_data[idx]; }
if( $_GET[code] )					{ $code = $_GET[code]; }
if( $_GET[listNo] )				{ $listNo = $_GET[listNo]; }									else { $listNo = $bbs_data[listNo]; }
if( $_GET[startPage] )			{ $startPage = $_GET[startPage]; }					else { $startPage	= $bbs_data[startPage]; }
if( $_POST[search_item] )	{ $search_item = $_POST[search_item]; }			else { $search_item	= $bbs_data[search_item]; }
if( $_POST[search_order] )	{ $search_order = $_POST[search_order]; }		else { $search_order	= $bbs_data[search_order]; }

if(!$code) { $tools->errMsg("잘못된 접근입니다");}
$bbs_admin_stat		=	$db->object("cs_bbs", "where code='$code'");

// 게시판 접근 권한 설정
if( $bbs_admin_stat->bbs_access == 1 ) {
	if( !$_SESSION[LEVEL] ) { $tools->errMsg('회원 전용입니다.\n\n로그인을 해주세요');}
}
?>

<script language="javascript">
<!--
function searchCheck( box) {
	if( box.checked == false ) {
		bbs_search_form.search_item.value = eval(bbs_search_form.search_item.value) - eval(box.value);
	} else {
		bbs_search_form.search_item.value = eval(bbs_search_form.search_item.value) +eval(box.value);
	}
}

function search(){
	if(bbs_search_form.selected == false)	{
		alert("검색을 체크해 주십시오.");
	} else if(bbs_search_form.search_order.value=="")	{
		alert("검색할 내용을 입력해 주십시오.");
		bbs_search_form.search_order.focus();
	} else {
		bbs_search_form.submit();
	}
}

var rollFlag=0;
function roll_up(img_num) 
{
//    document.images["roll" + img_num].src = "img/service/roll_up.gif";
}

function roll_down(img_num) 
{
//    document.images["roll" + img_num].src = "img/service/roll_down.gif";
}

function txt_roll(str)
{
    sub_num = str.substring(str.length - 2);
    sub_str = str.substring(0, str.length -2);

    if (document.all[str].style.display=="")
    {
        document.all[str].style.display="none";
        roll_up(sub_num);
        rollFlag=0;
        return;
    }
    else
        {
        if(rollFlag != 0)
        {
            document.all[sub_str+rollFlag].style.display="none";
            roll_up(rollFlag);
            document.all[str].style.display="";
            roll_down(sub_num);
        }
    
        document.all[str].style.display="";
        roll_down(sub_num);
        rollFlag=sub_num;
    }
    
}


function popup(arg,text){ 

	layer = eval("layer"+text);

 if(arg=='on'){ 
  layer.style.visibility = 'visible'; 
  layer.style.pixelTop = event.clientY+15; 
  layer.style.pixelLeft = event.clientX+10; 
 } 
 else{ 
  layer.style.visibility = 'hidden'; 
 } 
} 

function NewOpen(img,text1,text2){         
        myheight=text2; 
        mywidth=text1;        
        mysize="width="+mywidth+",height="+myheight; 
        myimage=window.open("","",mysize); 
        mysize=" width="+mywidth+" height="+myheight;
        myimage.document.write("<html><head><title>이미지크게보기</title></head>");
        myimage.document.write("<body topmargin=0 leftmargin=0>");
        myimage.document.write("<img src="+img+mysize+" onclick='self.close()' style='cursor:hand;'>");
} 
//-->
</script>



<!-----------------------------------------------------  게시판 리스트 시작 ------------------------------------------------------------------------------------------------------------------------------------->

<? if( $bbs_admin_stat->bbs_type==1 || $bbs_admin_stat->bbs_type==2) {?>

<?
	$table				= "cs_bbs_data";
	// 리스트갯수
	$listScale			=	10;
	// 페이지 갯수
	$pageScale		=	$bbs_admin_stat->list_page;
	// 스타트 페이지
	if( !$startPage ) { $startPage = 0; }
	// 토탈페이지
	$totalPage = floor($startPage / ($listScale * $pageScale));
	
	// 쿼리문 
	$query = "select * from $table where code='$code' and notice < 1";
	if($search_item){
		if($search_item==1){ $query.=" and subject like '%$search_order%'"; }
		if($search_item==4){ $query.=" and name like '%$search_order%'"; }
		if($search_item==2){ $query.=" and content like '%$search_order%'"; }
	}
	$rs = mysql_query($query);
	$totalList = mysql_num_rows($rs);

	$query = "select * from $table where code='$code' and notice < 1";
	if($search_item){
		if($search_item==1){ $query.=" and subject like '%$search_order%'"; }
		if($search_item==4){ $query.=" and name like '%$search_order%'"; }
		if($search_item==2){ $query.=" and content like '%$search_order%'"; }
	}
	$query.="  order by ref desc, re_step ASC LIMIT $startPage, $listScale";
	$result = mysql_query($query);

	// 페이지넘버
	if( $startPage ) { $listNo = $totalList - $startPage; } else { $listNo = $totalList; }
	// 라인색상 초기화
	$colorIndex=0; 
	// 답변 화살표
	$arowImage="┗";
?>


<!-- 답변형/공지사항형 시작 -->

					<? if($code=="bodo"){ ?>
					
					<div>
						<div class="titSec">
							<span class="totalNo">Total. <?=$totalList?></span>
						</div>	            
                        <!-- 리스트 -->
                        <div class="press_list">
                            <ul>


					<? } else { ?>

					<div class="board_list">
						<div class="titSec">
							<span class="totalNo">Total : <?=$totalList?></span>
						</div>						
						<!-- 리스트 -->
						<table>
						<colgroup>
						<col width="60px">
						<col width="*">
						<? if($code=="qna"){ ?><col width="90px"><? } ?>
						<col width="80px">
						<col width="60px">
						</colgroup>
						<thead>
							<tr>
								<th>번호</th>
								<th>제목</th>
								<? if($code=="qna"){ ?><th>글쓴이</th><? } ?>
								<th>등록일</th>
								<th>조회</th>
							</tr>
						</thead>
						<tbody>

					<? } ?>


<!-- 공지사항 -->
<?
	$table				= "cs_bbs_data";
	$notice_result		= $db->select( $table, "where code='$code' and notice > 0 order by idx desc" );
	while( $bbs_row = mysql_fetch_object($notice_result) ) {
		$new_check		=		$bbs_admin_stat->new_check;
		$subject			=		$tools->strCut_utf($db->stripSlash($bbs_row->subject), 100);
//		$subject			=		$tools->strHtmlNo($subject);
		$name				=		$bbs_row->name;
		$read_cnt		=		$bbs_row->read_cnt;
		$reg_date		=		$tools->strDateCut( $bbs_row->reg_date );

		$coment_cnt		=		$db->cnt("cs_bbs_coment", "where link=$bbs_row->idx");
			
		if( $new_check ) { $new_img =	$page->bbsNewImg( $bbs_row->reg_date, $bbs_admin_stat->new_mark, "<img src='../images/board/icon_new.gif' align='absmiddle'>" ); }

		$bbs_data = $tools->encode("idx=".$bbs_row->idx."&startPage=".$startPage."&listNo=".$listNo."&table=".$table."&code=".$code."&search_item=".$search_item."&search_order=".$search_order);
			
?>

							<tr>
								<td>공지</td>
								<td class="tl">
									<a href="<?=$PHP_SELF?>?bbs_data=<?=$bbs_data;?>&bgu=view" class="notice"><?=$subject?></a> <?=$new_img?>
								</td>
								<? if($code=="qna"){ ?><td class="author">관리자</td><? } ?>
								<td><?=$reg_date?></td>
								<td><?=$read_cnt?></td>
							</tr>

<?  $hot_img="";	} ?>
<!-- 공지사항 -->

<!-- bbs loop start -->
<?

	// 루프 시작
	while($bbs_row = mysql_fetch_object($result)) {
		//라인색상 초기화
		if($colorIndex%2) $bgColor=$bbs_admin_stat->list_line1; else $bgColor=$bbs_admin_stat->list_line2;			
		// 마우스 오버 색상
		$mouseColor		=		$bbs_admin_stat->mouse_over;
		$new_check			=		$bbs_admin_stat->new_check;
		$cool_check			=		$bbs_admin_stat->cool_check;

		$subject				=		$tools->strCut_utf($bbs_row->subject, 100);
//		$subject				=		$tools->strHtmlNo($subject);
		$name					=		$bbs_row->name;
		$read_cnt				=		$bbs_row->read_cnt;
		$reg_date			=		$tools->strDateCut( $bbs_row->reg_date );
		$coment_cnt		=		$db->cnt("cs_bbs_coment", "where link=$bbs_row->idx");

		//new IMG
		if( $new_check ) {	$new_img			=		$page->bbsNewImg( $bbs_row->reg_date, $bbs_admin_stat->new_mark, "<img src='../images/board/icon_new.gif' align='absmiddle'>" ); }
		// hit IMG
		if( $cool_check ) {	$cool_img				=		$page->bbsCoolImg( $bbs_admin_stat->cool_mark, $read_cnt, "<img src='/images/hit3.gif' align='absmiddle'>" ); }

		// 답변 re image view
		if($bbs_row->re_level > 0) { $wid = 7 * $bbs_row->re_level; $level_img="<img src='/img/board/icon_re.gif' border='0'>"; } else { $level_img="";}
		$bbs_data = $tools->encode("idx=".$bbs_row->idx."&startPage=".$startPage."&listNo=".$listNo."&table=".$table."&code=".$code."&search_item=".$search_item."&search_order=".$search_order);
		?>

<? if($code=="bodo"){ ?>

                                <li <? if($new_img){ ?>class="new"<? } ?>>
                                    <a href="<?=$PHP_SELF?>?bbs_data=<?=$bbs_data;?>&bgu=view">
                                        <h3 class="tit"><?=$db->stripSlash($subject);?> <?=$new_img?></h3>
                                        <span class="date"><?=$reg_date?></span>
                                        <p class="txt">
										<?=$bbs_row->content_re?>
										</p>
                                    </a>
                                </li>

<? } else { ?>
		

							<tr <? if($new_img){ ?>class="new"<? } ?>>
								<td><?=$listNo?></td>
								<td class="tl">
								<? if($_SESSION[USERID]){ ?>
									<? if($_SESSION[USERID]==$bbs_row->userid){ ?>
									<a href="<?=$PHP_SELF?>?bbs_data=<?=$bbs_data;?>&bgu=view" <? if($level_img){ ?> class="repl"<? } ?>>
									<? } else { ?>
										<? if($bbs_row->secret=="y"){ ?>	
										<a href="<?=$PHP_SELF?>?bbs_view_secr=1&bbs_data=<?=$bbs_data;?>&bgu=pass" <? if($level_img){ ?> class="repl"<? } ?>>
										<? } else { ?>
										<a href="<?=$PHP_SELF?>?bbs_data=<?=$bbs_data;?>&bgu=view" <? if($level_img){ ?> class="repl"<? } ?>>
										<? } ?>
									<? } ?>
								<? } else { ?>
									<? if($bbs_row->secret=="y"){ ?>
									<a href="<?=$PHP_SELF?>?bbs_view_secr=1&bbs_data=<?=$bbs_data;?>&bgu=pass" <? if($level_img){ ?> class="repl"<? } ?>>
									<? } else { ?>
									<a href="<?=$PHP_SELF?>?bbs_data=<?=$bbs_data;?>&bgu=view" <? if($level_img){ ?> class="repl"<? } ?>>
									<? } ?>
								<? } ?>
								<?=$db->stripSlash($subject);?></a>&nbsp;<? if($coment_cnt) {?><span class="cp">(<?=$coment_cnt;?>)</span><?}?>&nbsp;<?=$new_img?>
								</td>
								<? if($code=="qna"){ ?><td class="author">관리자</td><? } ?>
								<td><?=$reg_date?></td>
								<td><?=$read_cnt?></td>
							</tr>

<? } ?>

		<? 
			$hot_img=""; $listNo--; $colorIndex++; 
		}
		?>

<!-- bbs loop end -->

<? if($code=="bodo"){ ?>
                            </ul>						
                        </div>

<? } else { ?>

						</tbody>
						</table>

<? } ?>

<!-- 답변형/공지사항형 종료 -->



<?} else if($bbs_admin_stat->bbs_type==3) {?>

<!-- 갤러리형 시작 -->

<?

	$table				= "cs_bbs_data";
	// 리스트갯수
	$listScale			=	$bbs_admin_stat->list_height;
	// 페이지 갯수
	$pageScale		=	$bbs_admin_stat->list_page;
	// 스타트 페이지
	if( !$startPage ) { $startPage = 0; }
	// 토탈페이지
	$totalPage = floor($startPage / ($listScale * $pageScale));

	// 쿼리문 
	$query = "select * from $table where code='$code'";
	if($search_item){
		if($search_item==1){ $query.=" and subject like '%$search_order%'"; }
		if($search_item==4){ $query.=" and name like '%$search_order%'"; }
		if($search_item==2){ $query.=" and content like '%$search_order%'"; }
	}
	$rs = mysql_query($query);
	$totalList = mysql_num_rows($rs);

	$query = "select * from $table where code='$code'";
	if($search_item){
		if($search_item==1){ $query.=" and subject like '%$search_order%'"; }
		if($search_item==4){ $query.=" and name like '%$search_order%'"; }
		if($search_item==2){ $query.=" and content like '%$search_order%'"; }
	}
	$query.="  order by ref desc, re_step ASC LIMIT $startPage, $listScale";
	$result = mysql_query($query);

	// 페이지넘버
	if( $startPage ) { $listNo = $totalList - $startPage; } else { $listNo = $totalList; }
?>

                	<!-- List -->
					<div class="gallery">
						<div class="titSec">
							<span class="totalNo">Total : <?=$totalList?></span>
						</div>						
						<!-- 리스트 -->
						<div class="gy_lists">
							<ul>

<!-- bbs loop start -->
<?

	// 루프 시작
	$new_cnt = 0; $new_tr = 0; $td_width = $bbs_admin_stat->list_width ; $j=0; // 가로리스트 수
	while( $bbs_row = mysql_fetch_object($result)) {
			$new_cnt++;
			$subject				=		$tools->strCut_utf($bbs_row->subject, 25);
			$name					=		$bbs_row->name;
			$read_cnt			=		$bbs_row->read_cnt;
			$reg_date			=		$tools->strDateCut( $bbs_row->reg_date );

			$bbs_images_size=@getimagesize("../data/bbsData/$bbs_row->bbs_file");
			$bbs_images_width=""; $bbs_images_height="";
			$bbs_images_width_size=150;
			$bbs_images_height_size=100;

			if( $bbs_images_size[0] == $bbs_images_size[1] ) { $bbs_images_width = "width=".$bbs_images_width_size; $bbs_images_height = "height=".$bbs_images_height_size; } else if( $bbs_images_size[0] > $bbs_images_size[1] ) { $bbs_images_width = "width=".$bbs_images_width_size; } else if( $bbs_images_size[0] < $bbs_images_size[1]) { $bbs_images_height = "height=".$bbs_images_height_size;}
			$bbs_data = $tools->encode("idx=".$bbs_row->idx."&startPage=".$startPage."&listNo=".$listNo."&table=".$table."&code=".$code."&search_item=".$search_item."&search_order=".$search_order);

			//new IMG
			$new_img			=		$page->bbsNewImg( $bbs_row->reg_date, $bbs_admin_stat->new_mark, "<img src='/img/board/icon_new.gif' align='absmiddle'>" );

			if($bbs_row->bbs_file!="none"){
				$info = GetImageSize("../data/bbsData/".$bbs_row->bbs_file); 
			}
			$j++;

			if($bbs_row->sum_img){
				$sum_img = $bbs_row->sum_img;
			} else {
				if($bbs_row->bbs_file=="none"){
					$sum_img = "";
				} else {
					$sum_img = $bbs_row->bbs_file;
				}
			}
?>

								<? if (($new_cnt % $td_width) == 0) { $new_tr++;?>
								<li class="mrLast  <? if($new_img){ ?>new<? } ?>">
								<? } else { ?>
								<li <? if($new_img){ ?>class="new"<? } ?>>
								<? } ?>
									<a href="<?=$PHP_SELF?>?bbs_data=<?=$bbs_data;?>&bgu=view">
										<img src="/data/bbsData/<?=$sum_img;?>" width="168" height="168" alt="">
										<h4><?=$subject;?></h4>
										<span class="id_date">
											<span><?=$reg_date?></span>
										</span>
									</a>
								</li>

			<? } ?>


							</ul>
						</div>

<!-- 갤러리형 종료 -->

<?} else if($bbs_admin_stat->bbs_type==4) {?>

<!-- FAQ형 시작 -->

<table width="100%" border="0" cellspacing="0" cellpadding="0">


<!-- bbs loop start -->
<?
	$table				= "cs_bbs_data";
	// 리스트갯수
	$listScale			=	$bbs_admin_stat->list_height;
	// 페이지 갯수
	$pageScale		=	$bbs_admin_stat->list_page;
	// 스타트 페이지
	if( !$startPage ) { $startPage = 0; }
	// 토탈페이지
	$totalPage = floor($startPage / ($listScale * $pageScale));
	// 검색
	if( empty($search_item) || $search_item == 0 ) {
		$totalList	= $db->cnt( $table, "where code='$code' and notice < 1" );
		$result		= $db->select( $table, "where code='$code'  and notice < 1 order by ref desc, re_step ASC LIMIT $startPage, $listScale" );
	} else if( $search_item == 1 ) {
		$totalList	= $db->cnt( $table, "where code='$code' and notice < 1 and subject like '%$search_order%'" );
		$result		= $db->select( $table, "where code='$code' and notice < 1 and subject like '%$search_order%' order by ref desc, re_step ASC LIMIT $startPage, $listScale" );
	} else if( $search_item == 2 ) {
		$totalList	= $db->cnt( $table, "where code='$code' and notice < 1 and content like '%$search_order%'" );
		$result		= $db->select( $table, "where code='$code' and notice < 1 and content like '%$search_order%' order by ref desc, re_step ASC LIMIT $startPage, $listScale" );
	} else if( $search_item == 4 ) {
		$totalList	= $db->cnt( $table, "where code='$code' and notice < 1 and name like '%$search_order%'" );
		$result		= $db->select( $table, "where code='$code' and notice < 1 and name like '%$search_order%' order by ref desc, re_step ASC LIMIT $startPage, $listScale" );
	} else if( $search_item == 3 ) {
		$totalList	= $db->cnt( $table, "where code='$code' and notice < 1 and (subject like '%$search_order%' or content like '%$search_order%')" );
		$result		= $db->select( $table, "where code='$code' and notice < 1 and (subject like '%$search_order%' or content like '%$search_order%') order by ref desc, re_step ASC LIMIT $startPage, $listScale" );
	} else if( $search_item == 6 ) {
		$totalList	= $db->cnt( $table, "where code='$code' and notice < 1 and (content like '%$search_order%' or name like '%$search_order%')" );
		$result		= $db->select( $table, "where code='$code' and notice < 1 and (content like '%$search_order%' or name like '%$search_order%') order by ref desc, re_step ASC LIMIT $startPage, $listScale" );
	} else if( $search_item == 5 ) {
		$totalList	= $db->cnt( $table, "where code='$code' and notice < 1 and (name like '%$search_order%' or subject like '%$search_order%')" );
		$result		= $db->select( $table, "where code='$code' and notice < 1 and (name like '%$search_order%' or subject like '%$search_order%') order by ref desc, re_step ASC LIMIT $startPage, $listScale" );
	} else if( $search_item == 7 ) {
		$totalList	= $db->cnt( $table, "where code='$code' and notice < 1 and (content like '%$search_order%' or name like '%$search_order%' or subject like '%$search_order%')" );
		$result		= $db->select( $table, "where code='$code' and notice < 1 and (content like '%$search_order%' or name like '%$search_order%' or subject like '%$search_order%') order by ref desc, re_step ASC LIMIT $startPage, $listScale" );
	}

	// 페이지넘버
	if( $startPage ) { $listNo = $totalList - $startPage; } else { $listNo = $totalList; }
	// 라인색상 초기화
	$colorIndex=0; 
	// 답변 화살표
	$arowImage="┗";
	// 루프 시작
	$i = 1;
	
	while($bbs_row = mysql_fetch_object($result)) {
		//라인색상 초기화
		if($colorIndex%2) $bgColor=$bbs_admin_stat->list_line1; else $bgColor=$bbs_admin_stat->list_line2;			
		// 마우스 오버 색상
		$mouseColor		=		$bbs_admin_stat->mouse_over;
		$new_check			=		$bbs_admin_stat->new_check;
		$cool_check			=		$bbs_admin_stat->cool_check;

		$subject				=		$tools->strCut_utf($bbs_row->subject, 60);
		$content				=		$bbs_row->content;
		$name					=		$bbs_row->name;
		$read_cnt				=		$bbs_row->read_cnt;
		$reg_date			=		$tools->strDateCut( $bbs_row->reg_date );
		$coment_cnt		=		$db->cnt("cs_bbs_coment", "where link=$bbs_row->idx");

		//new IMG
		if( $new_check ) {	$new_img			=		$page->bbsNewImg( $bbs_row->reg_date, $bbs_admin_stat->new_mark, "<img src='./images/new1.gif' align='absmiddle'>" ); }
		// hit IMG
		if( $cool_check ) {	$cool_img				=		$page->bbsCoolImg( $bbs_admin_stat->cool_mark, $read_cnt, "<img src='./images/hit3.gif' align='absmiddle'>" ); }

		// 답변 re image view
		if($bbs_row->re_level > 0) { $wid = 7 * $bbs_row->re_level; $level_img="<img src='images/level.gif' width=".$wid." height=8 border='0'>$arowImage"."&nbsp;"; } else { $level_img="";}
		$bbs_data = $tools->encode("idx=".$bbs_row->idx."&startPage=".$startPage."&listNo=".$listNo."&table=".$table."&code=".$code."&search_item=".$search_item."&search_order=".$search_order);

		$ilen = strlen($i);
		if($ilen==1){ $i = "0".$i; }
		?>


  <tr> 
    <td width="50" class="Font-boardList01"><img src="../img/board/icon_q.gif"></td>
    <td class="Link-Board01" style="padding:5 0 5 0"><a onClick="txt_roll('faq<? echo $i ?>');" style="CURSOR: hand" class="board" onfocus='blur()'><strong><?=$db->stripSlash($subject);?></strong></a></td>
  </tr>
  <tr id=faq<? echo $i ?> style="DISPLAY: none"> 
    <td class="Font-boardList01">&nbsp;</td>
    <td class="Link-Board01" style="padding:15 0 15 0"><table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr> 
          <td width="50" align="center" valign="top" style="padding:2 0 0 0"><img src="../img/board/icon_a.gif"></td>
          <td><?=$content;?></td>
        </tr>
      </table></td>
  </tr>		   
		

					
		<? 
			$hot_img=""; $listNo--; $colorIndex++;
			$i = $i + 1;
		}
		?>
<!-- bbs loop end -->
		</table>

<!-- FAQ형 종료 -->

<?} else if($bbs_admin_stat->bbs_type==5) {?>

<!-- 이벤트형 시작 -->

								<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td height="20px"></td>
								</tr>
								<tr> 
									<td height="1" bgcolor="#555555"></td>
								</tr> 
								<tr> 
									<td height="10"></td>
								</tr>


<!-- bbs loop start -->
<?
	$table				= "cs_bbs_data";
	// 리스트갯수
	$listScale			=	$bbs_admin_stat->list_height;
	// 페이지 갯수
	$pageScale		=	$bbs_admin_stat->list_page;
	// 스타트 페이지
	if( !$startPage ) { $startPage = 0; }
	// 토탈페이지
	$totalPage = floor($startPage / ($listScale * $pageScale));
	// 검색
	if( empty($search_item) || $search_item == 0 ) {
		$totalList	= $db->cnt( $table, "where code='$code' and notice < 1" );
		$result		= $db->select( $table, "where code='$code'  and notice < 1 order by ref desc, re_step ASC LIMIT $startPage, $listScale" );
	} else if( $search_item == 1 ) {
		$totalList	= $db->cnt( $table, "where code='$code' and notice < 1 and subject like '%$search_order%'" );
		$result		= $db->select( $table, "where code='$code' and notice < 1 and subject like '%$search_order%' order by ref desc, re_step ASC LIMIT $startPage, $listScale" );
	} else if( $search_item == 2 ) {
		$totalList	= $db->cnt( $table, "where code='$code' and notice < 1 and content like '%$search_order%'" );
		$result		= $db->select( $table, "where code='$code' and notice < 1 and content like '%$search_order%' order by ref desc, re_step ASC LIMIT $startPage, $listScale" );
	} else if( $search_item == 4 ) {
		$totalList	= $db->cnt( $table, "where code='$code' and notice < 1 and name like '%$search_order%'" );
		$result		= $db->select( $table, "where code='$code' and notice < 1 and name like '%$search_order%' order by ref desc, re_step ASC LIMIT $startPage, $listScale" );
	} else if( $search_item == 3 ) {
		$totalList	= $db->cnt( $table, "where code='$code' and notice < 1 and (subject like '%$search_order%' or content like '%$search_order%')" );
		$result		= $db->select( $table, "where code='$code' and notice < 1 and (subject like '%$search_order%' or content like '%$search_order%') order by ref desc, re_step ASC LIMIT $startPage, $listScale" );
	} else if( $search_item == 6 ) {
		$totalList	= $db->cnt( $table, "where code='$code' and notice < 1 and (content like '%$search_order%' or name like '%$search_order%')" );
		$result		= $db->select( $table, "where code='$code' and notice < 1 and (content like '%$search_order%' or name like '%$search_order%') order by ref desc, re_step ASC LIMIT $startPage, $listScale" );
	} else if( $search_item == 5 ) {
		$totalList	= $db->cnt( $table, "where code='$code' and notice < 1 and (name like '%$search_order%' or subject like '%$search_order%')" );
		$result		= $db->select( $table, "where code='$code' and notice < 1 and (name like '%$search_order%' or subject like '%$search_order%') order by ref desc, re_step ASC LIMIT $startPage, $listScale" );
	} else if( $search_item == 7 ) {
		$totalList	= $db->cnt( $table, "where code='$code' and notice < 1 and (content like '%$search_order%' or name like '%$search_order%' or subject like '%$search_order%')" );
		$result		= $db->select( $table, "where code='$code' and notice < 1 and (content like '%$search_order%' or name like '%$search_order%' or subject like '%$search_order%') order by ref desc, re_step ASC LIMIT $startPage, $listScale" );
	}

	// 페이지넘버
	if( $startPage ) { $listNo = $totalList - $startPage; } else { $listNo = $totalList; }
	// 라인색상 초기화
	$colorIndex=0; 
	// 답변 화살표
	$arowImage="┗";
	// 루프 시작
	$i = 1;
	
	while($bbs_row = mysql_fetch_object($result)) {
		//라인색상 초기화
		if($colorIndex%2) $bgColor=$bbs_admin_stat->list_line1; else $bgColor=$bbs_admin_stat->list_line2;			
		// 마우스 오버 색상
		$mouseColor		=		$bbs_admin_stat->mouse_over;
		$new_check			=		$bbs_admin_stat->new_check;
		$cool_check			=		$bbs_admin_stat->cool_check;

		$subject				=		$tools->strCut_utf($bbs_row->subject, 60);
		$content				=		$tools->strCut_utf($bbs_row->content, 120);
		$name					=		$bbs_row->name;
		$read_cnt				=		$bbs_row->read_cnt;
		$reg_date			=		$tools->strDateCut( $bbs_row->reg_date );
		$coment_cnt		=		$db->cnt("cs_bbs_coment", "where link=$bbs_row->idx");

		//new IMG
		if( $new_check ) {	$new_img			=		$page->bbsNewImg( $bbs_row->reg_date, $bbs_admin_stat->new_mark, "<img src='./images/new1.gif' align='absmiddle'>" ); }
		// hit IMG
		if( $cool_check ) {	$cool_img				=		$page->bbsCoolImg( $bbs_admin_stat->cool_mark, $read_cnt, "<img src='./images/hit3.gif' align='absmiddle'>" ); }

		// 답변 re image view
		if($bbs_row->re_level > 0) { $wid = 7 * $bbs_row->re_level; $level_img="<img src='images/level.gif' width=".$wid." height=8 border='0'>$arowImage"."&nbsp;"; } else { $level_img="";}
		$bbs_data = $tools->encode("idx=".$bbs_row->idx."&startPage=".$startPage."&listNo=".$listNo."&table=".$table."&code=".$code."&search_item=".$search_item."&search_order=".$search_order);

		$ilen = strlen($i);
		if($ilen==1){ $i = "0".$i; }
		?>

								<tr>
									<td valign="top">
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
										<tr>
											<td width="302px" valign="top">
												<table width="100%" cellpadding="2" cellspacing="0" border="1" bordercolor='#DADADA' style='border-collapse: collapse'>
												<tr>
													<td><a href="<?=$PHP_SELF?>?bbs_data=<?=$bbs_data;?>&bgu=view&pageNum=<?=$pageNum?>&cate=<?=$cate?>"><img src="/data/bbsData/<?=$bbs_row->bbs_file;?>" width=300 height=110 border="0"></a></td>
												</tr>
						                      </table>
											</td>
											<td width="24px"></td>
											<td valign="top">
												<table width="100%" border="0" cellspacing="0" cellpadding="0">
												<tr>
													<td height="5px"></td>
												</tr>
												<tr>
													<td class="board_list3" align=left><a href="<?=$PHP_SELF?>?bbs_data=<?=$bbs_data;?>&bgu=view&pageNum=<?=$pageNum?>&cate=<?=$cate?>"><?=$subject;?></a></td>
												</tr>
												<tr>
													<td height="5px"></td>
												</tr>
												<tr>
													<td class="board_list2" align=left><a href="<?=$PHP_SELF?>?bbs_data=<?=$bbs_data;?>&bgu=view&pageNum=<?=$pageNum?>&cate=<?=$cate?>"><?=$content;?></a></td>
												</tr>
												<tr>
													<td height="20px"></td>
												</tr>
												<tr>
													<td class="board_list2" align=left><font color="#eaab80">이벤트 기간 : <?=$bbs_row->sdate?> ~ <?=$bbs_row->edate?></font></td>
												</tr>
												</table>
											</td>
										</tr>
										</table>
									</td>
								</tr>
								<tr> 
									<td height="30"></td>
								</tr>
					
		<? 
			$hot_img=""; $listNo--; $colorIndex++;
			$i = $i + 1;
		}
		?>
<!-- bbs loop end -->
		</table>

<!-- 이벤트형 종료 -->

<?}?>

						<? if($bbs_admin_stat->bbs_write!=9) {?>
						<div class="btnSec tr">
							<span class="button large blue"><a href="<?=$PHP_SELF?>?bbs_data=<?=$mv_bbs=$tools->encode("idx=".$bbs_row->idx."&startPage=".$startPage."&listNo=".$listNo."&table=".$table."&code=".$code."&search_item=".$search_item."&search_order=".$search_order);?>&bgu=write">글쓰기</a></span>
						</div>
						<? } ?>


						<!-- 페이징 -->
						<div class="pagination">

<? $page->bbs2( $code, $table, $totalPage, $totalList, $listScale, $pageScale, $startPage, "<img src='../images/board/btn_prev.gif' border='0'>", "<img src='../images/board/btn_next.gif' border='0'>", $search_item, $search_order );?>
						
						</div>
						<!-- 페이징 //-->	
						<!-- 검색 -->
						<form name="bbs_search_form" method="post" action="<?=$_SERVER[PHP_SELF];?>?code=<?=$code?>">
							<div class="srh_b">
								<div class="select_search">
									<select name="search_item">
									<option value="1">제목</option>
									<option value="2">내용</option>
									<? if($code=="qna"){ ?>
									<option value="4">글쓴이</option>
									<? } ?>
									</select>
									<input name="search_order" type="text" class="ib170" placeholder="검색어를 입력하세요">
									<a href="javascript:search();"><img src="/images/board/btn_search_01.gif" title="검색" class="btn_sch"></a>
								</div>
							</div>
						</form>
						<!-- 검색 //-->
