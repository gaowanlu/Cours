const getAllUser = require('../../../service/user/getAllUser');
/**
 * 用户数据分析
 */
class Analysis {
    static async analysis(req, res) {
        res.setHeader('Content-Type', 'application/json;utf-8');
        let users = await getAllUser(); //获得所有用户
        let distribution = Analysis.distribution(users);
        res.write(JSON.stringify({
            distribution,
            count: users.length
        }));
        res.end();
    }
    static distribution(users) {
        users.filter((o) => {
            return o.length === 10;
        });
        let grades = new Map();
        let colleges = new Map();
        users.forEach(element => {
            let grade = parseInt(element.userId.slice(0, 2));
            let college = parseInt(element.userId.slice(2, 5));
            if (grades.has(grade))
                grades.set(grade, grades.get(grade) + 1);
            else
                grades.set(grade, 1);
            if (colleges.has(college))
                colleges.set(college, colleges.get(college) + 1);
            else
                colleges.set(college, 1);
        });
        return {
            colleges: Array.from(colleges),
            grades: Array.from(grades)
        };
    }
}


module.exports = Analysis.analysis;