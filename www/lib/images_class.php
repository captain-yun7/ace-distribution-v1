<?
# 이미지 사이즈를 조정하는 함수
# Usage : ImgResize_lib("original image path","image type","new width",'new height");
# image type -> create new image as jpeg or gif or wbmp or png type
#
function ImgResize_lib($original,$type="jpg",$width=0,$height=0,$newpath=0,$dbchk) {
  $no_java = $GLOBALS[ShellCmd] ? 1 : 0;
  $newpath = $newpath ? $newpath : "";

  if(!extension_loaded("gd"))
    print_error_lib("ImgResize_lib() funtion required gd extension in PHP",$no_java);

  # DB 에 들어있는 image 를 얻어올 경우 처리
  if($dbchk) {
    if(is_dir("/dev/shm")) $file_path = "/dev/shm/ImgResize-".uniqid("").".$type";
    else $file_path = "/tmp/ImgResize-".uniqid("").".$type";
    $p = fopen($file_path,"wb");
    fwrite($p,$original);
    fclose($p);
    $original = $file_path;
  }

  # 원본 이미지로 부터 JPEG 파일을 생성
  $otype = GetImageSize($original);
  switch($otype[2]) {
    case 1:
      $img = ImageCreateFromGIF($original);
      break;
    case 2:
      $img = ImageCreateFromJPEG($original);
      break;
    case 3:
      $img = ImageCreateFromPNG($original);
      break;
    default:
      print_error_lib("Enable original file is type of GIF,JPG,PNG");
  }

  # 원본 이미지의 width, height 를 구함
  $owidth = ImagesX($img);
  $oheight = ImagesY($img);

  # width 와 height 를 모두 0 으로 주었을 경우 기본값 50
  if(!$width && !$height) $width = $height = 50;

  # width 가 없을 경우 height 의 축소/확대 비율로 width 를 구함
  if(!$width) {
    $ratio = ((real)$height/$oheight);
    $width = ((int)$owidth*$ratio);
  }

  # height 가 없을 경우 width 의 축소/확대 비율로 height 를 구함
  if(!$height) {
    $ratio = ((real)$width/$owidth);
    $height = ((int)$oheight*$ratio);
  }

  # 새로운 이미지를 생성
  $newimg = ImageCreate($width,$height);
  # 새로운 이미지에 원본 이미지를 사이즈 조정하여 복사.
  ImageCopyResized($newimg,$img,0,0,0,0,$width,$height,$owidth,$oheight);

  # 타입에 따라 헤더를 출력
  switch($type) {
    case "wbmp" :
      $type_header = "vnd.wap.wbmp";
      break;
    default :
      $type = ($type == "jpg") ? "jpeg" : $type;
      $type_header = $type;
  }
  if(!$newpath) Header("Content-type: image/$type_header");

  switch($type) {
    case "png" :
      if($newpath) ImagePNG($newimg,$newpath);
      else ImagePNG($newimg);
      break;
    case "wbmp" :
      if($newpath) ImageWBMP($newimg,$newpath);
      else ImageWBMP($newimg);
      break;
    case "gif" :
      if($newpath) ImageGIF($newimg,$newpath);
      else ImageGIF($newimg);
    default :
      ImageJPEG($newimg,$newpath,80);
  }
  ImageDestroy($newimg);
  if($dbchk && file_exists($original)) unlink($original);
}
?>
