<? $mod=menu02 ?>
<?include ("../header.php");?>
<?
include($_SERVER['DOCUMENT_ROOT']."/lib/page_class.php");


// 게시판 환경
if(!$code) { $tools->errMsg("잘못된 접근입니다");}
$bbs_stat		=	$db->object("cs_bbs", "where code='$code'");
?>

<script language="JavaScript">
<!--
function allCheck()
{
	var f = document.forms['listform'];
	if(typeof(f.del_list) == 'object') {
		if(f.allchk.checked) {
			if(f.del_list.length) for (var i=0;i<f.del_list.length;i++) f.del_list[i].checked=true;
			else f.del_list.checked=true
		} else {
			if(f.del_list.length) for (var i=0;i<f.del_list.length;i++) f.del_list[i].checked=false;
			else  f.del_list.checked=false;
		}
	} else {
		if(f.allchk.checked) {
			alert('선택할 글이 없습니다.');f.allchk.checked = false;return;
		} else return;
	}
}

function actSelect()
{
	var f = document.forms['listform'];
	var arr_del_list = new Array();
	var i,j;
	if(typeof(f.del_list) == 'object') {
		if(f.del_list.length) {
			for (i=0,j=0;i<f.del_list.length;i++) { if(f.del_list[i].checked) { arr_del_list[i] = f.del_list[i].value;j++; }}
			if(!j) { alert('글을 선택하여 주세요.');return; }
			else f.arr_del_list.value = arr_del_list.join('@');
		} else {
			if(!f.del_list.checked) { alert('글을 선택하여 주세요.');return; }
		}
		if(j==1) f.arr_del_list.value = '';
		if(confirm('삭제하시겠습니까?')) f.submit();
	} else {
		alert('선택할 글이 없습니다.');	return;
	}
}
//-->
</script>



<!-- 검색 -->
		<form action="<?=$PHP_SELF?>" method="get" name="search_form" id="search_form" class="form-inline">
			<input type="hidden" name="code" value="<?=$code?>">
			<input type="hidden" name="startPage" value="<?=$startPage?>">
			<input type="hidden" name="listNo" value="<?=$listNo?>">
			<input type="hidden" name="table" value="<?=$table?>">
			<input type="hidden" name="menu" value="<?=$menu?>">
			<div class="well well-small">
				<table>
					<tr>
						<td width="500px;">
							<select name="search_item"  class="form-control" >
								<option value="">전체</option>
								<option value="1" <?if($search_item=="1"){?>selected<?}?>>제목</option>
								<option value="2" <?if($search_item=="2"){?>selected<?}?>>내용</option>
								<option value="4" <?if($search_item=="4"){?>selected<?}?>>작성자</option>
							</select>
							<input type="text" name="search_order" class="form-control" id="search_order" value="<?=$search_order?>" placeholder="Search"/>
							<button style="submit" class="btn btn- btn-primary" title="검색"> <span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>							
						</td>
					</tr>
				</table>
			</div>
		</form>
