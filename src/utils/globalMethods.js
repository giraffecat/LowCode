/*
 * @Description: 全局方法注册
 * @Autor: WangYuan
 * @Date: 2021-03-31 20:00:34
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-12-20 16:03:50
 */
export default {
    install: function (Vue) {
        /**
         * 生成随机数  （num 位随机数 + 时间戳）
         */
        Object.defineProperty(Vue.prototype, '$getRandomCode', {
            value: function getRandomCode(num = 8) {
                let data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
                let nums = "";
                let timestamp = parseInt(new Date().getTime() / 1000) + ''
                for (let i = 0; i < num; i++) {
                    let r = parseInt(Math.random() * 61);
                    nums += data[r];
                }
                return timestamp + nums;
            }
        })

        /**
         * px to rem
         * 以375像素为画板，创建页面，则转换为375px对应
         * @param {*} data     要转换像素  （px）
         */
        Object.defineProperty(Vue.prototype, '$pxTorem', {
            value: function pxTorem(data) {
                return data / 37.5 + 'rem'
            }
        })
    }
}

