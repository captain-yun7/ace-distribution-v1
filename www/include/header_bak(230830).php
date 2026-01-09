<? include $_SERVER["DOCUMENT_ROOT"]."/common.php"; ?>
<!DOCTYPE HTML>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="Content-Script-Type" content="text/javascript">
<meta http-equiv="Content-Style-Type" content="text/css">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=1000">
<title>에이스유통(주)</title>
<link rel="stylesheet" type="text/css" href="/css/reset.css">
<link rel="stylesheet" type="text/css" href="/css/style.css">
<link rel="stylesheet" type="text/css" href="/css/board.css">
<link rel="stylesheet" type="text/css" href="/css/button.css">
<link rel="stylesheet" type="text/css" href="/css/thickbox.css">
<link rel="stylesheet" type="text/css" href="/css/editor.css">
<link rel="stylesheet" type="text/css" href="/css/cm_member.css?ver=230811">
<link rel="stylesheet" type="text/css" href="/css/cm_bbs_common.css">
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<script type="text/javascript" src="/js/jquery-1.8.2.min.js"></script>
<script type="text/javascript" src="/js/jquery.slides.min.js"></script>
<script type="text/javascript" src="/js/jqbanner.js"></script>
<script type="text/javascript" src="/js/gnb.js"></script>
<script type="text/javascript" src="/js/lnb.js"></script>
<script type="text/javascript" src="/js/common.js"></script>
<script type="text/javascript" src="/js/thickbox.js"></script>
<script type="text/javascript" src="/js/utile.js"></script>

<? if(!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS']==""){ ?>
<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
<? } else { ?>
<script src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js"></script>
<? } ?>

<!--[if lt IE 9]>
	<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
</head>

<body>
<!-- accessibility -->
<div class="accessibility">
	<a href="#container">본문 바로가기</a>
</div>
<!-- //accessibility -->

<div id="wrap">
    <!-- header -->
    <header id="header">
    	<div class="h_inner">
            <h1><a href="/index.php" title="홈으로">에이스유통(주)</a></h1>
            
            <!-- gnb -->
            <nav id="gnb">
                <ul>
                    <li class="blFirst"><a href="/about/greeting.php">회사소개</a>
                        <ul>
                            <li><a href="/about/greeting.php">인사말</a></li>
                            <!--li><a href="/about/history.php">연혁</a></li-->
                            <li><a href="/about/location.php">찾아오시는길</a></li>
                        </ul>
                    </li>
                    <li><a href="/product/all_list.php">제품소개</a>
                        <ul>
                            <li><a href="/product/all_list.php">전체</a></li>
                            <?
							$query = "select * from cs_part where part_display_check='1' and part_index='1' order by part_ranking asc, idx asc";
							$rs = mysql_query($query);
							while($row = mysql_fetch_array($rs)){
							?>
							<li><a href="/product/product_list.php?part1_idx=<?=$row[idx]?>"><?=$row[part_name]?></a></li>
							<? } ?>
                        </ul>
                    </li>
                    <li><a href="/community/notice.php">커뮤니티</a>
                        <ul>
                            <li><a href="/community/notice.php">공지사항</a></li>
                            <li><a href="/community/press.php">보도자료</a></li>
                            <li><a href="/community/recipe.php">레시피</a></li>
                            <li><a href="/community/q_a.php">Q&amp;A</a></li>
                        </ul>
                    </li>
				<!-- <li><a href="/recruit/offer_01.php">구인구직</a>
				                        <ul>
				                            <li><a href="/recruit/offer_01.php">구인</a></li>
				                            <li><a href="/recruit/offer_02.php">구직</a></li>
				                        </ul>
				                    </li> -->
                    <li><a href="/inquiry/inquiry.php">온라인 문의</a></li>
                </ul>
            </nav>
            <!-- //gnb -->
            
            <div class="util">
                <ul>
                    <li><a href="/index.php">HOME</a></li>
                    <li><a href="/about/location.php">CONTACT</a></li>
                    <li><a href="#" id="sitemap_view">SITEMAP</a></li>
                </ul>
            </div>
        </div>
    </header>
    <!-- //header -->
    
    <div class="active_bg"></div>
    
    <!-- container -->
	<section id="container">