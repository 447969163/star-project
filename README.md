# 星座运势查询小程序
## 配置流程
+ 到聚合数据申请免费的星座运势接口：https://www.juhe.cn/docs/api/id/58
+ 打开index.php文件，将$appkey修改为你申请的应用APPKEY，上传至php环境的服务器，作为你的接口地址使用
+ 打开pages/result/result.js，将
```javascript
  // 请求
  post(){
    return new Promise((resolve,reject)=>{
      wx.request({
        url: '你的接口地址',
        data: {
          name: this.data.name,
          type: 'today'
        },
        success(res){
          resolve(res)
        }
      })
    })
  },
```
中的url修改为你的接口地址即可
## 难点
小程序的canvas节点获取及canvas绘制，其中canvas绘制文字换行解决方案详见https://blog.csdn.net/qq_37054093/article/details/109210106
