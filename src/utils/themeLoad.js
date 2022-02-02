const theme = {
    name: "dark",
    dom: document.getElementsByTagName("html")[0] //获取html DOM Node
};

/**
 * 
 * @param {"dark","normal","store",null} target 
 * @returns 
 */
function themeLoad(target) {
    let now = localStorage.getItem("theme_name"); //加载现在所存储的
    if (now !== "dark" && now !== "normal") { //所存储的错误形式
        now = "dark";
    }
    //update
    if (now !== target && (target === "dark" || target === "normal")) {
        now = target;
    }
    localStorage.setItem("theme_name", now); //默认为目标模式
    theme.name = now;
    theme.dom.setAttribute("theme", theme.name);
    return theme.name;
}

export default themeLoad;