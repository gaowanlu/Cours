/*学分绩计算
 */
import courseBase from './courseBase';

/*根据term分类 变为以{term:[],term:[]} 格式*/
function splitUseTerm(array) {
    const result = {};
    for (let i = 0; i < array.length; i++) {
        const term = array[i].term
        if (result.hasOwnProperty(term)) {
            result[term].push(array[i]);
        } else {
            result[term] = [array[i]];
        }
    }
    return result;
}

/*将计划与成绩中的keys进行一致*/
function recTermFormat(plan, score) {
    /*校对plan与score的key 示其同步 便于一个学期一个学期的进行计算*/
    let planKeySet = new Set(Object.keys(plan));
    let scoreKeySet = new Set(Object.keys(score));
    /*求差集*/
    let score_should = new Set([...planKeySet].filter(x => !scoreKeySet.has(x)));
    let plan_should = new Set([...scoreKeySet].filter(x => !planKeySet.has(x)));
    /*不全key*/
    for (let term of score_should) {
        score[term] = [];
    }
    for (let term of plan_should) {
        plan[term] = [];
    }
    return [plan, score]; //下一步处理
}

/*计算数据预处理*/
function calcPreprocess(rec_plan, rec_score) {
    //console.log("rec_plan", rec_plan);
    //console.log("rec_score", rec_score);
    const B_plan = {}; //课程计划先只加载B开头的
    let B_plan_array = [];
    for (let term in rec_plan) {
        B_plan[term] = rec_plan[term].filter((o, i, a) =>
            o.courseid.toLowerCase().startsWith("b")
        );
        B_plan_array = [...B_plan_array, ...B_plan[term]];
    }
    //console.log("B_plan", B_plan);
    //console.log("B_plan_array", B_plan_array);
    //成绩只先加载B开头和X开头的
    const B_X_score = {}; //B开头和X开头的成绩
    let B_X_score_array = [];
    for (let term in rec_score) {
        B_X_score[term] = rec_score[term].filter((o, i, a) =>
            o.courseid.toLowerCase().startsWith("b") || o.courseid.toLowerCase().startsWith("x")
        );
        B_X_score_array = [...B_X_score_array, ...B_X_score[term]];
    }
    //console.log("B_X_score", B_X_score);
    //console.log("B_X_score_array", B_X_score_array);
    //将BS开头的列入课程计划
    let plans = [];
    B_plan_array.forEach((o, i, a) => {
        o.cjlx = o.courseid.toLowerCase().startsWith("bs") ? 1 : 0;
        plans.push(o);
    });
    //console.log("plans", plans);
    //限选课程
    let XZ_course = {};
    B_X_score_array.forEach((o) => {
        if (o.courseid.toLowerCase().startsWith("xz")) {
            if (!XZ_course.hasOwnProperty(o.courseid)) {
                XZ_course[o.courseid] = [o];
            } else {
                XZ_course[o.courseid].push(o);
            }
        }
    });
    //console.log("XZ_course", XZ_course);
    //对于每一门限选课程进行处理  
    for (let courseid in XZ_course) {
        let scoreList = XZ_course[courseid];
        let pass = false;
        for (let o of scoreList) {
            if (o.score >= 60) {
                pass = true;
                break;
            }
        }
        //如果这门限选课程通过了，那么将其添加到课程计划中
        //则将计算算入到学分绩中
        if (pass) {
            scoreList.sort((a, b) => { // 时间早的排前面
                if (a.term > b.term) {
                    return 1;
                } else if (a.term < b.term) {
                    return -1;
                } else {
                    return 0;
                }
            });
            //let before_term = scoreList[0].term; //最早学期
            scoreList.sort((a, b) => {
                if (a.score > b.score) {
                    return -1;
                } else if (a.score < b.score) {
                    return 1;
                } else {
                    return 0;
                }
            });
            //最好分数的学期
            let best_term = scoreList[0].term;
            //最好分数
            let best_score = scoreList[0].score;
            //console.log(scoreList[0]);
            plans.push({
                courseid,
                cname: '',
                term: best_term,
                xf: scoreList[0].xf,
                credithour: scoreList[0].credithour,
                score: best_score,
                cjlx: scoreList[0].cjlx
            });
        }
    }
    return [plans, B_X_score_array]; //下一步
}

