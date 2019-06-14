import { Pipe } from "./Pipe.js";
import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";


// 下半部的水管

export class DownPipe extends Pipe{
  constructor(top){
    const img = Sprite.getImage('pieDown');
    super(img,top);
  }

  draw(){
    // 设置上下水管的距离
    const gap = DataStore.getInstance().canvas.height/7;
    this.y = gap + this.top;
    super.draw();
  }
}