<script language="JavaScript1.2">
///////configure the below four variables to change the style of the slider///////
//set the scrollerwidth and scrollerheight to the width/height of the LARGEST image in your slideshow!
var scrollerwidth=665
var scrollerheight=124
var scrollerbgcolor='white'
//3000 miliseconds=3 seconds
var pausebetweenimages=3000

//configure the below variable to change the images used in the slideshow. If you wish the images to be clickable, simply wrap the images with the appropriate <a> tag
var slideimages=new Array()
<? 
$scroll_cnt=0;
$scroll_result1=$db->select("cs_banner", "where status=5");
while($scroll_row1=@mysql_fetch_object( $scroll_result1)) {
?>

slideimages[<?=$scroll_cnt;?>]='<? if($scroll_row1->link_url) {?><a href="http://<?=$scroll_row1->link_url;?>" target="<? if($scroll_row1->target) { echo('_self'); } else { echo('_blank');}?>"><img src="../data/designImages/<?=$scroll_row1->banner_images;?>" border="0" width="665"></a><?} else {?><img src="../data/designImages/<?=$scroll_row1->banner_images;?>" border="0" width="665"><?}?>'
<?
	$scroll_cnt++;
}
?>

//extend this list

///////Do not edit pass this line///////////////////////
     

if (slideimages.length>1)
i=2
else
i=0

function move1(whichlayer){
tlayer=eval(whichlayer)
if (tlayer.top>0&&tlayer.top<=5){
tlayer.top=0
setTimeout("move1(tlayer)",pausebetweenimages)
setTimeout("move2(document.main.document.second)",pausebetweenimages)
return
}
if (tlayer.top>=tlayer.document.height*-1){
tlayer.top-=5
setTimeout("move1(tlayer)",100)
}
else{
tlayer.top=scrollerheight
tlayer.document.write(slideimages[i])
tlayer.document.close()
if (i==slideimages.length-1)
i=0
else
i++
}
}

function move2(whichlayer){
tlayer2=eval(whichlayer)
if (tlayer2.top>0&&tlayer2.top<=5){
tlayer2.top=0
setTimeout("move2(tlayer2)",pausebetweenimages)
setTimeout("move1(document.main.document.first)",pausebetweenimages)
return
}
if (tlayer2.top>=tlayer2.document.height*-1){
tlayer2.top-=5
setTimeout("move2(tlayer2)",100)
}
else{
tlayer2.top=scrollerheight
tlayer2.document.write(slideimages[i])
tlayer2.document.close()
if (i==slideimages.length-1)
i=0
else
i++
}
}

function move3(whichdiv){
tdiv=eval(whichdiv)
if (tdiv.style.pixelTop>0&&tdiv.style.pixelTop<=5){
tdiv.style.pixelTop=0
setTimeout("move3(tdiv)",pausebetweenimages)
setTimeout("move4(second2)",pausebetweenimages)
return
}
if (tdiv.style.pixelTop>=tdiv.offsetHeight*-1){
tdiv.style.pixelTop-=5
setTimeout("move3(tdiv)",100)
}
else{
tdiv.style.pixelTop=scrollerheight
tdiv.innerHTML=slideimages[i]
if (i==slideimages.length-1)
i=0
else
i++
}
}

function move4(whichdiv){
tdiv2=eval(whichdiv)
if (tdiv2.style.pixelTop>0&&tdiv2.style.pixelTop<=5){
tdiv2.style.pixelTop=0
setTimeout("move4(tdiv2)",pausebetweenimages)
setTimeout("move3(first2)",pausebetweenimages)
return
}
if (tdiv2.style.pixelTop>=tdiv2.offsetHeight*-1){
tdiv2.style.pixelTop-=5
setTimeout("move4(second2)",100)
}
else{
tdiv2.style.pixelTop=scrollerheight
tdiv2.innerHTML=slideimages[i]
if (i==slideimages.length-1)
i=0
else
i++
}
}

function startscroll(){
if (document.all){
move3(first2)
second2.style.top=scrollerheight
}
else if (document.layers){
document.main.visibility='show'
move1(document.main.document.first)
document.main.document.second.top=scrollerheight+5
document.main.document.second.visibility='show'
}
}

window.onload=startscroll

</script>




<ilayer id="main" width=&{scrollerwidth}; height=&{scrollerheight}; bgColor=&{scrollerbgcolor}; visibility=hide>
<layer id="first" left=0 top=1 width=&{scrollerwidth}; >
<script language="JavaScript1.2">
if (document.layers)
document.write(slideimages[0])
</script>
</layer>
<layer id="second" left=0 top=0 width=&{scrollerwidth}; visibility=hide>
<script language="JavaScript1.2">
if (document.layers)
document.write(slideimages[1])
</script>
</layer>
</ilayer>

<script language="JavaScript1.2">
if (document.all){
document.writeln('<span id="main2" style="position:relative;width:'+scrollerwidth+';height:'+scrollerheight+';overflow:hiden;background-color:'+scrollerbgcolor+'">')
document.writeln('<div style="position:absolute;width:'+scrollerwidth+';height:'+scrollerheight+';clip:rect(0 '+scrollerwidth+' '+scrollerheight+' 0);left:0;top:0">')
document.writeln('<div id="first2" style="position:absolute;width:'+scrollerwidth+';left:0;top:1;">')
document.write(slideimages[0])
document.writeln('</div>')
document.writeln('<div id="second2" style="position:absolute;width:'+scrollerwidth+';left:0;top:0">')
document.write(slideimages[1])
document.writeln('</div>')
document.writeln('</div>')
document.writeln('</span>')
}
</script>