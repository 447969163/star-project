Page({
  data: {
    star: [
      {name:"处女座",icon:"icon-chunv"},
      {name:"巨蟹座",icon:"icon-juxie"},
      {name:"白羊座",icon:"icon-baiyang"},
      {name:"摩羯座",icon:"icon-mojie"},
      {name:"射手座",icon:"icon-sheshou"},
      {name:"狮子座",icon:"icon-shizi"},
      {name:"双鱼座",icon:"icon-shuangyu"},
      {name:"双子座",icon:"icon-shuangzi"},
      {name:"水瓶座",icon:"icon-shuiping"},
      {name:"天秤座",icon:"icon-tiancheng"},
      {name:"天蝎座",icon:"icon-tianxie"},
      {name:"金牛座",icon:"icon-jinniu"}
    ],
    meteor: []
  },
  //创建随机流星
  createMeteor: function () {
  //流星数量
  let meteorNum = 15
  //存放流星随机位置和宽高
  let meteorArr = []
  //开始创建
  for (let i = 0 ; i < meteorNum ; i++) {
    //宽和高
    meteorArr.push({meteorWH:Math.random()*10+5,meteorL:Math.random()*100,meteorT:Math.random()*100,meteorOpcity:Math.random()*0.9})
  }
  //更新到data
  this.setData({
    meteor: meteorArr
  })
  },
  //跳转
  sendTo: function(e) {
    wx.navigateTo({
      url: '/pages/answer/answer?name=' + e.currentTarget.dataset.link
    })
  },
  onLoad: function () {
    let that = this
    setInterval(() => {
      that.createMeteor()
    }, 2000)
  }
})
