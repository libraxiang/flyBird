import { DataStore } from "./base/DataStore.js";

// 导演类，控制游戏的逻辑，主流程

export class Director{
  constructor(){
    this.dataStore = DataStore.getInstance();
    console.log(this.dataStore);
  }
  
  
  // 单例，所有人获取到的都是同一个Director
  static getInstance(){
    if(!Director.instance){
      Director.instance = new Director();
    }
    return Director.instance;
  }


  // run 执行方法
  run(){
    // 获取背景图
    this.dataStore.get('background').draw();
    this.dataStore.get('land').draw();
    this.dataStore.get('pipe').draw();
    this.dataStore.get('down').draw();

    // 定时器，让定时器不停的运转
    // setTimeout(() => this.run(),30);
    let time = requestAnimationFrame(()=>this.run());
    // 清除 time
    // cancelAnimationFrame(time);
  }

}