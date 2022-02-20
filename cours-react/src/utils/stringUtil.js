const stringUtil = {
    /**
     * 防止下标溢出的与具有类型判断的更加安全的String.substring()
     * @param {*} str 父字符串
     * @param {*} start_index 开始下标
     * @param {*} max_index 结束下标
     * @returns 
     */
    sub(str, start_index, max_index) {
        try {
            if (typeof str !== 'string') {
                throw new Error("stringUtil:: sub(str,...)  type of the str is not string.");
            }
            if (str.length - 1 < max_index) {
                return str.substring(start_index, -1);
            }
            return str.substring(start_index, max_index);
        } catch (e) {
            console.warn(e);
            return '';
        }
    }
}

export default stringUtil;