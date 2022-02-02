import {
    createSlice
} from '@reduxjs/toolkit';
import baseInfo from '../../data/baseInfo.json';

const initialState = {
    projectInfoList: {
        title: "开发背景",
        rows: [{
                title: "开发团队",
                content: "桂林电子科技大学 Cours Developer Team"
            },
            {
                title: "目标",
                content: "开发出易用的工具便于校内同学们使用"
            },
            {
                title: "版本",
                content: baseInfo.version
            },
        ],
    },
    wishInfoList: {
        title: "我们希望",
        rows: [{
                title: "应用使用",
                content: "这只是一个编码小子写出来的东西，如果您体验较好我非常荣幸，但仍需注意它可能有时会出问题。如上课信息、考试安排大家能够查看教务系统对比，以免误导大家。",
            },
            {
                title: "加入我们",
                content: "如果您也热爱编码、熟悉软件开发知识或者React Node UI设计以及美术等，并且您希望将Cours变得更好，我们非常希望您加入我们共同改进它。",
            },
            {
                title: "贡献",
                content: "服务的运行需要花销费用、如果服务有时会崩使用者请谅解。贡献Everything 联系 heizuboriyo@gmail.com 。",
            },
        ]
    }
}


export const aboutUsInfoSlice = createSlice({
    name: 'aboutUsInfo',
    initialState,
    reducers: {
        someOperator: (state) => {

        }
    }
});

const selectProjectInfoList = (state) => {
    return state.aboutUsInfo.projectInfoList;
}
const selectWishInfoList = (state) => {
    return state.aboutUsInfo.wishInfoList;
}

export const {
    someOperator
} = aboutUsInfoSlice.actions;

export {
    selectProjectInfoList,
    selectWishInfoList
};


export default aboutUsInfoSlice.reducer;