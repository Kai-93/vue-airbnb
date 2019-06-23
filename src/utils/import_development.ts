/*
 * @Author: Kaiser
 * @Date: 2019-06-17 15:18:10
 * @Last Modified by: Kaiser
 * @Last Modified time: 2019-06-23 16:37:45
 */

// fix template or render function not defined
const asyncImport = (file: String) => () => import(`@/pages/${file}`).then(m => m.default);
export default asyncImport;