<!-- //검색 -->		


			<form method="get" action="bbs_list_ok.php" name="listform">
			<input type="hidden" name="code" value="<?=$code;?>">
			<input type="hidden" name="arr_del_list">
			<input type="hidden" name="menu" value="<?=$menu?>">
			

		
			<div>
				<h3 class="page-header">게시판 관리(<?=$bbs_stat->name;?>)</h3>
			</div>



						<!-- 공지형 & 답변형 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
						<? if( $bbs_stat->bbs_type==1 || $bbs_stat->bbs_type==2 || $bbs_stat->bbs_type==4 || $bbs_stat->bbs_type==3) {?>

						<table class="table table-bordered table-hover ">
							<caption></caption>
									<colgroup>
										<col width="10%">
										<col width="*">
										<col width="10%">
										<col width="15%">
										<col width="10%">
										<? if( $bbs_stat->bbs_pds ) {?>
										<col width="10%">
										<? }?>
									</colgroup>
								<thead>
									<tr>
										<th><input type="checkbox" name="allchk" onClick="allCheck();this.blur()"></th>
										<th>타이틀</th>
										<th>이 름</th>
										<th>작성일</th>
										<th>조회수</th>
										<? if( $bbs_stat->bbs_pds ) {?>
										<th>파일</th>
										<? }?>
									</tr>
								</thead>
							<tbody>


							<!-- 게시판 목록에서 공지형 글 ---------------------------------------------------------------------------------------------------------------------------------------------------------------->
							<?
							$table				= "cs_bbs_data";
							$notice_result		= $db->select( $table, "where code='$code' and notice > 0 order by idx desc" );
							while( $row = mysql_fetch_object($notice_result) ) {
								$new_check		=		$bbs_stat->new_check;
								$subject			=		$tools->strCut_utf($row->subject, 55);
								$name				=		$row->name;
								$read_cnt		=		$row->read_cnt;
								$reg_date		=		$tools->strDateCut( $row->reg_date );
								$coment_cnt		=		$db->cnt("cs_bbs_coment", "where link=$row->idx");

								if( $new_check ) { $new_img =	$page->bbsNewImg( $row->reg_date, $bbs_stat->new_mark, "<span class='label label-danger'>New</span>" ); }
							?>



								<tr>
								  <td height="20px" class="text-center"><font class="btn btn-xs btn-warning">공지</font></td>
								  <td>
									<a href="bbs_view.php?idx=<?=$row->idx;?>&menu=<?=$menu;?>&startPage=<?=$startPage;?>&listNo=<?=$listNo;?>&table=<?=$table;?>&code=<?=$code;?>&search_item=<?=$search_item;?>&search_order=<?=$search_order;?>&bbs_data=<?=$bbs_data;?>"><?=$db->stripSlash($subject);?></a>
									<? if($coment_cnt) {?><span class="cp_bk">(<?=$coment_cnt;?>)</span><?}?>&nbsp;<?=$new_img?>
								  </td>
								  <td class="text-center"><?=$name?></td>
								  <td class="text-center"><?=$reg_date?></td>
								  <td class="text-center"><?=$read_cnt?></td>
								  <? if( $bbs_stat->bbs_pds ) {?>
								  <td class="text-center">
										<? if( $row->bbs_file != "none" ) {?><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span><?}?>
								  </td>
								  <? }?>
								</tr>




							<?  $hot_img="";	} ?>


							<!-- 게시판 목록에서 공지형 글 ---------------------------------------------------------------------------------------------------------------------------------------------------------------->

							<!-- 게시판 목록 ---------------------------------------------------------------------------------------------------------------------------------------------------------------->
							<?
							$table				= "cs_bbs_data";
							// 리스트갯수
							$listScale			= $bbs_stat->list_height;
							// 페이지 갯수
							$pageScale		=	$bbs_stat->list_page;
							// 스타트 페이지
							if( !$startPage ) { $startPage = 0; }
							// 토탈페이지
							$totalPage = floor($startPage / ($listScale * $pageScale));
							// 검색
							if($search_order){
									$search_order=$search_order; //넘어오는 값 변수 설정
									$search_order=trim($search_order); //앞뒤 공백 제거
									$search_order=str_replace(' ', '', $search_order);
							}

							$query = "select * from $table where code='$code' and notice < 1";



									if($search_item==1){ $query.=" and replace(subject, ' ', '') like  '%$search_order%'"; }
									if($search_item==4){ $query.=" and replace(name, ' ', '') like  '%$search_order%'"; }
									if($search_item==2){ $query.=" and replace(content, ' ', '') like  '%$search_order%'"; }
									if($search_item==""){ $query.=" and (replace(subject, ' ', '') like  '%$search_order%' or replace(content, ' ', '') like '%$search_order%' or replace(name, ' ', '') like '%$search_order%')"; }


							$rs = mysql_query($query);
							$totalList = mysql_num_rows($rs);

							$query = "select * from $table where code='$code' and notice < 1";
							if($bbs_year){$query.=" and bbs_year='$bbs_year'";}


									if($search_item==1){ $query.=" and replace(subject, ' ', '') like  '%$search_order%'"; }
									if($search_item==4){ $query.=" and replace(name, ' ', '') like  '%$search_order%'"; }
									if($search_item==2){ $query.=" and replace(content, ' ', '') like  '%$search_order%'"; }
									if($search_item==""){ $query.=" and (replace(subject, ' ', '') like  '%$search_order%' or replace(content, ' ', '') like '%$search_order%' or replace(name, ' ', '') like '%$search_order%')"; }


							$query.="  order by ref desc, re_step ASC LIMIT $startPage, $listScale";
							$result = mysql_query($query);

							// 페이지넘버
							if( $startPage ) { $listNo = $totalList - $startPage; } else { $listNo = $totalList; }
							// 라인색상 초기화
							$colorIndex=0;
							// 답변 화살표
							$arowImage="┗";
							// 루프 시작
							while( $bbs_row = mysql_fetch_object($result)) {
								//라인색상 초기화
								if($colorIndex%2) $bgColor=$bbs_stat->list_line1; else $bgColor=$bbs_stat->list_line2;
								// 제목
								$subject				=		$tools->strCut_utf($bbs_row->subject, 80);
								$name					=		$bbs_row->name;
								// 조회수
								$read_cnt			=		$bbs_row->read_cnt;
								// 작성일
								$reg_date			=		$tools->strDateCut( $bbs_row->reg_date );
								// 코멘드 글수
								$coment_cnt		=		$db->cnt("cs_bbs_coment", "where link=$bbs_row->idx");
								//new IMG
								if($bbs_stat->new_check) {$new_img =$page->bbsNewImg( $bbs_row->reg_date, $bbs_stat->new_mark, "<span class='label label-danger'>New</span>" ); }
								// hit IMG
								if($bbs_stat->cool_check) {$cool_img	=$page->bbsCoolImg( $bbs_stat->cool_mark, $read_cnt, "<img src='../images/hit3.gif' align='absmiddle'>" ); }

								// 답변 re image view
								if($bbs_row->re_level > 0){ $wid = 7 * $bbs_row->re_level; $level_img="<img src='../images/level.gif' width=".$wid." height=8 border='0'>$arowImage"."&nbsp;"; } else $level_img="";
								// 게시판 정보 엔코딩

							?>


							<tr>
							    <td class="text-center"><input type="checkbox"  name="del_list" value="<?=$bbs_row->idx;?>"></td>
							    <td>
									<?=$level_img?><?=$cool_img?>
									<? if($bbs_row->secret=="y"){ ?>
										<a href="bbs_passwd.php?bbs_view_secr=1&idx=<?=$bbs_row->idx;?>&menu=<?=$menu;?>&startPage=<?=$startPage;?>&listNo=<?=$listNo;?>&table=<?=$table;?>&code=<?=$code;?>&search_item=<?=$search_item;?>&search_order=<?=$search_order;?>">
									<? } else { ?>
										<a href="bbs_view.php?&idx=<?=$bbs_row->idx;?>&menu=<?=$menu;?>&startPage=<?=$startPage;?>&listNo=<?=$listNo;?>&table=<?=$table;?>&code=<?=$code;?>&search_item=<?=$search_item;?>&search_order=<?=$search_order;?>">
									<? } ?>
									<?=$db->stripSlash($subject);?></a>&nbsp;
									<? if($coment_cnt) {?><span class="cp_bk">(<?=$coment_cnt;?>)</span><?}?>&nbsp;<?=$new_img?>
									<? if($bbs_row->secret=="y"){ ?><span class="glyphicon glyphicon-lock" aria-hidden="true"></span><? } ?>

								</td>
							    <td class="text-center"><?=$name?></td>
							    <td class="text-center"><?=$reg_date?></td>
							    <td class="text-center"><?=$read_cnt?></td>

								<? if( $bbs_stat->bbs_pds ) {?>
								<td class="text-center"><? if( $bbs_row->bbs_file != "none" ) {?><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span><?}?></td>
								<? }?>
							</tr>

							<?
								$hot_img=""; $listNo--; $colorIndex++;
							}
							?>

							</tbody>
						</table>

						<?}?>