//计算
function calc(plans, scores) {
    //遍历课程计划
    for (let item of plans) {
        let courseSameId = [];
        for (let item_ of scores) {
            if (item_.courseid === item.courseid) {
                courseSameId.push(item_);
            }
        }
        let final_term = ''; //需要算到final_term内的学分绩中
        //没有此计划课程代码的成绩记录
        if (courseSameId.length === 0) {
            // 如果有入选成绩，则取入选成绩的选修学期作为最终计入学分绩计算的学期
            if (item.sterm && item.sterm !== '') {
                final_term = item.sterm;
            }
        } else { // 存在此计划课程代码的成绩记录，取其中最早的成绩记录的选修学期作为最终计入学分绩计算的学期
            courseSameId.sort((a, b) => { // 时间早的排前面
                if (a.term > b.term) {
                    return 1;
                } else if (a.term < b.term) {
                    return -1;
                } else {
                    return 0;
                }
            });
            final_term = courseSameId[0].term;
        }
        item.final_term = final_term;
    }
    //以除final_term===''的计划课程 不将其计入到学分绩内
    plans = plans.filter((o) => {
        return o.final_term && o.final_term !== '';
    });
    //console.log("PLANS", plans);

    //按照学期进行mapper
    let plans_term = splitUseTerm(plans);
    let scores_term = splitUseTerm(scores);
    //console.log("plans_term", plans_term);
    //console.log("scores_term", scores_term);
    /*校对plan与score的key 示其同步 便于一个学期一个学期的进行计算*/
    let planKeySet = new Set(Object.keys(plans_term));
    let scoreKeySet = new Set(Object.keys(scores_term));
    /*求差集*/
    let score_should = new Set([...planKeySet].filter(x => !scoreKeySet.has(x)));
    let plan_should = new Set([...scoreKeySet].filter(x => !planKeySet.has(x)));
    /*不全key*/
    for (let term of score_should) {
        scores_term[term] = [];
    }
    for (let term of plan_should) {
        plans_term[term] = [];
    }
    //遍历每个学期计算学分绩
    let xfj = {};
    for (let term in plans_term) {
        if (plans_term[term].length === 0) {
            xfj[term] = {
                result: 100,
                zxf: 0,
                courses: plans_term[term]
            }
        } else { //此学期含有计划课程，则此学年应该计算学分绩
            let zxf = 0; //总学分
            plans_term[term].forEach(o => zxf += parseFloat(o.credithour || o.xf));
            //填写每一门计划课程的计入学分绩计算的分数及其类型
            plans_term[term].forEach((o) => {
                if (o.sterm && o.sterm !== '') {
                    o.final_score = o.score;
                    o.final_score_type = o.cjlx;
                } else { //没有入选成绩，取最好的成绩记录
                    let best = scores.filter(score => score.courseid === o.courseid);
                    best = best.sort((a, b) => a.score - b.score).reverse();
                    o.final_score = best[0].score;
                    o.final_score_type = best[0].cjlx;
                }
            });
            xfj[term] = {
                result: 100,
                zxf,
                courses: plans_term[term]
            }
        }
    }

    //根据每学期的最终信息计算学分绩
    for (let term in xfj) {
        let sum = 0;
        xfj[term].courses.forEach(o => {
            let xuefen = parseFloat(o.credithour || o.xf);
            sum += o.final_score * (xuefen / xfj[term].zxf);
        });
        xfj[term].result = sum.toFixed(2);
    }
    //console.log(xfj);

    //计算总共的学分绩
    let result_all = 0;
    let zxf = 0; //入学以来总学分
    for (let term in xfj) {
        zxf += xfj[term].zxf;
    }
    //console.log("总学分", zxf);
    for (let term in xfj) {
        result_all += xfj[term].result * (xfj[term].zxf / zxf);
    }
    //console.log("总学分绩", result_all);
    return {
        xfj,
        result_all: result_all.toFixed(2)
    }
}

async function xfjCalc(callback) {
    let getResult = {
        xfj: [],
        result_all: 100
    }
    try {
        let plancj = courseBase.plancj();
        //根据学期进行map
        let plan = splitUseTerm(plancj);
        courseBase.score((result) => {
            let score = splitUseTerm(result.data);
            [plan, score] = recTermFormat(plan, score); //下一步处理
            const [plans, B_X_score_array] = calcPreprocess(plan, score);
            getResult = calc(plans, B_X_score_array);
            //console.log("getResult", getResult);
        });
    } catch (e) {
        console.error(e);
    } finally {
        callback(getResult);
    }
}

export default xfjCalc;