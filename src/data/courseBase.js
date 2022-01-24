import baseInfo from './baseInfo.json';
import hello from './welcome.ts';

class CourseBaseFatory {
    constructor() {
        hello();
        this.versionControll(); //版本校验与管理
    }
    /*清空所有本地存储*/
    clear() {
        window.localStorage.clear();
    }
    /*校验版本*/
    versionControll() {
        let nowVersion = this.store.getItem('version');
        if (!nowVersion) { //没有版本信息
            this.clear();
            this.store.setItem('version', baseInfo.version);
        } else if (nowVersion !== baseInfo.version) { //版本信息不对应
            this.clear();
            this.store.setItem('version', baseInfo.version);
        }
    }
    /*现在为第几周*/
    nowWeek(newWeek) {
        return this.storeCheckBack('nowWeek', '1', newWeek);
    }
    /*现在那个学习年*/
    nowYear(newYear) {
        return this.storeCheckBack('nowYear', new Date().getFullYear().toString(), newYear);
    }
    /*那个学期 0 1 2*/
    nowTerm(newTerm) {
        return this.storeCheckBack('nowTerm', '0', newTerm);
    }
    /*存储并返回 带有检查机制*/
    storeCheckBack(key, defaultValue, data) {
        if (data) { //赋值
            //console.log("周数赋值");
            //更新周数并返回
            this.store.setItem(key, data.toString());
            return data;
        }
        if (this.store.getItem(key)) {
            //console.log("读取周数");
            return this.store.getItem(key);
        } else { //返回默认
            //console.log("返回默认周数");
            //console.log(defaultValue);
            this.store.setItem(key, defaultValue);
            return defaultValue;
        }
    }
    /*获得第index周课表*/
    week(index) {
        //普通课表
        let stuCourse = this.stuTable().data.filter(item => {
            return item.startweek <= index && item.endweek >= index && item.term === this.nowTermCode();
        });
        //实验课表
        //console.log(stuCourse);
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
            return item.startweek <= index && item.endweek >= index && item.term === this.nowTermCode();
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
                    result[x][Number(weekCourse[x][y].seq) - 1] = result[x][Number(weekCourse[x][y].seq) - 1] + " " + cname + "@" + weekCourse[x][y].croomno;
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
            localStorage.removeItem(key);
            if (typeof (obj) === 'object')
                localStorage.setItem(key, JSON.stringify(obj));
            else if (typeof (obj) === 'string')
                localStorage.setItem(key, obj);
        },
        getItem(key) {
            const result = localStorage.getItem(key);
            try {
                if (result)
                    return JSON.parse(result);
            } catch (e) {
                return result;
            }
        }
    }

    /**
     * 更新从教务系统获取到的数据
     * @param {*} data 接口返回的data部分
     */
    update = async (data) => {
        this.store.setItem('stuTable', JSON.stringify(data.stuTable));
        this.store.setItem('labTable', JSON.stringify(data.labTable));
        this.store.setItem('score', JSON.stringify(data.stuScore));
        this.store.setItem('selfInfo', JSON.stringify(data.personInfo));
        this.store.setItem('hours', JSON.stringify(data.hours));
        this.store.setItem('bk', JSON.stringify(data.bk));
        this.store.setItem('examap', JSON.stringify(data.examap));
        this.store.setItem('fee', JSON.stringify(data.fee));
        this.store.setItem('plancj', JSON.stringify(data.plancj));
        this.store.setItem('sctCourse', JSON.stringify(data.sctCours));
        this.store.setItem('terTime', JSON.stringify(data.terTime));
        this.store.setItem('yxxf', JSON.stringify(data.yxxf));
        console.log("更新从教务系统获取到的数据完毕");
    }

    /*实验课表*/
    labTable() {
        let result = this.store.getItem('labTable');
        if (result)
            return this.store.getItem('labTable');
        return {
            data: []
        };
    }
    /*成绩*/
    score() {
        let result = this.store.getItem('score');
        if (result)
            return this.store.getItem('score');
        return {
            data: []
        };
    }
    /*学生成绩*/
    selfInfo() {
        let result = this.store.getItem('selfInfo');
        if (result) {
            return this.store.getItem('selfInfo');
        }
        return {
            data: []
        };
    }
    /*教室课程课表*/
    stuTable() {
        let result = this.store.getItem('stuTable');
        if (result)
            return this.store.getItem('stuTable');
        return {
            data: []
        };
    }
    /*获取现在的学期编号*/
    nowTermCode() {
        let term = this.store.getItem('terTime');
        if (term) {
            return term.data[0].term;
        }
    }
};

const courseBase = new CourseBaseFatory();
console.log('现在的学期编号为', courseBase.nowTermCode());
export default courseBase;