<!-- 페이징 -->
		<div align="center">
			<nav>
			  <ul class="pagination">

			<?
				if( $totalList > $listScale ) {
					if( $startPage+1 > $listScale*$pageScale ) {
						$prePage = $startPage - $listScale * $pageScale;

						echo "<li><a href='$_SERVER[PHP_SELF]?menu=$menu&startPage=$prePage&code=$code&table=$table&search_item=$search_item&search_order=$search_order' ><span aria-hidden='true'>&laquo;</span></a></li>";
					}

					for( $j=0; $j<$pageScale; $j++ ) {
						$nextPage = ($totalPage * $pageScale + $j) * $listScale;
						$pageNum = $totalPage * $pageScale + $j+1;
						if( $nextPage < $totalList ) {
							if( $nextPage!= $startPage ) {

								echo "<li><a href='$_SERVER[PHP_SELF]?menu=$menu&startPage=$nextPage&code=$code&table=$table&search_item=$search_item&search_order=$search_order' >$pageNum</a></li>";
							} else {
								echo " <li class='active'><a href='#none'>$pageNum</a></li>";
							}
						}
					}

					if( $totalList > (($totalPage+1) * $listScale * $pageScale)) {
						$nNextPage = ($totalPage+1) * $listScale * $pageScale;

						echo "<li><a href='$_SERVER[PHP_SELF]?menu=$menu&startPage=$nNextPage&code=$code&search_item=$search_item&table=$table&search_order=$search_order'><span aria-hidden='true'>&raquo;</span></li>";
					}
				}
				if( $totalList <= $listScale) {
					echo "<li class='active'><a href='#none' >1</a></li>";
				}
			?>
				 </ul>
			</nav>
		</div>
<!-- //페이징 -->



	<table class="table">
		<tr>
			<td class="text-left"><a href="javascript:actSelect()" class="btn btn-danger">삭제</a></td>
			<td class="text-right"><a href="bbs_write.php?menu=<?=$menu;?>&idx=<?=$bbs_row->idx;?>&startPage=<?=$startPage;?>&listNo=<?=$listNo;?>&table=<?=$table;?>&code=<?=$code;?>&search_item=<?=$search_item;?>&search_order=<?=$search_order;?>" class="btn btn-primary">등록</a></td>
		</tr>
	</table>



<? include('../footer.php');?>

