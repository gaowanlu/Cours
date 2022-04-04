function WorksCreator(){
    let works=null;
    return ()=>{
        if(works){
            return works;
        }else{
/*
 *Works namespace
 * */
const Works={
    routeMap:new Map(),//存储响应路由以及响应的服务函数
    urlTree:{},//构建路径响应树，快速匹配响应的服务函数

    /*@Works.route(path) 用于构建路由项
     *@param {string} path URL路径匹配
     * */
    route:(path)=>{
        return (target,name,descriptor)=>{
            Works.$addRoute(path,target[name]);
        }
    },

    /*
     * 添加path到routeMap以及urlTree的修改
     * @param {string} path works路径
     * @param {function} func 当匹配到path时使用func进行处理
     * */
    $addRoute:(path,func)=>{
        //对path进行解析
        console.log("添加新的Route，对path解析");
        //将<path,func>存进Map
        Works.routeMap.set(path,func);
    },

    /*
     *提供用户请求的path works对其进行处理
     * */
    exec:(path,req,res)=>{
        try{
            //首先尝试使用Map直接查询、没有查询到再使用urlTree进行匹配
            let func=Works.routeMap.get(path);
            if(typeof func === 'function'){
                func(req,res);
            }
        }catch(e){
            console.error(e);
        }
    },

    /*
     *Routes
     *用于对Routes Class的处理
     * */
    routes:(target)=>{
        //这里的target为其class本身
        target.$works={};
    },

        /*
        *Method 闲置处理Route函数所接受的HTTP Method
        * */
        method:(methodList)=>{
            return (target,name,descriptor)=>{
                    let methods=[];
                    if(Array.isArray(methodList)){
                        console.log("Array",methodList);
                        methods=methodList;
                    }else if(typeof methodList === "string"){
                        console.log("string",methodList);
                        methods.push(methodList);
                    }else{
                        methods.push("ALL");
                    }
                    //forEach method
                    methods.forEach(item=>{
                        console.log("Allow Method",item);
                    });
                }
        }
    }
    works=Works;
    return Works;
}
    }
}

const worksCreatorInstance=WorksCreator();

module.exports=worksCreatorInstance();
