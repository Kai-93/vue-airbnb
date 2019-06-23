/*
 * @Author: Kaiser
 * @Date: 2019-06-17 15:18:10
 * @Last Modified by: Kaiser
 * @Last Modified time: 2019-06-23 15:21:48
 */

const asyncImport = (file: String) => () => import(`@/pages/${file}`);
export default asyncImport;
