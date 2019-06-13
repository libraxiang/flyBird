import { Pipe } from "./Pipe.js";
import { Sprite } from "../base/Sprite.js";

// 上半部水管

export class UpPipe extends Pipe{
  constructor(top){
    // 获取上部水管的图片
    const  img = Sprite.getImage('pieUp');
    
    // 重写父类构造
    super(img,top);
  }
  
  // 重写draw方法，根据top的值来决定水管的高度
  draw(){
    // - this.srcH 表示水管完全出界了，加上top表示伸出一点点
    this.y = this.top - this.srcH;
    console.log('up ',222)
    super.draw();
  }
}