import {
    createSlice
} from '@reduxjs/toolkit';

const initialState = {
    projectInfoList: {
        title: "开发背景",
        rows: [{
                title: "开发者",
                content: "一个桂电软工的菜鸡。"
            },
            {
                title: "愿景",
                content: "希望让自己写的东西方便大家。"
            },
            {
                title: "版本",
                content: "v0.0.1"
            },
        ],
    },
    wishInfoList: {
        title: "我的愿望",
        rows: [{
                title: "关于应用使用",
                content: "这只是一个编码小子写出来的东西，如果您体验较好我非常荣幸，但仍需注意它可能有时会出问题。如上课信息、考试安排大家能够查看教务系统对比，以免误导大家。",
            },
            {
                title: "加入我们",
                content: "如果您也热爱编码、熟悉软件开发知识或者React Node UI设计以及美术等，并且您希望将Cours变得更好，我们非常希望您加入我们共同改进它。",
            },
            {
                title: "说不的事",
                content: "如果发现BUG希望您做出正确的事情、请不要测试我们的API、它的能力真的很弱。",
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