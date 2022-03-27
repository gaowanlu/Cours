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
        let autoTime = this.store.getItem('autoTime');
        let real_time = 1;
        //没有定义过autoTime 则自动使用autoTime
        if (autoTime === undefined) {
            this.store.setItem('autoTime', 'true');
            autoTime = true;
        }
        if (autoTime) {
            //动态计算学期第几周
            const now = new Date();
            const term_start = new Date(2022, 1, 21);
            real_time = Math.ceil((now - term_start) / (60 * 60 * 24 * 1000) / 7);
            console.log((now - term_start) / (60 * 60 * 24 * 1000) / 7);
            this.store.setItem('nowWeek', real_time.toString());
        }
        console.log("现在为第几周", real_time);
        return this.storeCheckBack('nowWeek', '1', newWeek);
        //return real_time;
    }
    /*现在那个学习年*/
    nowYear(newYear) {
        return this.storeCheckBack('nowYear', new Date().getFullYear().toString(), newYear);
    }
    /*那个学期 0 1 2*/
    nowTerm(newTerm) {
        return this.storeCheckBack('nowTerm', '0', newTerm);
    }
    /*是否进行时间自动校准*/
    autoTime(newAutoTime) {
        //进行更新
        if (newAutoTime !== undefined && (newAutoTime === "true" || newAutoTime === "false")) {
            this.store.setItem('autoTime', newAutoTime.toString());
            return newAutoTime === "true"; //更新完毕
        }
        let result = (this.store.getItem('autoTime') === true).toString();
        //处理没有此key value情况
        //console.log(typeof result, result);
        if (result === "true" || result === "false") {
            return result === "true";
        } else {
            this.store.setItem('autoTime', 'true');
            return true;
        }
    }
    /*存储并返回 带有检查机制*/
    storeCheckBack(key, defaultValue, data) {
        if (data) { //赋值
            this.store.setItem(key, data.toString());
            return data;
        }
        if (this.store.getItem(key)) {
            return this.store.getItem(key);
        } else { //返回默认
            this.store.setItem(key, defaultValue);
            return defaultValue;
        }
    }
    /*获得第index周课表*/
    week(index) {
        //普通课表
        console.log("this.stuTable().data", this.stuTable().data);
        console.log("index", index);
        console.log("nowTermCode", this.nowTermCode());
        let stuCourse = this.stuTable().data.filter(item => {
            return item.startweek <= index && item.endweek >= index && item.term === this.nowTermCode();
        });
        //实验课表
        console.log("stuCourse", stuCourse);
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
            return item.startweek <= index && item.endweek >= index; //&& item.term === this.nowTermCode();
        });
        return [...stuCourse, ...labCourse];
    }
    /*获取今天课表*/
    day() {
        //获取这周的课表
        let weekCourse = this.weekFormat(this.nowWeek());
        console.log("weekCourse", weekCourse);
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
        console.log("table", table);
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
        //遍历一周的内容
        for (let x = 0; x < weekCourse.length; x++) {
            result.push([undefined, undefined, undefined, undefined, undefined]); //每天的五节任务初始化为undefined
            for (let y = 0; y < weekCourse[x].length; y++) {
                weekCourse[x][y].cname = weekCourse[x][y].cname.replace(" ", ""); //清楚课程名空格
                let cname = weekCourse[x][y].cname.length >= 6 ? weekCourse[x][y].cname.substr(0, 6) : weekCourse[x][y].cname; //课程名长度限制
                if (result[x][Number(weekCourse[x][y].seq) - 1] === undefined) {
                    result[x][Number(weekCourse[x][y].seq) - 1] = {
                        text: cname + "@" + weekCourse[x][y].croomno,
                        obj: [weekCourse[x][y]]
                    };
                } else { //课程冲突 这一节已经被占用 则进行追加
                    result[x][Number(weekCourse[x][y].seq) - 1].text = result[x][Number(weekCourse[x][y].seq) - 1].text + " " + cname + "@" + weekCourse[x][y].croomno;
                    result[x][Number(weekCourse[x][y].seq) - 1].obj.push(weekCourse[x][y]);
                }
            }
        }
        let format = []; //格式化 xy坐标将节数定位
        for (let x = 0; x < result.length; x++) {
            for (let y = 0; y < result.length; y++) {
                if (result[x][y] !== undefined) {
                    format.push({
                        x,
                        y,
                        text: result[x][y].text,
                        obj: result[x][y].obj
                    });
                }
            }
        }
        return format;
    }

    /**
     * 获得课程时间对照
     */
    getHours() {
        let result = this.store.getItem('hours');
        if (result)
            return this.store.getItem('hours');
        return {
            data: []
        };
    }

    /**
     * 获取日课程列表视图格式数据列表
     */
    dayViewFormat() {
        let hours = this.getHours().data;
        let result = this.day();
        console.log("result", result);
        result = result.map(item => {
            return {
                seq: `第${item.seq}节`,
                cname: `${item.cname}`,
                room: `${item.croomno}`,
                teacher: `${item.name}`,
                hours: hours[parseInt(item.seq) - 1] //这节课在什么时间时上课信息
            }
        })
        return result;
    }

    /*本地存储*/
    store = {
        setItem(key, obj) {
            //localStorage.removeItem(key);
            if (typeof (obj) === 'object') {
                localStorage.setItem(key, JSON.stringify(obj));
            } else if (typeof (obj) === 'string') {
                localStorage.setItem(key, obj);
            }
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
    async score(callback) {
        let result = this.store.getItem('score');
        if (result) {
            let {
                data
            } = result;
            data.sort((a, b) => {
                return a.term - b.term;
            });
            callback(result);
        } else
            callback({
                data: []
            });
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
    /*考试计划*/
    examList() {
        let result = this.store.getItem('examap');
        if (result) {
            const data = this.store.getItem('examap').data;
            const formated = [];
            //重新格式化
            try {
                data.forEach((o, i, a) => {
                    formated.push({
                        cname: o.cname,
                        courseid: o.courseid,
                        courseno: o.courseno,
                        croomno: o.croomno,
                        examdate: o.examdate,
                        kssj: o.kssj,
                        date: {
                            year: Number(o.examdate.split('-')[0]),
                            month: Number(o.examdate.split('-')[1]),
                            day: Number(o.examdate.split('-')[2]),
                            time: { //19:00-21:00
                                start: {
                                    hours: Number(o.kssj.split(':')[0]),
                                    minute: Number(o.kssj.split(':')[1].split('-')[0])
                                },
                                end: {
                                    hours: Number(o.kssj.split(':')[1].split('-')[1]),
                                    minute: Number(o.kssj.split(':')[2])
                                }
                            },
                            //Date对象
                            obj: new Date(Number(o.examdate.split('-')[0]),
                                Number(o.examdate.split('-')[1]) - 1,
                                Number(o.examdate.split('-')[2]),
                                Number(o.kssj.split(':')[1].split('-')[1]),
                                Number(o.kssj.split(':')[2])
                            )
                        },
                    });
                    //console.log(formated[i].date.obj);
                });
                //排序formated
                formated.sort((a, b) => {
                    if (a.date.obj < b.date.obj) { // 按某种排序标准进行比较, a 小于 b
                        return 1;
                    }
                    if (a.date.obj > b.date.obj) {
                        return -1;
                    }
                    // a must be equal to b
                    return 0;
                })
                //分为两类一类为待办 一类为已完成并进行先后顺序的排序
                const ok = formated.filter((o) => {
                    return o.date.obj - (new Date()) < 0;
                });
                //待办
                const todo = formated.filter((o) => {
                    return o.date.obj - (new Date()) > 0;
                });
                return {
                    data: {
                        ok,
                        todo
                    }
                };
            } catch (e) {
                console.warn(e);
            }
            //console.log(data);
            //console.log(formated);
        }
        return {
            data: {
                ok: [],
                todo: []
            }
        };
    }
    /*获取现在的学期编号*/
    nowTermCode() {
        //根据学年 、 春0秋1三2季 、获得学期编号
        //const last = ['2', '1', '3']; //后缀
        //const nowYear = this.nowYear();
        // console.log("nowyear", this.nowYear());
        // console.log("nowTerm", this.nowTerm());
        //let code = String(nowYear - 1) + "-" + String(nowYear) + "_" + last[parseInt(this.nowTerm())];
        // console.log(code);
        // let term = this.store.getItem('terTime');
        // if (term && term.data) {
        //     return term.data[0].term;
        // }
        return '2021-2022_2';
    }
    /*课程计划*/
    plancj() {
        let data = this.store.getItem('plancj');
        if (data) {
            return data.data;
        }
        return [];
    }
};

const courseBase = new CourseBaseFatory();

// console.log(courseBase.nowTermCode());
export default courseBase;
