import score from './score.json';
import selfInfo from './selfInfo.json';
import labTable from './labtable.json';
import stuTable from './stutable.json';

const localStore = {
    /*实验课表*/
    labTable() {
        return labTable;
    },
    /*成绩*/
    score() {
        return score;
    },
    /*学生成绩*/
    selfInfo() {
        return selfInfo;
    },
    /*教室课程课表*/
    stuTable() {
        return stuTable;
    },
    /*更新数据*/
    update() {
        return "更新成功";
    },
    /*现在为第几周*/
    nowWeek() {
        return 1;
    },
    /*开学日期*/
    terminalStart() {
        return new Date();
    }
};

export default localStore;