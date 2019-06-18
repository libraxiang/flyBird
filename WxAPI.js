export class WxAPI{
  constructor(){

  }
  // 播放背景音乐
  playMusic(){
      const music = wx.createInnerAudioContext();
      music.src = './audios/bgm.mp3';
      music.loop = true;
      music.play();
    }

  // 获取手机基本信息
  getSysInfo(){
    wx.getSystemInfo({
      success(res) {
        console.log(res);
      }
    });
  }
  // 获取登陆用户信息
  getUserInfo(callback){
    /* 不建议使用，不支持了 */
    /**
     * wx.getUserInfo({
     *  success(){
     * }, 
     *fail(){
     * }
     * })
     */
    let button = wx.createUserInfoButton({
      type: 'text',
      text: '获取用户信息',
      style: {
        left: 10,
        top: 76,
        width: 200,
        height: 40,
        lineHeight: 40,
        backgroundColor: '#ff0000',
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 16,
        borderRadius: 4
      }
    })
    button.onTap((res) => {
      // console.log(res);
      if(res.userInfo){
        // 有userInfo，说明已经授权
        button.destroy();
        callback();
      }
    })
  }

// 发送HTTP请求
  sendHttp(){
    wx.request({
      url: 'http://localhost:4000',
      success(res){
        console.log(res);
      }
    })
  }

  // 发送socket请求
  socket(){
    // 连接服务器
    wx.connectSocket({
      url: 'ws://localhost:8080',
      success(res){
        console.log("success:",res);
      },
      fail(err){
        console.log("fail:",err)
      }
    });
    // 连接成功后
    wx.onSocketOpen(function(){
      wx.sendSocketMessage({
        data: "微信小游戏发送给服务器的数据",
        success(){
          console.log("发送数据成功！")
        }
      });
      wx.onSocketMessage(function(res){
        console.log(res.data);
      })
    })
  }

  // 下载文件
 downLoad(){
   wx.downloadFile({
     url:"http://img5.imgtn.bdimg.com/it/u=2831081695,3291960458&fm=26&gp=0.jpg",
     success(res){
       console.log(res);
       let path  = res.tempFilePath; // 获取临时地址
       wx.saveImageToPhotosAlbum({
         filePath: path,
         success(r){
           console.log(r);
         }
       })
     }
   })
 }



}