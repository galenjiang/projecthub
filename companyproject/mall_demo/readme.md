**蒋杰注释，需要备注在这里备注**

### 基础操作
```
git add -A  所有文件加入暂存区
git add commit -m '注释' 提交到历史区
git pull origin master远程仓库拉文件
git push origin master向远程仓库推文件
```

### 开发环境正式环境基础操作
```
git branch XXX  新建分支
git checkout XXX  切换到相应分支
git merge XXX   把xxx分支合并到当前仓库
```

### git开发流程
* 本地建立两个分支 master 和 dev
* 平时操作修改在dev分支(add commit pull push)
* 如正式环境客户有要求修改
    * 在master做修改
    * dev正常开发, 开发完再推送到正式环境


### 开发环境配置
> 服务器url 设置目录 lefng/Public/mall/script/common/common.js
最后一行设置url 根据自己的测试环境进行配置url 不能推送到正式环境

> 登陆测试
http://localhost/lefang/index.php?m=Api&c=User&a=clogin&phone=13564071438

### 关闭微信认证用户信息
>修改地址： Home/Controller/BaseController.class.php 
>修改方法 在方法 get_wx_info 内加入 return;

