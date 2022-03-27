const requestJSON=require("../../../utils/requestJson");
async function register(req,res){
    let json=await requestJSON.jsonReceiver(req);
    if(json!==null){
        console.log(json);
    }
    res.end();
}
module.exports=register;
