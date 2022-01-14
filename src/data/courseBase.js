import scoreJSON from './score.json';
import selfInfoJSON from './selfInfo.json';
import labTableJSON from './labtable.json';
import stuTableJSON from './stutable.json';

class CourseBaseFatory {
    constructor() {
        console.log("v0.0.1 CourseBase");
        this.store.setItem('labTable', labTableJSON);
        this.store.setItem('score', scoreJSON);
        this.store.setItem('selfInfo', selfInfoJSON);
        this.store.setItem('stuTable', stuTableJSON);
        // console.log("labTable", this.labTable());
        // console.log("score", this.score());
        // console.log("selfInfo", this.selfInfo());
        // console.log("stuTable", this.stuTable());
    }
    /*实验课表*/
    labTable(data) {
        return this.store.getItem('labTable');
    }
    /*成绩*/
    score(data) {
        return this.store.getItem('score');
    }
    /*学生成绩*/
    selfInfo(data) {
        return this.store.getItem('selfInfo');
    }
    /*教室课程课表*/
    stuTable(data) {
        return this.store.getItem('stuTable');
    }
    /*更新数据*/
    update(data) {
        return "更新成功";
    }
    /*现在为第几周*/
    nowWeek(data) {
        return 1;
    }
    /*开学日期*/
    terminalStart(data) {
        return new Date();
    }
    /*更新主题信息*/
    style(updated) {
        return {
            backgroundColor: '#fafafa'
        }
    }
    /*获得第index周课表*/
    week(index) {
        let stuCourse = this.stuTable().data.filter(item => {
            return item.startweek <= index && item.endweek >= index;
        });
        let labCourse = this.labTable().data.map(item => {
            return {
                startweek: item.zc,
                endweek: item.zc,
                seq: item.jc.toString(),
                week: item.xq,
                croomno: item.srdd,
                ...item
            };
        }).filter(item => {
            return item.startweek <= index && item.endweek >= index;
        });
        return [...stuCourse, ...labCourse];
    }
    /*获取今天课表*/
    day() {
        //获取这周的课表
        let weekCourse = this.weekFormat(this.nowWeek());
        //获取现在时间
        let date = this.nowTime();
        let day = date.weekNum === 0 ? 7 : date.weekNum;
        let dayCourse = weekCourse[day];
        return dayCourse;
    }
    /*获取现在时间*/
    nowTime() {
        var mydate = new Date();
        var myddy = mydate.getDay(); //获取存储当前日期
        var month = mydate.getMonth();
        var day = mydate.getDate();
        var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        return {
            month,
            day,
            week: weekday[myddy],
            weekNum: myddy,
            toString() {
                return (this.month + 1) + " 月 " + this.day + " 日 " + this.week;
            }
        }
    }
    /*获得第index周课表：格式化*/
    weekFormat(index) {
        let table = this.week(index);
        let courses = [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ];
        for (let i = 0; i < table.length; i++) {
            courses[Number(table[i].week)].push(table[i]);
        }
        for (let i = 0; i < courses.length; i++) {
            courses[i] = courses[i].sort((a, b) => {
                return Number(a.seq) - Number(b.seq);
            });
        }
        return courses;
    }

    /**
     * 周课表视图数据
     * @param index 第index周
     * @returns 视图数据列表
     */
    weekViewFormat(index) {
        let weekCourse = this.weekFormat(index);
        let result = [];
        for (let x = 0; x < weekCourse.length; x++) {
            result.push([undefined, undefined, undefined, undefined, undefined]);
            for (let y = 0; y < weekCourse[x].length; y++) {
                weekCourse[x][y].cname = weekCourse[x][y].cname.replace(" ", "");
                let cname = weekCourse[x][y].cname.length >= 6 ? weekCourse[x][y].cname.substr(0, 6) : weekCourse[x][y].cname;
                if (result[x][Number(weekCourse[x][y].seq) - 1] === undefined) {
                    result[x][Number(weekCourse[x][y].seq) - 1] = cname + "@" + weekCourse[x][y].croomno;
                } else { //课程冲突
                    result[x][Number(weekCourse[x][y].seq) - 1] = result[x][Number(weekCourse[x][y].seq) - 1] + "<br/>" + cname + "@" + weekCourse[x][y].croomno;
                }
            }
        }
        let format = [];
        for (let x = 0; x < result.length; x++) {
            for (let y = 0; y < result.length; y++) {
                if (result[x][y] !== undefined) {
                    format.push({
                        x,
                        y,
                        text: result[x][y]
                    });
                }
            }
        }
        return format;
    }

    /**
     * 获取日课程列表视图格式数据列表
     */
    dayViewFormat() {
        let result = this.day();
        result = result.map(item => {
            return {
                seq: `第${item.seq}节`,
                cname: `${item.cname}`,
                room: `${item.croomno}`,
                teacher: `${item.name}`
            }
        })
        return result;
    }

    /*本地存储*/
    store = {
        setItem(key, obj) {
            if (typeof (obj) === 'object')
                localStorage.setItem(key, JSON.stringify(obj));
            else if (typeof (obj) === 'string')
                localStorage.setItem(key, obj);
        },
        getItem(key) {
            return JSON.parse(localStorage.getItem(key));
        }
    }
};

const courseBase = new CourseBaseFatory();
export default courseBase;