/*学分绩计算
 */
import courseBase from './courseBase';

async function xfjCalc() {
    let plancj = courseBase.plancj();
    //根据学期进行map
    let plan = splitUseTerm(plancj);
    courseBase.score((result) => {
        let {
            data
        } = result;
        let score = splitUseTerm(data);
        recTermFormat(plan, score);
    });
}

/*根据term分类*/
function splitUseTerm(data) {
    let score = {};
    for (let i = 0; i < data.length; i++) {
        if (score.hasOwnProperty(data[i].term)) {
            score[data[i].term].push(data[i]);
        } else {
            score[data[i].term] = [];
            score[data[i].term].push(data[i]);
        }
    }
    return score;
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
    console.log("plancj", plan);
    console.log("score", score);
}

export default xfjCalc;