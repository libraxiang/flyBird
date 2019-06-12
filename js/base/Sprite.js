import { DataStore } from "./DataSore.js";

// 所有图片的父类

export class Sprite{
  /**
   * img         :图片
   * srcX        :图片的X坐标
   * srcY        :图片的Y坐标
   * srcW        :图片的宽
   * srcH        :图片的高
   * x           :
   * y           :
   * width       :
   * height      :
   */
  constructor(img = null,srcX = 0,srcY = 0,srcW = 0,srcH = 0,x = 0,y = 0,width = 0,height = 0){
    this.dataStore = DataStore.getInstance();
    this.ctx = this.dataStore.ctx;
    this.img = img;
    this.srcX = srcX;
    this.srcY = srcY;
    this.srcW = srcW;
    this.srcH = srcH;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  // 定义画图的方法
  draw(img = this.img,
    srcX = this.srcX,
    srcY = this.srcY,
    srcW = this.srcW,
    srcH = this.srcH,
    x = this.x,y = this.y,
    width = this.width,
    height = this.height){
      this.ctx.drawImage(img,srcX,srcY,srcW,srcH,x,y,width,height);
  }


  // 获取指定名称的图片
  // 使用 static 的原因：不需要创建Sprite实例对象，直接通过Sprite类来调用
  static getImage(key){
    return DataStore.getInstance().res.get(key);
  }
}