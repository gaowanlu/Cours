import {
    createSlice
} from '@reduxjs/toolkit';
import themeLoad from '../../utils/themeLoad';

const initialState = {
    theme_name: themeLoad()
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        themeChange: (state) => {
            console.log(state.theme_name);
            if (state.theme_name === "dark") { //dark => normal
                themeLoad("normal");
                state.theme_name = "normal";
            } else { //normal=>dark
                themeLoad("dark");
                state.theme_name = "dark";
            }
        }
    }
});

export const selectTheme = state => state.theme;

export const {
    themeChange
} = themeSlice.actions;



export default themeSlice.reducer;