<?php
	/** 混淆方案- 密码加密存储混淆 */
	if(!defined('PASSWORD_RANDCODE'))
	define("PASSWORD_RANDCODE"     , 'f983r2ewioeoiwaeefadsafew');
	/** 混淆方案- 用户信息加密混淆 */
	if(!defined('USER_RANDCODE'))
	define("USER_RANDCODE"  , 'f9823r2ioeoiwaeefadsafeww');

	/**混淆方案- 用户信息cookie加密混淆**/
	if(!defined("COOKIE_KEY"))
	define("COOKIE_KEY", 'awfhouiwheanaoihf9waolwajiefio');
	if(!defined("USER_INFO"))
	define('USER_INFO','userInfo');

	//HTML 标题
	if( !defined('HTML_TITLE') )
	define("HTML_TITLE", '摇一摇抽奖');
	//管理员
	if( !defined('USER_ADMIN') )
	define('USER_ADMIN',9);

	//传值方式
	if( !defined('REQUEST_TYPE_GET') )
	define("REQUEST_TYPE_GET", 'GET');
	if( !defined('REQUEST_TYPE_POST') )
	define("REQUEST_TYPE_POST", 'POST');

	//分页默认
	if( !defined('DEFAULT_PAGE') )
	define("DEFAULT_PAGE", 1);
	if( !defined('DEFAULT_SIZE') )
	define("DEFAULT_SIZE", 5);
	//ajax调用
	if( !defined('AJAX') )
	define("AJAX", ROOT_PATH.'/config/configAjax.php?event=');

	//默认页面
	if( !defined('DEFAULT_LOCATION_URL') )
	define("DEFAULT_LOCATION_URL", $_SERVER['HTTP_HOST'].'/xg68nh/admin/userlist.php');
	//define("DEFAULT_LOCATION_URL", 'http://m2.nadoo.cn/p/xg68nh/admin/userlist.php');


	// API  接口地址
	$deployBoole   = true; // 开发测试



	// 开发和 部署  环境切换
	if ($deployBoole ){
		if( !defined('API_URL') )
		define('API_URL','http://192.168.0.126/xinguang/api/index.php?r=');

		if( !defined('ADMIN_URL') )
		define( 'ADMIN_URL',$_SERVER['HTTP_HOST'].'/xg68nh/admin/index.php' );
	}else{
		if( !defined('API_URL') )
		define('API_URL','');   //  正式环境
	}

	//  接口请求头
	$arrActionHeader = array
		(
			 'Userid' => 0
			,'Requesttime' => 0
			,'Logintime' => 0
			,'Checkcode' => 0
		);


	/*********页面 配置  start**************/
	//菜单配置
	$arrLeftMenu = array(
		 '用户管理' => array(
				'用户列表' => 'userlist.php'
			)

		,'网站统计' => 'pvuv.php'
		);

	// 菜单按钮图标配置
	$arrLeftIcon =  array
	(
		'用户管理' => 'icon-comments-alt'
		,'其它管理' => 'icon-list'

		// .....      其它页面  默认都没配置
	);
	/*********页面 配置  end**************/
