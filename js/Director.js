import { DataStore } from "./base/DataStore.js";
import { UpPipe } from "./runtime/UpPipe.js";
import { DownPipe } from "./runtime/DownPipe.js";

// 导演类，控制游戏的逻辑，主流程
export class Director{
  constructor(){
    this.dataStore = DataStore.getInstance();
  }
  
  
  // 单例，所有人获取到的都是同一个Director
  static getInstance(){
    if(!Director.instance){
      Director.instance = new Director();
    }
    return Director.instance;
  }


  // 创建水管
  createPipes(){
    // 设置top的最大和最小值
    const minTop = this.dataStore.canvas.height/6;
    const maxTop = this.dataStore.canvas.height/3;
    const top = Math.random()*(maxTop-minTop) + minTop;
    // 创建水管
    const up = new UpPipe(top);
    const down = new DownPipe(top);

    // 将创建的水管存入pipes数组中
    this.dataStore.get('pipes').push(up);
    this.dataStore.get('pipes').push(down);
    // console.log("pipes",pipes);
  }

  // run 执行方法
  run(){
    // 获取背景图
    this.dataStore.get('background').draw();
    
    // 获取所有的水管的数组
    const pipes = this.dataStore.get('pipes');
    // 删除出界的水管
    if(pipes[0].x + pipes[0].width <= 0 && pipes.length == 4){
      pipes.shift();
      pipes.shift();
    }
    
    // 创建水管
    const width = this.dataStore.canvas.width/2;
    if(pipes[0].x <= width-pipes[0].width && pipes.length == 2){
      this.createPipes();
    }
    
    for(let i=0;i<pipes.length;i++){
      pipes[i].draw();
    }
    
    // 画小鸟
    this.dataStore.get('birds').draw();
    this.dataStore.get('land').draw();

    // 定时器，让定时器不停的运转
    // setTimeout(() => this.run(),30);
    let time = requestAnimationFrame(()=>this.run());
    // 清除 time
    // cancelAnimationFrame(time);
  }

}