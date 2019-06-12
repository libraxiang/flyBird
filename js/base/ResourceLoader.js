import { Resources } from "./Resources.js";

// 资源加载器，保证程序在图片全部加载完成后在开始渲染
export class  ResourceLoader {
  constructor(){
    // 获取所有的资源Resource
    this.map = new Map(Resources);
    // console.log(this.map);
    // 遍历map，将其中的字符串路径替换为img对象
    for (let[k,v] of this.map){
      const img = new Image();
      img.src = v;
      // 将图片替换原来的字符串
      // map.set(key,value) 设置map的key-value值
      this.map.set(k,img);
    }
    // console.log(this.map)
  }

  onloaded(callback){
    let count = 0;
    // this.map.values() 获取map中所有的值
    for(let v of this.map.values()){
      v.onload = ()=>{
        count ++;
        // 判断图片有没有加载完成
        // this.map.size 指的是map集合的长度
        if(count >= this.map.size){
          // 所有图片加载成功
          // console.log(this.map);
          callback(this.map);
        }
      }
    }

  }




}