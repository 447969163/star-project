Page({
  data: {
    // 星座名
    name:'',
    // canvas画布宽高
    canvasWidth: 0,
    canvasHeight: 0,
    canvasDom: null
  },
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
  // canvas绘制文字自动换行方案
  text(str) {
      // 画布总宽度 px单位
      let canvasWidth = wx.getSystemInfoSync().windowWidth * wx.getSystemInfoSync().pixelRatio * 0.9
      // 字体大小 px单位
      let fontSize = parseInt((wx.getSystemInfoSync().windowWidth/375) * 30)
      // 每行所需字数 = 画布总宽度 / 单个字体大小
      let rowFontNum = Math.floor(canvasWidth / fontSize)
      // 字符串总长度
      let strLength = str.length
      // 所需行数 = 字符总长度 / 每行所需字数
      let rows = Math.ceil(strLength / rowFontNum)
      return {canvasWidth,fontSize,rowFontNum,strLength,rows}
  },
  // 绘制canvas
  draw(data){
    // 创建选择器
    const query = wx.createSelectorQuery()
    // 获取canvas节点
    query.select('#myCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node
        // 将canvas节点放在data中
        this.setData({
          canvasDom : canvas
        })
        const dpr = wx.getSystemInfoSync().pixelRatio
        const rpx = wx.getSystemInfoSync().windowWidth/375
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        // 获取工具箱
        const ctx = canvas.getContext('2d')
        ctx.font = `${parseInt(rpx * 30)}px sans-serif`
        ctx.fillStyle = '#b511c7'
        ctx.fillRect(0,10,350*rpx,70*rpx)
        ctx.fillStyle = '#FFFFFF'
        ctx.fillText(this.data.name+'星座运势',50,60)
        ctx.font = `${parseInt(rpx * 28)}px sans-serif`
        ctx.fillStyle = '#999'
        ctx.fillText('测算时间：'+data.datetime,20,280)
        ctx.fillText('匹配星座：'+data.QFriend,20,140)
        ctx.fillText('幸运颜色：'+data.color,20,210)
        ctx.fillText('总指数：'+data.all,20,350)
        ctx.fillText('健康指数：'+data.health,20,420)
        ctx.fillText('爱情指数：'+data.love,20,490)
        ctx.fillText('工作指数：'+data.work,20,560)
        ctx.fillText('幸运数字：'+data.number,20,630)
        let result = this.text(data.summary)
        for (let i = 0; i <= result.rows; i++) {
          ctx.fillText(data.summary.slice(result.rowFontNum*(i-1),result.rowFontNum*i),20,630+i*70)
        }
      })
  },
  download(){
    // 绘制canvas转为图片
    wx.canvasToTempFilePath({
      canvas:this.data.canvasDom,
      fileType: 'jpg',
      success(res){
        // 保存到用户相册
        wx.saveImageToPhotosAlbum({
          filePath:res.tempFilePath,
          success(res) { 
            console.log('保存成功')
          }
        })
      }
    })
  },
  onLoad: function (options) {
    let that = this
    // 获取星座名
    that.setData({
      name: options.name
    })
    // 设置canvas宽高
    wx.getSystemInfo({
      success(res){
        that.setData({
          canvasWidth: res.windowWidth * 0.9,
          canvasHeight: res.windowHeight * 0.6
        })
      }
    })
    // 获取数据
    that.post().then((res)=>{
      // 执行canvas绘制
      that.draw(res.data)
    })
  }
})