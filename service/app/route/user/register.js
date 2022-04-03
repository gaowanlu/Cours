const requestJSON=require("../../../utils/requestJson");

/*
 *平台访问情况记录
 * */
async function register(req,res){
    let json=await requestJSON.jsonReceiver(req);
    if(json!==null){
        if(json.username&&typeof(json.username)==='string'){
            //插入到DB
            console.log(json.username,new Date());
        }
    }
    res.end();
}
module.exports=register;
