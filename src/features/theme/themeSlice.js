import {
    createSlice
} from '@reduxjs/toolkit';

function darkState(state) {
    state.darkMode = true;
    state.color = {};
    state.color.background = 'var(--color-background-dark)';
    state.color.color = 'var(--color-color-dark)';
    state.color.frontBackground = 'var(--color-background-front-dark)';
    state.box = {};
    state.box.boxShadow = 'var(--box-shadow-dark)';
    localStorage.setItem('theme', 'dark');
    return state;
}

function normalState(state) {
    state.darkMode = false;
    state.color = {};
    state.color.background = 'var(--color-background)';
    state.color.color = 'var(--color-color)';
    state.color.frontBackground = 'var(--color-background-front)';
    state.box = {};
    state.box.boxShadow = 'var(--box-shadow)';
    localStorage.setItem('theme', 'normal');
    return state;
}

function localTheme() {
    let now = localStorage.getItem('theme');
    let init = normalState({});
    if (now === 'dark') {
        init = darkState({});
    } else if (now === 'normal') {
        init = normalState({});
    } else {
        localStorage.setItem('theme', 'normal');
    }
    /*存储主题到本地*/
    return init;
}

const initialState = localTheme();

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        darkModeChange: (state) => {
            if (state.darkMode) {
                normalState(state);
            } else {
                darkState(state);
            }
        }
    }
});

export const selectTheme = state => state.theme;

export const {
    darkModeChange
} = themeSlice.actions;



export default themeSlice.reducer;