import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

export class land extends Sprite{
  constructor(){
    // 获取land图片
    const img = Sprite.getImage('land');
    // 获取 canvas 的宽高
    const height = DataStore.getInstance().canvas.height;
    
    // 地板的起点有坐标
    const y = height - img.height;
    super(img,0,0,img.width,img.height,0,y,img.width,img.height)
    this.cw = DataStore.getInstance().canvas.width;
    this.speed = 2; // 地板向左移动的速度
  }

  draw(){
    // 将X的值进行移动
    this.x = this.x - this.speed;
    if(this.x <= -this.srcW + this.cw){
      this.x = 0;
    }

    // 重写父类的draw方法
    super.draw(this.img,this.srcX,this.srcY,this.srcW,this.srcH,
      this.x,this.y,this.width,this.height)
  }
}
