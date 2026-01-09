<!-- left -->
<section class="leftSec">
    <h3>제품소개</h3>            
    <!-- lnb -->
    <nav id="lnb" class="product_lnb">
        <ul>
             <li style="background:none !important"><a href="all_list.php" style="background:none !important">전체</a></li><!-- 처음 나오는 "전체"는 디폴트임 -->
             
			 <?
			 $query = "select * from cs_part where part_display_check='1' and part_index='1' order by part_ranking asc, idx asc";
			 $rs = mysql_query($query);
			 while($row = mysql_fetch_array($rs)){
			 ?>
			 
			 <li>
             	<a href="product_list.php?part1_idx=<?=$row[idx]?>"><?=$row[part_name]?></a>
             	<div class="lnbTwo" style="display:none">
                    <a href="product_list.php?part1_idx=<?=$row[idx]?>">전체</a>
					<?
					$query2 = "select * from cs_part where part_display_check='1' and part1_code='$row[part1_code]' and part_index='2' order by part_ranking asc, idx asc";
					$rs2 = mysql_query($query2);
					while($row2 = mysql_fetch_array($rs2)){
					?>
                    <a href="product_list.php?part1_idx=<?=$row[idx]?>&part_idx=<?=$row2[idx]?>"><?=$row2[part_name]?></a>
					<? } ?>
                </div>
             </li>

			 <? } ?>
             <!-- <li>
             	<a href="#">햇쌀마루</a>
             	<div class="lnbTwo" style="display:none">
                    <a href="#">전체</a>
                    <a href="#">제품1</a>
                    <a href="#">제품2</a>
                </div>
             </li>
             <li class="bbLast">
             	<a href="#">화과방</a>
             	<div class="lnbTwo" style="display:none">
                    <a href="#">전체</a>
                    <a href="#">제품1</a>
                    <a href="#">제품2</a>
                </div>
             </li> -->
        </ul>
    </nav>
    <!-- //lnb -->            
    <? include "../include/sub_left_banner.php"; ?>
</section>
<!-- //left -->