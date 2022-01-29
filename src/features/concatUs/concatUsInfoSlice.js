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