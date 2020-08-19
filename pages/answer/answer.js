Page({
  data: {
    // 标题相关
    starName: '',
    //canvas画布相关
    canvasBoxW: 0,
    canvasBoxH: 0,
    canvasWidth: 0,
    canvasHeight: 0,
    //请求回来的数据
    all: "", /*综合指数*/
    color: "", /*幸运色*/
    health: "", /*健康指数*/
    love: "",/*爱情指数*/
    money: "",/*财运指数*/
    number: 0,/*幸运数字*/
    QFriend: "",/*速配星座*/
    work: "",/*工作指数*/
    summary: "",/*今日概述*/
    job: "",
    date: "",
    mimaInfo: "",
    mimaText: "",
    career: "",
    finance: "",
    //解锁按钮相关
    lock: [
      {dataText:"明",bind:"tomorrow"},
      {dataText:"周",bind:"week"},
      {dataText:"月",bind:"month"},
      {dataText:"年",bind:"year"}
    ],
    // 控制显示隐藏
    today_isShow: "block",
    tomorrow_isShow: "none",
    week_isShow: "none",
    month_isShow: "none",
    year_isShow: "none"
  },
  //封装请求
  postRequet: function(postName,postType) {
    //创建promise
    let request = new Promise((resolve,reject)=>{
      wx.request({
        url: '接口地址：去 聚合数据 申请 星座运势接口',
        data: {
          name: postName,
          type: postType
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          resolve(res)
        }
      })
    })
    return request
  },
  //封装canvas绘制
  canvas: function (dom) {
    const query = wx.createSelectorQuery()
    query.select(dom)
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        //获取设备dpr
        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = 80 * dpr
        canvas.height = 80* dpr
        //开始绘制
        //绘制外层canvas
        ctx.moveTo(40*dpr,0)
        ctx.lineTo(80*dpr,40*dpr)
        ctx.lineTo(40*dpr,80*dpr)
        ctx.lineTo(0,40*dpr)
        ctx.closePath()
        ctx.strokeStyle = '#000000'
        ctx.stroke()
        //绘制横竖线
        ctx.beginPath()
        ctx.moveTo(0,40*dpr)
        ctx.lineTo(80*dpr,40*dpr)
        ctx.strokeStyle = '#000000'
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(40*dpr,0)
        ctx.lineTo(40*dpr,80*dpr)
        ctx.strokeStyle = '#000000'
        ctx.stroke()
        //数据层
        ctx.beginPath()
        ctx.moveTo(40*dpr,40*dpr-this.data.health*0.8/2*dpr)
        ctx.lineTo(40*dpr-this.data.money*0.8/2*dpr,40*dpr)
        ctx.lineTo(40*dpr,40*dpr+this.data.work*0.8/2*dpr)
        ctx.lineTo(40*dpr+this.data.love*0.8/2*dpr,40*dpr)
        ctx.closePath()
        ctx.strokeStyle = '#bf5353'
        ctx.stroke()
      })
  },
  // 解锁明日运势
  tomorrow: function (e) {
    //发送请求
    let result = this.postRequet(this.data.starName,e.currentTarget.dataset.bind)
    //请求成功之后
    result.then(res=>{
      //更新数据
      this.setData({
        all: res.data.all, /*综合指数*/
        color: res.data.color, /*幸运色*/
        health: res.data.health, /*健康指数*/
        love: res.data.love,/*爱情指数*/
        money: res.data.money,/*财运指数*/
        number: res.data.number,/*幸运数字*/
        QFriend: res.data.QFriend,/*速配星座*/
        work: res.data.work,/*工作指数*/
        summary: res.data.summary,/*今日概述*/
        today_isShow: "none",
        tomorrow_isShow: "block",
        week_isShow: "none",
        month_isShow: "none",
        year_isShow: "none"
      })
    })
    //绘制画布
    .then(res=>{
      //执行canvas绘制
      this.canvas("#tomorrowCanvas")
    })
  },
  //解锁周运势
  week: function (e) {
    //发送请求
    let result = this.postRequet(this.data.starName,e.currentTarget.dataset.bind)
    result.then(res=>{
      //更新数据
      this.setData({
        job: res.data.job,
        love: res.data.love,/*爱情指数*/
        money: res.data.money,/*财运指数*/
        work: res.data.work,/*工作指数*/
        today_isShow: "none",
        tomorrow_isShow: "none",
        week_isShow: "block",
        month_isShow: "none",
        year_isShow: "none"
      })
    })
  },
  //解锁月运势
  month: function (e) {
    //发送请求
    let result = this.postRequet(this.data.starName,e.currentTarget.dataset.bind)
    result.then(res=>{
      //更新数据
      this.setData({
        all: res.data.all,
        health: res.data.health,/*爱情指数*/
        love: res.data.love,/*财运指数*/
        money: res.data.money,/*工作指数*/
        work: res.data.work,/*工作指数*/
        today_isShow: "none",
        tomorrow_isShow: "none",
        week_isShow: "none",
        month_isShow: "block",
        year_isShow: "none"
      })
    })
  },
  //解锁年运势
  year: function (e) {
    //发送请求
    let result = this.postRequet(this.data.starName,e.currentTarget.dataset.bind)
    result.then(res=>{
      //更新数据
      this.setData({
        mimaInfo: res.data.mima.info,
        mimaText: res.data.mima.text[0],
        career: res.data.career[0],
        love: res.data.love[0],
        finance: res.data.finance[0],
        health: res.data.health[0],
        today_isShow: "none",
        tomorrow_isShow: "none",
        week_isShow: "none",
        month_isShow: "none",
        year_isShow: "block"
      })
    })
  },
  onLoad: function (options) {
    let that = this
    //获取星座姓名
    that.setData({
      starName: options.name
    })
    //获取设备dpr
    const dpr = wx.getSystemInfoSync().pixelRatio
    //发送请求
    let request = this.postRequet(options.name,"today")
    //请求成功后
    request.then(res=>{
      //更新数据
      that.setData({
        all: res.data.all, /*综合指数*/
        color: res.data.color, /*幸运色*/
        health: res.data.health, /*健康指数*/
        love: res.data.love,/*爱情指数*/
        money: res.data.money,/*财运指数*/
        number: res.data.number,/*幸运数字*/
        QFriend: res.data.QFriend,/*速配星座*/
        work: res.data.work,/*工作指数*/
        summary: res.data.summary/*今日概述*/
      })
      //设置canvas画布大小
      that.setData({
        canvasBoxW: 100*dpr,
        canvasBoxH: 100*dpr,
        canvasWidth: 80*dpr,
        canvasHeight: 80*dpr
      })
    }).then(res=>{
      //执行canvas绘制
      that.canvas("#todayCanvas")
    })
  }
})