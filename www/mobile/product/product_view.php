<?
$oneNum = "2";
$twoNum = "1";
?>
<? include "../include/dtd.php"; ?>
<? include "../include/header.php"; ?>
<?

$part1_idx = $_GET['part1_idx'];

if($part1_idx){

$query = "select * from cs_part where idx='$part1_idx'";
$rs = mysql_query($query);
$row2 = mysql_fetch_array($rs);
$part_name = $row2[part_name];
$part1_code = $row2[part1_code];

} else {

$part_name = "전체";

}

?>

<div id="sub_visual">
	<div class="sv_2"></div>   
</div>
<div class="menu-location cm-drop-menu-box-JS" data-drop-event="click">
	<button class="cur-location cm-drop-open-btn-JS">
		<span><?=$part_name?></span> <!-- 현재 클릭된 해당되는 제품의 타이틀이 들어갑니다. -->
		<i class="xi-angle-down-min"></i>
	</button>
	<ul class="location-menu-con cm-drop-list-JS">
									<li><a href="/mobile/product/product_list.php">전체</a></li>
									<?
									$query = "select * from cs_part where part_display_check='1' and part_index='1' order by part_ranking asc, idx asc";
									$rs = mysql_query($query);
									while($row = mysql_fetch_array($rs)){
									?>
									<li><a href="/mobile/product/product_list.php?part1_idx=<?=$row[idx]?>"><?=$row[part_name]?></a></li>
									<? } ?>

	</ul>	
</div>
<?
$query = "select * from cs_goods where idx='$idx'";
$rs = mysql_query($query);
$row = mysql_fetch_array($rs);

		$content = $row[content];
		$content = str_replace("<P>","",$content);
		$content = str_replace("</P>","<br/>",$content);
		$content = str_replace("<p>","",$content);
		$content = str_replace("</p>","<br/>",$content);
?>
<div id="content" class="sub_cont">
	<section class="contSec product-view">
		<div class="area-padding-m">
			<div class="pro-view-img">
				<img src="/data/goodsImages/<?=$row[images2]?>" alt="">
			</div>
			<div class="pro-view-info">
				<h4><?=$row[name]?></h4>
				<p class="txt"><?=$content?></p>
				<div class="pvi_feature">
                         <h5>제품특징</h5>
                         <p><?=nl2br($row[company])?></p>
				 </div>
			</div>
			<a href="javascript:;" onclick="history.go(-1);" class="go-list-btn">목록</a>
			<? include "../include/foot_inquiry.php"; ?>
		</div>
	</section>
</div>
<? include "../include/footer.php"; ?>