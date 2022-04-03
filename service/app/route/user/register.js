const requestJSON=require("../../../utils/requestJson");

const counter={
    sum:0,
    add:function (){
        this.sum++;
    }
}

/*
 *平台访问情况记录
 * */
async function register(req,res){
    res.setHeader('Content-Type','application/json;utf-8');
    let json=await requestJSON.jsonReceiver(req);
    if(json!==null){
        if(json.username&&typeof(json.username)==='string'){
            console.log(json.username,new Date());
            counter.add();
        }
    }
    res.write(JSON.stringify({
        sum:counter.sum
    }));
    res.end();
}
module.exports=register;
