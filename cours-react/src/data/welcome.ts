import baseInfo from './baseInfo.json';
import registerAPI from '../api/registerAPI.js';

/*
* 做一些用户进入页面然后此时我们想做的事情
*/
function welcome() {
    let version: string = baseInfo.version;
    console.info(draw);
    console.log("我们携起手来改变世界 2022 @桂林电子科技大学");
    console.log("Cours " + version);
    //像平台提交访问记录
    register.postUsername((res)=>{
        console.log("Welcome");
    },String(Math.random()))
}

const draw: string =`
   _____ _    _ ______ _______    _____                     
  / ____| |  | |  ____|__   __|  / ____|                    
 | |  __| |  | | |__     | |    | |     ___  _   _ _ __ ___ 
 | | |_ | |  | |  __|    | |    | |    / _ \\| | | | '__/ __|
 | |__| | |__| | |____   | |    | |___| (_) | |_| | |  \\__ \\
  \\_____|\\____/|______|  |_|     \\_____\\___/ \\__,_|_|  |___/ 
                                                              
                                     Cours Design By Wanlu       
                                                            `;
export default welcome;
