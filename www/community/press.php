<?
$oneNum = "2";
$twoNum = "1";
?>
<? include "../include/header.php"; ?>
		<? include "../include/sub_visual.php"; ?>	
        <div id="content" class="sub_cont">
        	<? include "left.php"; ?>
            <!-- contents -->
            <section class="contSec press">
                <h4>보도자료</h4>
                <div class="path">커뮤니티<span class="path_bar">></span>보도자료</div>
                <div class="cont">


<?
$code = "bodo";

switch($bgu){
	case "list":
		include "../bbs/bbs_list.php";
	break;

	case "view":
		include "../bbs/bbs_view.php";
	break;

	case "write":
		include "../bbs/bbs_write.php";
	break;

	case "edit":
		include "../bbs/bbs_edit.php";
	break;

	case "pass":
		include "../bbs/bbs_passwd.php";
	break;

	default :
		include "../bbs/bbs_list.php";
	break;
}
?>						

                	<!-- List ->
					<div>
						<div class="titSec">
							<span class="totalNo">1 / 340pages</span>
						</div>	            
                        <!-- 리스트 ->
                        <div class="press_list">
                            <ul>
                                <li>
                                    <a href="press_view.php">
                                        <h3 class="tit">[기사]‘제빵왕 김탁구’보다 유명한 국내 최.장.수 빵집, 이성당! <img src="../images/board/icon_new.gif" alt="New" /></h3>
                                        <span class="date">2015.07.10</span>
                                        <p class="txt">이성당(李成堂)은 전북 군산시 중앙로 1가 옛 시청 건물 맞은편에 자리한 제과점이다.<br />
                                        1945년에 문을 연 이후 67년째 한 자리를 지키고 있는 국내에서 가장 오래된 빵집이기도 하다.<br />
                                        이성당의 뿌리는 일제 강점기인 1920년대로 거슬러 올라간다. 
                                        일본인이 운영하던 ‘이즈모야’라는 화과점에서 출발해 ...</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <h3 class="tit">[기사]‘제빵왕 김탁구’보다 유명한 국내 최.장.수 빵집, 이성당! <img src="../images/board/icon_new.gif" alt="New" /></h3>
                                        <span class="date">2015.07.10</span>
                                        <p class="txt">이성당(李成堂)은 전북 군산시 중앙로 1가 옛 시청 건물 맞은편에 자리한 제과점이다.<br />
                                        1945년에 문을 연 이후 67년째 한 자리를 지키고 있는 국내에서 가장 오래된 빵집이기도 하다.<br />
                                        이성당의 뿌리는 일제 강점기인 1920년대로 거슬러 올라간다. 
                                        일본인이 운영하던 ‘이즈모야’라는 화과점에서 출발해 ...</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <h3 class="tit">[기사]‘제빵왕 김탁구’보다 유명한 국내 최.장.수 빵집, 이성당! <img src="../images/board/icon_new.gif" alt="New" /></h3>
                                        <span class="date">2015.07.10</span>
                                        <p class="txt">이성당(李成堂)은 전북 군산시 중앙로 1가 옛 시청 건물 맞은편에 자리한 제과점이다.<br />
                                        1945년에 문을 연 이후 67년째 한 자리를 지키고 있는 국내에서 가장 오래된 빵집이기도 하다.<br />
                                        이성당의 뿌리는 일제 강점기인 1920년대로 거슬러 올라간다. 
                                        일본인이 운영하던 ‘이즈모야’라는 화과점에서 출발해 ...</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <h3 class="tit">[기사]‘제빵왕 김탁구’보다 유명한 국내 최.장.수 빵집, 이성당! <img src="../images/board/icon_new.gif" alt="New" /></h3>
                                        <span class="date">2015.07.10</span>
                                        <p class="txt">이성당(李成堂)은 전북 군산시 중앙로 1가 옛 시청 건물 맞은편에 자리한 제과점이다.<br />
                                        1945년에 문을 연 이후 67년째 한 자리를 지키고 있는 국내에서 가장 오래된 빵집이기도 하다.<br />
                                        이성당의 뿌리는 일제 강점기인 1920년대로 거슬러 올라간다. 
                                        일본인이 운영하던 ‘이즈모야’라는 화과점에서 출발해 ...</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <h3 class="tit">[기사]‘제빵왕 김탁구’보다 유명한 국내 최.장.수 빵집, 이성당! <img src="../images/board/icon_new.gif" alt="New" /></h3>
                                        <span class="date">2015.07.10</span>
                                        <p class="txt">이성당(李成堂)은 전북 군산시 중앙로 1가 옛 시청 건물 맞은편에 자리한 제과점이다.<br />
                                        1945년에 문을 연 이후 67년째 한 자리를 지키고 있는 국내에서 가장 오래된 빵집이기도 하다.<br />
                                        이성당의 뿌리는 일제 강점기인 1920년대로 거슬러 올라간다. 
                                        일본인이 운영하던 ‘이즈모야’라는 화과점에서 출발해 ...</p>
                                    </a>
                                </li>
                            </ul>						
                        </div>
                        <!-- 리스트 //-->                   
                        <!-- 페이징 ->
                        <div class="pagination">
                            <a href="#" class="first"><img src="../images/board/btn_first.gif" alt="First"></a>
                            <a href="#" class="prev"><img src="../images/board/btn_prev.gif" alt="Previous"></a>
                            &nbsp;
                            <a href="#">1</a>
                            <strong>2</strong>
                            <a href="#">3</a>
                            <a href="#">4</a>
                            <a href="#">5</a>
                            <a href="#">6</a>
                            <a href="#">7</a>
                            <a href="#">8</a>
                            <a href="#">9</a>
                            <a href="#">10</a>
                            &nbsp;
                            <a href="#" class="next"><img src="../images/board/btn_next.gif" alt="Next"></a>
                            <a href="#" class="last"><img src="../images/board/btn_last.gif" alt="Last"></a>							
                        </div>
                        <!-- 페이징 //-->	
                        <!-- 검색 ->
                        <form id="" name="" action="">
                            <div class="srh_b">
                                <div class="select_search">
                                    <select name="">
                                        <option value="">제목</option>
                                        <option value="">내용</option>
                                        <option value="">등록일</option>
                                    </select>
                                    <input type="text" class="ib170" placeholder="검색어를 입력하세요">
                                    <input type="image" src="../images/board/btn_search_01.gif" title="검색" class="btn_sch"></input>
                                </div>
                            </div>
                        </form>
                        <!-- 검색 //->
                	</div>
					<!-- List //-->
                </div>
            </section>
            <!-- //contents -->
        </div>
<? include "../include/footer.php"; ?>