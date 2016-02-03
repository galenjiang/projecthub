<?php
    header("Content-Type:text/html;charset=utf-8");
    error_reporting(E_ALL);  // 关闭所有错误提示
    //session_set_cookie_params( 8640000 );
    session_start();//开启session
    date_default_timezone_set('PRC');

    if (!defined('ROOT_PATH'))
    {
        define('ROOT_PATH', dirname(__DIR__) );
    }
    // 引入核心 文件
    include_once(ROOT_PATH.'/config/config.php');


    // 加载控制器
    function C($classController)
    {
        $classController = ucfirst($classController).'Controller';
        $pathController = ROOT_PATH.'/controller/' . $classController . '.php';
        if (file_exists($pathController))
        {
            include_once $pathController;
            return  new $classController;
        }

        die(" not classController --> " . $classController );
    }
class Utility
{
    // 是否是 管理员   或 超级 管理员
    public static function  isAdmin( $level =   0  )
    {
        return    ( $level <=  USER_ADMIN);
    }



    public static function checkParemValue($arrData, $arrParamValue) // 检查参数
    {
        if (!empty($arrParamValue) )
        {
            foreach ($arrParamValue as $key => $value)
            {
                if  ( !array_key_exists($key, $arrData) )
                {
                    $arrData[$key]  = $value;
                }
            }
        }

        return $arrData;
    }


    // 转换统计显示 数据json
    public static function packageArrJson($arrDateTime, $arrStatisticsData)
    {
            $arrStatisticsDataTime = array();
            foreach ($arrDateTime as   $arrDate)
            {
                foreach ($arrStatisticsData as $arrStatisticsResult)
                {
                    if ( $arrDate == $arrStatisticsResult['CountDateTime'] )
                    {
                        $arrStatisticsDataTime[$arrDate] = intval($arrStatisticsResult['CountNum']);
                    }
                    else
                    {
                        if (empty($arrStatisticsDataTime[$arrDate]))
                        {
                            $arrStatisticsDataTime[$arrDate] = 0;
                        }
                    }
                }
            }
            return array_values($arrStatisticsDataTime);
    }


    /**
     *  生成时间
     * @example        getArrDateTime('2014', '2016', 'year');
     * @timebeg         string     开始时间
     * @timeend         string     结束时间
     * @datetype        string    格式化类型
     * @author
     */
    public static function getArrDateTime($timebeg, $timeend, $datetype )
    {

        global $arrDateValue;  // 加载配置格式

        $arrDateTime = array();// 组成时间 用于下面拼装数据

         $dateFormat    = $arrDateValue[$datetype];

        for($i = strtotime($timebeg); $i <= strtotime($timeend); $i += 60*60)
        {
            $arrDateTime[] =  date($dateFormat,$i);
        }
        return array_values(array_unique($arrDateTime));

    }



    // 求和，返回权限
    public static function getUserAuth( $arrUserAuth )
    {
            $sumNumber = 0;
            foreach($arrUserAuth as $value)
            {
                $sumNumber+=$value;
            }
            return  intval($sumNumber) ;
    }

    // 字符串  截取
    public static function subString( $string, $length = 16, $suffix = '' )
    {
        $strDataTime  =  '0000-00-00 00:00:00';
        if (empty($string) ||  $string ==  $strDataTime )  return '';

        return    mb_strlen( $string,  'utf8') >  $length  ?  mb_substr($string, 0, $length, 'utf8' ) . $suffix  :   mb_substr($string, 0, $length, 'utf8' )  ;
    }
    //  数组 KEY 转小写
    public static function changeKeyArr(  $arrResult )
    {
         if ( !empty( $arrResult)  && is_array($arrResult) )
        {
            return array_change_key_case($arrResult);
        }

        return  $arrResult;
    }

    // 页面跳转
    public static function location( $strUrl , $strMsg  = '')
    {

        echo '<script type="text/javascript">';

        if ( !empty($strMsg) )
        {
            echo " alert('{$strMsg}');";
        }


        if ( !empty($strUrl) )
        {

            echo "  window.location='{$strUrl}';  ";
        }


        echo '</script> ';

    }


    // 404
    public static function show404($msg)
    {
        header("HTTP/1.0 404 Not Found");
        echo $msg;
        exit;
    }

    //  递归 数组 KEY 转小写
    public static function changeKeyCaseArr(   $arrResultsInfo = array() , $arrDataAreaIDs = array() )
    {

        $arr = array();
        $arrResultsInfo  = array_change_key_case($arrResultsInfo);

        if ( isset($arrResultsInfo['areathird']))
        {
            self::changeArrAreaName($arrResultsInfo, $arrDataAreaIDs);
        }



        foreach ($arrResultsInfo as $key => $val)
        {
            $val =  is_array($val)   ?  self::changeKeyCaseArr($val,$arrDataAreaIDs) : $val;
            $arr[$key] = $val;
        }

        return $arr;
    }


