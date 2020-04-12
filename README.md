# PC桌面客户端脚手架 -- electron


   

## 环境

### 软件环境

|程序|版本|
|---|---|
|node|v11.0.0|
|npm|v6.4.1|






### 第三库

| 库| 版本 |  说明 |
| ---| --- |  --- |
|electron| v5.0.2 |  |
|electron-builder | 20.41.0 | 全局安装 |
|electron-updater| 4.0.0| 放到开发依赖里 dev -- dependencies |




## 运行
    
| 命令|   说明 | 
| --- | --- |
| npm start  | 运行前端脚本 |

### 本地开发 

| 命令|   说明 |
| --- |  ---  |
| npm start  | 运行前端脚本 |
| npm run electron-start | 运行客户端 | 

### 线上
> 代码上传的方式见另外的文档

| 命令 | 说明|
| --- |--- |
| npm run build | 代码压缩 |
| electron-builder | 打包 |
| 把dist里的内容全部copy 到 http服务器|  用来做软件更新 |
| electron-builder -c.extraMetadata.env=erp | erp渠道 mac |
| electron-builder -c.extraMetadata.env=aleqipei | aleqipei渠道 Mac |
| electron-builder --win -c.extraMetadata.env=erp | erp渠道 Windows |
| electron-builder --win -c.extraMetadata.env=aleqipei | aleqipei渠道 Windows |
| electron-builder --win -c.extraMetadata.env=aleqipei | aleqipei渠道 Windows |
|/Users/qihong/Library/Application Support/heqi2| mac 开发机.数据库存储位置 -- 有的时候调试需要删除|


#### 买件客户端 

| 命令 | 说明|
| --- |--- |
|  electron-builder -c.extraMetadata.env=aleqipei -c.extraMetadata.platform=test | aleqipei渠道 --  Mac -- 测试  |
|  electron-builder -c.extraMetadata.env=aleqipei -c.extraMetadata.platform=pre | aleqipei渠道 --  Mac -- 预发 |
|  electron-builder -c.extraMetadata.env=aleqipei -c.extraMetadata.platform=prod | aleqipei渠道 --  Mac -- 线上 |
|  electron-builder --win -c.extraMetadata.env=aleqipei -c.extraMetadata.platform=test | aleqipei渠道 --  Window -- 测试 |
|  electron-builder --win -c.extraMetadata.env=aleqipei -c.extraMetadata.platform=pre | aleqipei渠道 --  Window -- 预发 |
|  electron-builder --win -c.extraMetadata.env=aleqipei -c.extraMetadata.platform=prod | aleqipei渠道 --  Window -- 线上 |

#### ERP客户端

| 命令 | 说明|
| --- |--- |
|  electron-builder -c.extraMetadata.env=erp -c.extraMetadata.platform=test | ERP渠道 --  Mac -- 测试  |
|  electron-builder -c.extraMetadata.env=erp -c.extraMetadata.platform=pre | ERP渠道 --  Mac -- 预发 |
|  electron-builder -c.extraMetadata.env=erp -c.extraMetadata.platform=prod | ERP渠道 --  Mac -- 线上 |
|  electron-builder --win -c.extraMetadata.env=erp -c.extraMetadata.platform=test | ERP渠道 --  Window -- 测试 |
|  electron-builder --win -c.extraMetadata.env=erp -c.extraMetadata.platform=pre | ERP渠道 --  Window -- 预发 |
|  electron-builder --win -c.extraMetadata.env=erp -c.extraMetadata.platform=prod | ERP渠道 --  Window -- 线上 |

## osx

| 库|  说明|
| --- | --- |
|  electron-osx-sign| 全局安装 |

### 运行

> 


|生产环境需要注册apple开发者帐号|
|---|
|electron-osx-sign /Applications/xingsanhao.app --identity '```Mac Developer: xxxxxx@xxx.com(xxxxxxxxx)```'|






