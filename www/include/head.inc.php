<?
if($_GET[CACHE] or $HTTP_GET_VARS[CACHE]) { session_cache_limiter('nocache, must-revalidate'); }
$randnum = date("YmdHis");
setcookie("HABY_IndexId", $randnum."_1", 0 , "/");
session_start();
// 장바구니 아이디 생성
if(empty($_SESSION[CART])) { $CART=md5(uniqid(rand())); @session_register("CART") or die("session_register CART_ID err");}
// 기본 클래스 불러오기
include('../common.php');
// 관리자 정보 불러오기
$admin_stat = $db->object("cs_admin", "");
?>
<html>
<head>
<title><?=$admin_stat->title_bar;?></title>
<meta http-equiv="Content-Type" content="text/html; charset=euc-kr">

<!-- 상태바 출력 -->
<script language="JavaScript">
<!--
window.status='<?=$admin_stat->status_bar;?>';
//-->
</script>


<script language="javascript" type="text/javascript">
<!--
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
//-->
</script>
<script language="JavaScript" type="text/JavaScript">
<!--
function MM_reloadPage(init) {  //reloads the window if Nav4 resized
  if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
    document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
  else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}
MM_reloadPage(true);

function MM_showHideLayers() { //v6.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
    obj.visibility=v; }
}

// 정렬 방식
function orderChange(obj){
var d = document.itemForm;
	d.page.value="";
	d.orderOPT.value = obj;
	d.submit();
}

//-->
</script>
<script language="javascript">
<!--
// 이미지의 오른쪽과 아래쪽 여백
var nimgTopMarginX = 30;
var nimgTopMarginY = 15;

// 세로스크롤바의 폭과 가로스크롤바의 높이
var nScrollBarWidth = 16;
var nScrollBarHeight = 16;

// 브라우저 버전
var nVersion = 3;

// 이미지를 리프레시하는 간격
var nInterval = 100;

function SetUp()
{
// 브라우저의 버전을 정수로 변환
nVersion = parseInt(navigator.appVersion);

if (nVersion >= 4 )
{
//브라우저가 Microsoft Internet Explorer일 때
if (navigator.appName == "Microsoft Internet Explorer")
{
window.setInterval ("imgTopMove_Explorer();", nInterval);
}

//브라우저가 Netscape Navigator일 때
else
{
layerTop = document.layers["lyrTop"];
window.setInterval ("imgTopMove_Navigator();", nInterval);
}
}
}

function imgTopMove_Explorer()
{
//스크롤하지 않았을 때는 이미지가 보이지 않게 위치시킨다.
if (document.body.scrollLeft == 0 && document.body.scrollTop == 0) 
{
imgTop.style.pixelTop = -100;
}

//스크롤했을 때는 이미지의 위치를 셋팅한다.
else 
{
nimgTopOriginX = document.body.clientWidth + document.body.scrollLeft - imgTop.width - nimgTopMarginX;
nimgTopOriginY = document.body.clientHeight + document.body.scrollTop - imgTop.height - nimgTopMarginY;

imgTop.style.pixelLeft = nimgTopOriginX; //이미지의 X좌표(왼쪽 여백)을 설정
imgTop.style.pixelTop = nimgTopOriginY; //이미지의 Y좌표(위쪽 여백)을 설정
}
}

function imgTopMove_Navigator()
{ 
//스크롤하지 않았을 때는 이미지가 보이지 않게 위치시킨다.
if (window.pageXOffset == 0 && window.pageYOffset == 0) 
{
layerTop.top = -100
}

//스크롤했을 때는 이미지의 위치를 셋팅한다.
else 
{
nimgTopOriginX = window.innerWidth + window.pageXOffset - layerTop.clip.width - nimgTopMarginX;
nimgTopOriginY = window.innerHeight + window.pageYOffset - layerTop.clip.height - nimgTopMarginY;

//윈도우에 스크롤바가 있을 경우
if (window.scrollbars)
{
nimgTopOriginX -= nScrollBarWidth;
nimgTopOriginY -= nScrollBarHeight;
}
layerTop.left = nimgTopOriginX; //레이어의 X좌표(왼쪽 여백)을 설정
layerTop.top = nimgTopOriginY; //레이어의 Y좌표(위쪽 여백)을 설정
}
}
-->
</script>
<script type="text/javascript">
<!-- 
function fSetLinksOnFocus() { 
for (var iLink = 0; iLink < document.links.length; iLink++) { 
if (document.links[iLink].blur) 
document.links[iLink].onfocus = fLinkOnFocus; 
} 
} 
function fLinkOnFocus() { 
this.blur(); 
} 
//-->
</script>
<script language='javascript'>
// 아이디패스워드찾기
function openIdpass() {
	window.open("../member/idpass.php", "","scrollbars=no, width=484, height=400");
}
//-->
</script>
<link href="../css/style.css" rel="stylesheet" type="text/css">
</head>