    // 获取 cookie
    public static function getCookie( $name = 'userInfo' )
    {
            if( empty( $_COOKIE[$name] ) ){
                return '';
            }
            $arrCookie = $_COOKIE[$name];
            $md5=substr($arrCookie,-32);
            $arrUserInfo=substr($arrCookie,0,strlen($arrCookie)-32);

            if (md5($arrUserInfo . COOKIE_KEY ) == $md5 )   // 检测唯一的 md5值
            {
                $arrUserInfo = unserialize($arrCookie);
                return $arrUserInfo;
            }
            return '';
    }



    // 设置 cookie
    public static function setCookie( $arrInfo , $name = 'userInfo' , $time = 30 )
    {
        $arrInfo = serialize($arrInfo);
        $md5 = md5($arrInfo . COOKIE_KEY );
        $arrInfo = $arrInfo . $md5;
        setcookie( $name, $arrInfo, time()+86400*$time,'/' );
    }

    // 返回结果
    public static function generateJson($arrToJson, $boole = true )
    {
        if ( !empty($arrToJson) && is_array($arrToJson))
        {
            if ($boole)
             {
              $arrToJson =  array_change_key_case($arrToJson );
            }
            die(self::toJson($arrToJson));
        }
        die('error not data ...');
    }


    // 转换json
    public static function toJson($arrJson)
    {
       return json_encode($arrJson, JSON_UNESCAPED_UNICODE);
    }


    /**
     * 调用接口API
     * @strApiType          string     API接口和函数 demo/demo
     * @arrActionData       array   表单提交的数据
     * @requestType         string   POST or GET
     * @author               Demon
     */

    public static function httpConnectionApi($strApiType, $arrActionData=array(), $strRequestType= 'GET', $arrActionHeader = array())
    {
        if  (empty($arrActionHeader)){
            global $arrActionHeader;
            $arrActionHeader = $arrActionHeader;
        }

        // if ( !empty($_SESSION[USER_INFO]['id'])  &&  empty($arrActionHeader['Userid']) ){
        //     $arrActionHeader['Userid'] = $_SESSION[USER_INFO]['id'];
        // }
         $arrActionHeader['Userid'] = 259;
        $arrActionHeader['Requesttime'] = time();
        $arrActionHeader['Logintime'] = time();
        $arrActionHeader['Checkcode'] = self::getCheckCode($arrActionHeader['Userid'],$arrActionHeader['Logintime']);

        $arrSecret =   (array_merge($arrActionHeader, $arrActionData));
        $arrSecret['r']  = $strApiType;

        //$arrSecret['secret']  = SECRET_HAX_PC;
        //$arrActionHeader['Signature'] = self::getstrSecret($arrSecret);

        //var_dump($arrSecret);exit;

        if (!empty($strApiType)){
             $strUrl = API_URL . $strApiType;

            if ($strRequestType == REQUEST_TYPE_POST )
            {
                return self::getUrlContent($strUrl, $arrActionData, $arrActionHeader);
            }
            else
            {

                if (is_array($arrActionData) )
                {
                    foreach ($arrActionData as $k => $v)
                    {
                        $strUrl .= "&{$k}={$v}";
                    }
                }
                return self::getUrlContent($strUrl, array(), $arrActionHeader);
            }
        }
        return false;

    }

