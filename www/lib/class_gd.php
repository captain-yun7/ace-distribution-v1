<?
class thumbImage {
var $real_path = '.';
var $target_path = '.';
var $add_name = '';
var $image_quality = 80;


function imageResize($realImage, $target_ext, $width, $height,$crop) {
static $extName;
static $src;
static $thumb;

$extName = strtolower( substr( $realImage, -3 ) );

switch($extName) {
case 'peg' : 
case 'jpg' : 
$src = @ImageCreateFromJPEG($this->real_path . '/' . $realImage) or die('Cannot Open File!');
break;
case 'gif' :
$src = @ImageCreateFromGIF($this->real_path . '/' . $realImage) or die('Cannot Open File!');
break;
case 'png' :
$src = @ImageCreateFromPNG($this->real_path . '/' . $realImage) or die('Cannot Open File!');
break;
default :
echo '이 파일은 변환할 수 없습니다.';
exit;
}

$thumb = ImageCreateTrueColor($width, $height);
echo"$image_quality $crop";
if($crop){ 

	$sx=ImageSX($src);
	$sy=ImageSY($src);
    $tx=($sx/2)-($width/2); 
	$ty=($sy/2)-($height/2); 


echo"$thumb, $src, $tx,$ty,0,0, $width, $height, $sx, $sy ";

	ImageCopyResampled($thumb, $src, 0,0,$tx,$ty, $sx, $sy, $sx, $sy ); 

}else{
ImageCopyResampled($thumb, $src, 0,0,0,0, $width, $height, ImageSX($src), ImageSY($src) ); 
}

$realImage = substr($realImage, 0, -3) . $target_ext;

switch($target_ext) {
case 'jpeg' : 
case 'jpg' : 
ImageJPEG($thumb, $this->target_path . '/' . $this->add_name . $realImage, $this->image_quality) or die('Writing Error : Check - Directory and Filename.');
break;
case 'gif' :
ImageGIF($thumb, $this->target_path . '/' . $this->add_name . $realImage, $this->image_quality) or die('Writing Error : Check - Directory and Filename.');
break;
case 'png' :
ImagePNG($thumb, $this->target_path . '/' . $this->add_name . $realImage, $this->image_quality) or die('Writing Error : Check - Directory and Filename.');
break;
default :
echo '이 확장자는 지원되는 확장자가 아닙니다.';
exit;
}

ImageDestroy($src); 
ImageDestroy($thumb); 
}
}

# End Class.

////////////// 사용 예제 ////////////
/*

$obj2 = new thumbImage;
$obj2->real_path = './'; # 저장된 이미지가 있는곳.
$obj2->target_path = './'; # 썸네일 이미지가 저장될 곳.
$obj2->add_name = 'test2_'; # 없어도 됨. 기본값 thumb
$obj2->image_quality = 80; # 없어도 됨. 기본값 75 (75% 가 가장 압축대 화질이 괸찮아서...)
# imageResize(파일명, 변환될 확장자, 가로사이즈, 세로사이즈)
$obj2->imageResize('700.jpg', 'jpg', 200, 150); # sample.jpg를 200*150 size의 png로 저장
*/


 
####################################### 파일 업로드 클래스 ######################################

class file_up 
    {
var $u_file;
var $u_name_file;
var $u_size_file;
var $u_type_file;
var $u_dir;
var $forbid;
var $return_file;
var $img_ex;
var $add_name;


function file_up($upfile, $upfile_name, $upfile_size, $upfile_type,$dir,$save_name,$img_ex, $forbid_ext)
        {
    $this -> u_file = $upfile;
    $this -> u_name_file = $upfile_name;
    $this -> u_size_file = $upfile_size;
    $this -> u_type_file = $upfile_type;
    $this -> u_dir = $dir;
    $this -> forbid = $forbid_ext;
	$this -> add_name = $save_name;
	$this -> img_ex = $img_ex;
        }

########################################################### 사이즈 체크
function size_check()
    {
if ($this -> u_size_file  > 1024*1024) 
                       {
             echo "업로드 용량을 초과하였습니다";
             exit;
                        }
    }
########################################################### 확장자 체크
function type_check()
        {
// 업로드하는 시스템이 로컬시스템이면
                        if (!strcmp($HTTP_SERVER_VARS["HTTP_HOST"],"localhost")) {
                                $file=explode("/", $this -> u_name_file);
                        }
                        
                        // 확장자를 조사해서 업로드가능 파일인지 판별한다
                        $ext=explode(".", $this -> u_name_file);
                        $extension=$ext[sizeof($ext)-1];
						$sext=$ext[1];
                        if (!in_array($extension, $this -> forbid)) {
                                echo "업로드가 불가능한 파일입니다";
                                exit;
                        }

        }
########################################################### 파일 복사
function file_copy()
        {
                        // 임시 디렉토리에 저장된 바이너리 파일을 해당 디렉토리에 복사한다
                        //$reg_time  = time(); // 파일 중복을 막기위해 앞에 타임스탬프를 붙임.
						$reg_time  = $this -> add_name;
                        $dest = $this -> u_dir.$reg_time.$this -> img_ex;
                        $this -> return_file = $reg_time.$this -> u_name_file;

                        if (!@move_uploaded_file($this -> u_file, $dest)) {
                                echo "원본 파일을 복사하는도중 에러가 발생했습니다.";
                                exit; }
        }

########################################################### 임시파일 삭제
function file_del()
        {
                      //  if (!@unlink($this -> u_file)) {
                         //       echo "원본 파일을 삭제하는도중 에러가 발생했습니다";
                            //    exit;
                     //   }
        }

########################################################### Go~~!
function file_process(){
    $this -> size_check();
    $this -> type_check();
    $this -> file_copy();
    //$this -> file_del();
    return  $this -> return_file;
                       }
	}
    
/**
* Get which version of GD is installed, if any.
*  GD 설치 확인 함수 
* Returns the version (1 or 2) of the GD extension.
*/
function gdVersion($user_ver = 0)
{
   if (! extension_loaded('gd')) { return; }
   static $gd_ver = 0;
   // Just accept the specified setting if it's 1.
   if ($user_ver == 1) { $gd_ver = 1; return 1; }
   // Use the static variable if function was called previously.
   if ($user_ver !=2 && $gd_ver > 0 ) { return $gd_ver; }
   // Use the gd_info() function if possible.
   if (function_exists('gd_info')) {
       $ver_info = gd_info();
       preg_match('/\d/', $ver_info['GD Version'], $match);
       $gd_ver = $match[0];
       return $match[0];
   }
   // If phpinfo() is disabled use a specified / fail-safe choice...
   if (preg_match('/phpinfo/', ini_get('disable_functions'))) {
       if ($user_ver == 2) {
           $gd_ver = 2;
           return 2;
       } else {
           $gd_ver = 1;
           return 1;
       }
   }
   // ...otherwise use phpinfo().
   ob_start();
   phpinfo(8);
   $info = ob_get_contents();
   ob_end_clean();
   $info = stristr($info, 'gd version');
   preg_match('/\d/', $info, $match);
   $gd_ver = $match[0];
   return $match[0];
} // End gdVersion()

// Usage:

if ($gdv = gdVersion()) {
   if ($gdv >=2) {
       //echo 'TrueColor functions may be used.';
   } else {
       //echo 'GD version is 1.  Avoid the TrueColor functions.';
   }
} else {
   //echo "The GD extension isn't loaded.";
   
   $gd_setup ="";
   
}
?>

