import { ResourceLoader } from "./js/base/ResourceLoader.js";
import { DataStore } from "./js/base/DataStore.js";
import { Background } from "./js/runtime/Background.js";
import { Director } from "./js/Director.js";
import { land } from "./js/runtime/Land.js";
import { Birds } from "./js/player/Birds.js";
import { StartButton } from "./js/player/StartButton.js";
import { Score } from "./js/player/Score.js";

// 程序主类
export class Main{
  constructor () {
    console.log("game start!");
    // 获取canvas
    // this.canvas = document.getElementById("canvas");
    this.canvas = wx.createCanvas();
    this.ctx = this.canvas.getContext('2d');

    // 获取资源加载器
    this.loader = new ResourceLoader();

    // 获取变量池
    this.dataStore = DataStore.getInstance();

    // 获取导演类
    this.director = Director.getInstance();

    // this.ctx.fillStyle = "#FFF";
    // this.ctx.fillText('sdasd',100,100);
    
    // 调用ResourceLoader的onloaded方法，获取已经加载成功的图片   

    this.loader.onloaded(map=>this.onResourceLoaded(map));

    // 画图
    /* const img = new Image();
    img.src = './res/background.png';
    img.onload = () => {
      this.ctx.drawImage(img,0,0,img.width,img.height);      
    } */
  }
  
  // 资源加载成功后的方法
  onResourceLoaded(map){
    // 将数据保存进变量池中(永久)
    // put方法保存进去的数据会在游戏结束时销毁
    // console.log("main:",map);
    this.dataStore.canvas = this.canvas;
    this.dataStore.ctx = this.ctx;
    this.dataStore.res = map;

    this.init();
  }
  // 游戏数据的初始化
  init(){

    this.director.isGameOver = false;
    // 创建游戏过程中使用到的对象，并将其put进变量池
    // 使用put保存的数据，在游戏结束时会全部销毁
    this.dataStore.put('background',new Background())
                  .put('land',new land())
                  .put('pipes',[])
                  .put('birds',new Birds())
                  .put('startButton',new StartButton())
                  .put('score',new Score())

    // 创建水管
    this.director.createPipes();

    // 调用监听事件
    this.registEvent();

    // 导演发布执行
    this.director.run();

  }
  // 添加屏幕单击事件
  registEvent(){
    // this.canvas.addEventListener('touchstart',e => {
    wx.onTouchStart(() => {
      // console.log(this);
      // 判断游戏是否结束
      if(this.director.isGameOver){
        // 如果游戏技术,点击重新开始
        this.init();        
      }else{        
        //如果正在运行，点击小鸟往上飞一段距离/
        this.director.birdsEvent();
      }
    });
  }
}