    public static function getUrlContent($url,$data=array(),$header = array()){
        $ch = curl_init(); //初始化CURL句柄
        curl_setopt($ch, CURLOPT_URL, $url); //设置请求的URL
        curl_setopt($ch, CURLOPT_RETURNTRANSFER,1); //设为TRUE把curl_exec()结果转化为字串，而不是直接输出
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);// 跟踪重定向
        if( !empty($data) ){
            curl_setopt($ch, CURLOPT_POST,1);//  POST 提交
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);//设置提交的字符串
        }
        if( !empty($header) ){
            $header = self::getArrActionHeader($header);
            curl_setopt($ch,CURLOPT_HTTPHEADER,$header);//设置HTTP头信息
        }

        $results = curl_exec($ch);//执行预定义的CURL
        curl_close($ch);
        // print_r($results);exit;
        return json_decode($results,true);
    }

    // 获取加密串 Secret
    public static function  getstrSecret($arrSecret)
    {
        $arrSort = array();
        foreach ($arrSecret as $key => $value)
        {
            array_push($arrSort  , sprintf("%s=%s", @$key, @$value  ));
        }

        sort($arrSort, SORT_STRING);

        return   md5(implode( $arrSort ));
    }

    // 转换请求头
    public static function  getArrActionHeader($arrActionHeader)
    {
        $arrActionHeaderInfo = array();

        foreach ($arrActionHeader as $key => $value)
        {
            $arrActionHeaderInfo[] = sprintf("%s:%s", $key, $value);
        }

        return $arrActionHeaderInfo;
    }

    /**
     * 将密码再次加密
     * @param  string $p_password 原始密码（一般此时已经经过初步MD5加密）
     * @return string             加密后字符串（用于存储到数据库中）
     */
    public static function getEncodedPwd($p_password)
    {
        if (!is_null($p_password))
        {
            return md5(md5($p_password).PASSWORD_RANDCODE.substr(md5($p_password),3,8));
        }
        return null;
    }

    //验证登陆
    public static function checkLogin(){
        $userInfo = Utility::getCookie();
        if( empty( $userInfo['id'] ) ){
            self::setCookie(NULL);
            setcookie('userInfo', NULL);
            session_unset();
            return false;
        }

        if( empty( $_SESSION['userInfo']['id'] ) ){
            self::setCookie(NULL);
            setcookie('userInfo', NULL);
            session_unset();
            return false;
        }

        if( $_SESSION['userInfo']['id'] != $userInfo['id'] ){
            self::setCookie(NULL);
            setcookie('userInfo', NULL);
            session_unset();
            return false;
        }
        return true;
    }

    /**
     * 将用户和登陆时间组成加密字符
     * @param  integer $p_userID 用户ID
     * @param  string  $p_time   时间戳
     * @return string            加密后字符
     */
    protected static function getCheckCode($p_userID, $p_time)
    {
        return md5($p_userID.md5($p_time.USER_RANDCODE));
    }

    //AJAX返回
    public static function ajaxReturn($errcode = 0, $msg = '', $data = array()){
        $data = array('status'=>$errcode, 'msg'=>$msg, 'data'=>$data);
        return $data;
    }

    //获取接口参数
    public static function getParams( $array = array() ){
        if( !empty( $_REQUEST ) ){
            foreach ($_REQUEST as $key => $value) {
                $params[$key] = $value;
            }
        }

        if( !empty($array) ){
            foreach ($array as $key => $value) {
                $params[$key] = $value;
            }
        }
        return $params;
    }

    //获取分页信息
    public static function getPageInfo($count){
        $size      = !empty($_REQUEST['size'])?$_REQUEST['size']:DEFAULT_SIZE;
        $nowpage   = !empty($_REQUEST['page'])?$_REQUEST['page']:DEFAULT_PAGE;
        $countPage = (int)ceil( $count/$size );
        $upPage    = ($nowpage - 1 < 1)?1:$nowpage - 1;
        $nextPage  = ($nowpage + 1 > $countPage)?$countPage:$nowpage + 1;

        return array(
                'size'      => $size
               ,'nowpage'   => $nowpage
               ,'countPage' => $countPage
               ,'upPage'    => $upPage
               ,'nextPage'  => $nextPage
               ,'countTotal'=> $count
            );
    }

    //excel 导出
    //$params = array(
    //      'A' => 学号
    //     ,'B' => 姓名
    //     ,'C' => 性别
    //     ,'D' => 年龄
    //     ,'E' => 班级
    //)
    //$data = array(
    //     array('1','小王','男','20','100'),
    //     array('2','小李','男','20','101'),
    //     array('3','小张','女','20','102'),
    //     array('4','小赵','女','20','103')
    // );
    public static function excelExport( $params = array(),$data=array(),$outputFileName='excel.xls' ){
        $resultPHPExcel = new PHPExcel();
        //设置参数

        //设值
        foreach ($params as $key => $value) {
            $resultPHPExcel->getActiveSheet()->setCellValue($key.'1',$value);
        }

        $i = 2;
        foreach($data as $item){
            foreach ($params as $key => $value) {
               $resultPHPExcel->getActiveSheet()->setCellValue($key . $i, $item[$value]);
            }
            $i ++;
        }
        //设置导出文件名
        $xlsWriter = new PHPExcel_Writer_Excel5($resultPHPExcel);
        header("Content-Type: application/force-download");
        header("Content-Type: application/octet-stream");
        header("Content-Type: application/download");
        header('Content-Disposition:inline;filename="'.$outputFileName.'"');
        header("Content-Transfer-Encoding: binary");
        header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
        header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
        header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
        header("Pragma: no-cache");
        return $xlsWriter->save( "php://output" );
    }


}
