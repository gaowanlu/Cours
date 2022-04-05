const Works=require('./index.js');

@Works.routes
class Routes{
    @Works.route("/")
    @Works.method(["GET","POST"])
    index(req,res){
        console.log("req",req);
        console.log("res",res);
    }
}
const route=new Routes();

Works.exec("/",{name:'request'},{name:'response'});
