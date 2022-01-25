import {
    createSlice
} from '@reduxjs/toolkit';

const initialState = {
    list: [{
            title: "开发社区",
            rows: [{
                    title: "Github",
                    content: "github.com/gaowanlu"
                },
                {
                    title: "CSDN",
                    content: "blog.csdn.net/qq_45812941"
                },
                {
                    title: "QQ交流群",
                    content: "787280986"
                }
            ],
        },
        {
            title: "工作",
            rows: [{
                    title: "工作邮箱",
                    content: "heizuboriyo@gmail.com"
                },
                {
                    title: "地址",
                    content: "桂林电子科技大学(花江校区)"
                },
            ],
        },
        {
            title: "开发者",
            rows: [{
                    title: "QQ",
                    content: "2209120827"
                },
                {
                    title: "微信",
                    content: "WanluGao"
                },
            ],
        }
    ]
}


export const concatUsInfoSlice = createSlice({
    name: 'concatUsInfo',
    initialState,
    reducers: {
        // someOperator: (state) => {

        // }
    }
});

const selectInfoList = state => state.concatUsInfo.list;


// const {
//     someOperator
// } = concatUsInfoSlice.actions;

export {
    selectInfoList
};


export default concatUsInfoSlice.reducer;