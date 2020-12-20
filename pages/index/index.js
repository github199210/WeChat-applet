//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgSrc:'/assets/plus.png',
    lists:[
      {id:1,item:'吃饭',flag:false},
      {id:2,item:'睡觉',flag:true},
      {id:3,item:'打豆豆',flag:false}
    ],
    inputValue:'',
    leftCount:0,
    isShowClear:false
  },
  onShow(){
    this.setData({
      lists:wx.getStorageSync('lists') || []
    })
    this.common()
  },
  showClear(){
    this.setData({
      isShowClear:this.data.lists.some(item=>item.flag)
    })
  },
  getLeftCount(){
    this.data.leftCount=this.data.lists.filter(item=>!item.flag).length
    this.setData(this.data)
  },
  onInput(e){
    this.setData({
      inputValue:e.detail.value
    })
  },
  addValue(){
    this.data.lists.unshift({
      id:+new Date(),
      item:this.data.inputValue,
      flag:false
    })
    this.setData({
      lists:this.data.lists,
      inputValue:''
    })
    this.common()
  },
  edit(e){
    const {id}=e.currentTarget.dataset
    let index=this.data.lists.findIndex(item=>item.id===id)
    this.data.lists[index].flag=!this.data.lists[index].flag
    this.common()
  },
  clear(e){
    const {id}=e.currentTarget.dataset
    let index=this.data.lists.findIndex(item=>item.id===id)
    this.data.lists.splice(index,1)
    this.common()
  },
  toggle(e){
    let flag=this.data.lists.some(item=>!item.flag)
    this.data.lists.forEach(item=>item.flag=flag)
    this.common()
  },
  clearComplete(){
    this.data.lists=this.data.lists.filter(item=>!item.flag)
    this.common()
  },
  setStorage(){
    wx.setStorageSync('lists', this.data.lists)
  },
  common(){
    this.showClear()
    this.getLeftCount()
    this.setStorage()
  }
})
