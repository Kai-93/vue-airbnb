/*
 * @Author: Kaiser
 * @Date: 2019-06-17 15:18:10
 * @Last Modified by: Kaiser
 * @Last Modified time: 2019-06-24 22:51:01
 */

// fix template or render function not defined
const asyncImport = (file: String) => () => import(`@/pages/${file}`);
export default asyncImport;
